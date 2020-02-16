//  文件判断
/* eslint-disable */
const fs = require('fs');
const path = require('path');
const os = require('os');
const process = require('process');
//  可以在控制台类似让用户输入表单形式输入的插件
const inquirer = require('inquirer');
const chalk = require('chalk');
const fsPromises = require('fs').promises;

/* CONFIG
** output: 重写配置
** target: 项目目录下每个子目录配置文件相对位置，
** dir: 项目目录地址
*/
const CONFIG = {
  output: './build/projects.json',
  outputDir: './build',
  target: './config/project.json',
  dir: 'projects'
};

const getStat = dir => {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
};

/**
 * Author:
 *
 * @param {String} project 文件夹路径
 * @returns {Array} project下的所有文件夹名
 */

const getAllDirs = (project = '.') => {
  const items = fs.readdirSync(project);
  const result = [];
  items.forEach(item => {
    const temp = path.join(project, item);
    if (fs.statSync(temp).isDirectory()) {
      result.push(item);
    }
  });
  return result;
};

/**
 * Author:
 *
 * @param {String} src
 * @param {String} tar
 * @returns {void}
 */
const copyFolder = (src, tar) => {
  fs.readdirSync(src).forEach(pathSrc => {
    const newSrc = `${src}/${pathSrc}`;
    const newTar = `${tar}/${pathSrc}`;
    const st = fs.statSync(newSrc);
    if (st.isDirectory()) {
      fs.mkdirSync(newTar);
      return copyFolder(newSrc, newTar);
    }
    if (st.isFile()) {
      fs.writeFileSync(newTar, fs.readFileSync(newSrc));
    }
  });
};

const hasFile = (filePath) => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return filePath;
  } catch (err) {
    // console.log(`未发现配置文件${path}`);
  }
};

const getValidableConfigPath = async (dir) => {
  const modules = await getAllDirs(dir);
  const results = [];
  modules.forEach(module => {
    const filePath = path.join(dir, `${module}`, CONFIG.target);
    results.push(hasFile(filePath));
  });
  const vaildPaths = await Promise.all(results).then(data => {
    return data.filter(item => !!item);
  });
  return vaildPaths;
};

const readFile = (file) => {
  let fd;
  try {
    fd = fs.openSync(path.join(file), 'r');
    const result = fs.readFileSync(fd, 'utf8');
    return result;
  } catch (error) {
    exitProcess(`*********读取配置文件失败********`, 'red');
  } finally {
    fs.closeSync(fd);
  }
};

const checkRepeatName = (arr) => {
  const obj = {};
  let result = [];
  arr.forEach(item => {
    const name = item.name;
    if (obj[name]) {
      obj[name]++;
    } else {
      obj[name] = 1;
    }
  });
  result = Object.keys(obj).filter(key => obj[key] > 1);
  if (result.length) {
    result.forEach(name => {
      printTips(`模块名${name}出现了多次`, 'red');
    });
    process.exit();
  }
};

const formatData = (data) => {
  const result = [];
  data.forEach(item => {
    try {
      const itemObj = JSON.parse(item);
      result.push(itemObj);
    } catch (err) {
      exitProcess(`解析配置文件失败！`, 'red');
    }
  });
  checkRepeatName(result);
  return result;
};

// 读取所有配置文件
const readAllFile = (files) => {
  const readList = [];
  files.forEach(file => {
    readList.push(readFile(file));
  });
  if (readList.length) {
    return formatData(readList);
  } else {
    printTips('********* 未发现任何子项目配置文件！***********\n');
    return [];
  }
}

// 获取某个目录下所有文件夹下的配置文件
const getAllConfigByDir = async (dir) => {
  const vaildPaths = await getValidableConfigPath(dir);
  return readAllFile(vaildPaths);
};

const askPack = async () => {
  const projects = await getAllConfigByDir(CONFIG.dir);
  const selectProjects = projects.filter((item) => !item.base);
  const question = [
    {
      name: 'development',
      type: 'checkbox',
      message: '请选择需要启动的项目，直接回车将会全部启动：',
      choices: selectProjects
    }
  ];
  return {
    selects: inquirer.prompt(question),
    projects
  };
};

const getIP = () => {
  const interfaces = os.networkInterfaces();
  let ipAdress = '';
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    iface.forEach(alias => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        ipAdress = alias.address;
      }
    });
    if (ipAdress) break;
  }
  return ipAdress;
};

// 递归查找指定类型文件
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    // 排除静态目录
    if (file === 'static' || file === 'assets') {
      return false;
    }
    file = `${dir}/${file}`;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (path.basename(file) === 'manifest.json') {
      // 过滤名称
      results.push(path.resolve(__dirname, file));
    }
  });
  return results;
};

async function readFiles(arr) {
  const allReads = [];
  arr.forEach(filepath => {
    allReads.push(fs.readFileSync(filepath, 'utf-8'));
  });
  return await Promise.all(allReads);
}

const printTips = (msg, color = 'green') => {
  process.stdout.write(chalk[color](msg));
};

const writeData = (file, data) => {
  // 如果build目录不存在，先创建。
  fs.mkdir(CONFIG.outputDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.writeFile(file, data, 'utf8', (err) => {
    if (err) throw err;
    printTips(`********** projects.json已生成 *********** \n`, 'green');
  });
};

const createProjectsJson = (projects) => {
  const wrapData = JSON.stringify(projects);
  // 删除原配置文件，生成新配置文件
  fs.unlink(CONFIG.output, (err) => {
    if (err) {
      console.log('新配置文件即将生成。。。');
      writeData(CONFIG.output, wrapData);
    } else {
      console.log('原配置文件删除，新配置文件即将生成。。。');
      writeData(CONFIG.output, wrapData);
    }
  });
};

// 将代码插入到<body>标签后
const openAndWriteFile = async (filepath, data) => {
  let filehandle;
  try {
    filehandle = await fsPromises.open(filepath, 'r+');
    let html = '';
    await filehandle.readFile('utf-8').then(async (data) => {
      html = data;
      await filehandle.truncate(0);
    });
    const insertStartIndex = html.indexOf('<div id="script">');
    const insertEndIndex = html.indexOf('</script></div>');
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    const newHtml = html.substring(0, insertStartIndex + 17) + data + html.substring(insertEndIndex + 9, html.length);
    await filehandle.write(newHtml, 0);
  } finally {
    if (filehandle !== undefined) {
      await filehandle.close();
    }
  }
};

const modifyHtml = () => {
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
        process.stdout.write(chalk.yellow('\n\n============ (≧∇≦)ﾉ html编辑结束！==========\n\n'));
      }).catch(err => {
        process.stdout.write(chalk.red(`\n============ html编辑失败！==========\n ${err}`));
      });
    });
};

module.exports = {
  getStat,
  getAllDirs,
  getIP,
  walk,
  readFiles,
  createProjectsJson,
  modifyHtml,
  askPack
};
