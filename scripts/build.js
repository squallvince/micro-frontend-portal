/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] no-console: 0 */
const process = require('process');
const webpack = require('webpack');
const { spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');
const fsPromises = require('fs').promises;
const webpackConfig = require('../webpacks/webpack.prod');
const { walk, readFiles, getStat, askPack, createProjectsJson } = require('./utils');
//  看执行的方法后面是否有参数
const SpawnStatus = {}; // 监听打包状态


//  --------------开始 执行子项目build
const buildProject = async (key) => {
  const isStat = await getStat(path.join(__dirname, `../projects/${key}`));
  if (isStat && isStat.isDirectory()) {
    const child = spawn('webpack', ['--config', './webpacks/webpack.prod.js', '-p'], {
      cwd: path.join(__dirname, `../projects/${key}/`),
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
    // 初始化打包状态
    SpawnStatus[key] = -1;
    child.on('exit', (code) => {
      console.log(`============ ${key} 构建完成 ============,  退出：${code}`);
      // 执行完毕，更新打包状态, 0为正常，其他为出错
      if (code !== 0) {
        // 退出进程
        console.log(`============ ${key} 构建出错！ ============,  退出：${code}`);
        process.exit();
      }
      SpawnStatus[key] = 0;
    });
  } else {
    process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(key)} 的项目，无法打包 ${chalk.red(key)}，其他项目不影响\n\n************ \n`));
  }
};

//  --------------开始 针对base进行打包
async function baseFrameBuild(ProChild) {
  await webpack(webpackConfig).run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    // 输出结果
    // console.log(options.toJson('normal'))
    process.stdout.write(`${stats.toString({
      colors: true
    }) }\n`);

    process.stdout.write(chalk.yellow('============base打包完毕！==========\n'));

    ProChild.forEach(async project => {
      if (typeof project === 'string') {
        //  单独打包获取数组里面的所有数据
        buildProject(project);
      } else {
        //  全部打包获取对象的name
        buildProject(project.name);
      }
    });

  });
};
//  --------------结束

const build = async () => {
  // 选择启动的子项目
  const { selects, projects } = await askPack('打包');
  // 获取选择参数
  let Projects = [];
  let BaseProjects = projects.filter(project => project.base);
  selects.then(async data => {
    data.development.forEach(key => {
      const SelectProjects = projects.filter(project => (project.name === key));
      Projects = Projects.concat(SelectProjects);
    });
    if (Projects.length > 0) {
      // 根据选择的子项目打包
      Projects = BaseProjects.concat(Projects);
      createProjectsJson(Projects);
      baseFrameBuild(Projects);
    } else {
      createProjectsJson(projects);
      baseFrameBuild(projects);
    }
  });
};

// 将代码插入到<body>标签后
async function openAndWriteFile(filepath, data) {
  let filehandle;
  try {
    filehandle = await fsPromises.open(filepath, 'r+');
    let html = await filehandle.readFile('utf-8');
    html = html.toString();
    const insertIndex = html.indexOf('<div id="script">');
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    const newHtml = data + html.substr(insertIndex + 17);
    return await filehandle.write(newHtml, insertIndex + 17);
  } finally {
    if (filehandle !== undefined) {
      await filehandle.close();
    }
  }
}

function modifyHtml() {
  // 读取所有manifest.json文件
  readFiles(walk(path.join(__dirname, `../build`)))
    .then(data => {
      let result = {};
      data.forEach(d => {
        result = { ...JSON.parse(d), ...result };
      });
      const temp = ` <script type='systemjs-importmap'>{"imports":${JSON.stringify(result)}}</script>`;
      // 写入html文件
      openAndWriteFile(path.join(__dirname, `../build/index.html`), temp).then(() => {
        process.stdout.write(chalk.yellow('\n\n============ (≧∇≦)ﾉ 构建结束！==========\n\n'));
      }).catch(err => {
        process.stdout.write(chalk.red(`\n============ 构建失败！==========\n ${err}`));
      });
    });
}

// 定时检查所有模块打包状况
let timer;
function poll() {
  // console.log('------监听', SpawnStatus)
  const statusKeys = Object.keys(SpawnStatus);
  const isAllDone = statusKeys.length && statusKeys.every(key => (SpawnStatus[key] === 0));
  if (isAllDone) {
    clearTimeout(timer);
    // console.log('\n***************可以读文件了***************\n')
    // 读取manifest.json文件，注入html中。
    modifyHtml();
  } else {
    const hasError = statusKeys.some(key => (SpawnStatus[key] >= 1));
    if (hasError) {
      clearTimeout(timer);
      return;
    }
    timer = setTimeout(poll, 5000);
  }
}

// 开始打包
build().then(() => {
  // console.log('------监听开始', SpawnStatus)
  poll();
});
