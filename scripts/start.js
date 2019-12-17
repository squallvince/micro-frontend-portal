const process = require('process');
const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');

const BaseProject = require('../config/project.json');
const { getStat, askPack, createProjectsJson } = require('./utils');

//  注册文件启动
const RegisterBase = async () => {
  //  关闭当前端口的占用
  await spawn('xl_close_port', ['-p', BaseProject.port], {
    shell: process.platform === 'win32'
  });
  spawn('webpack-dev-server', ['--config', './webpacks/webpack.dev.js', '--port', BaseProject.port, '--unsafe-perm'], {
    cwd: path.join(__dirname, `../`),
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
}

//  所有项目启动的执行方法
const start = async (key, value) => {
  //  关闭当前端口的占用
  const isStat = await getStat(path.join(__dirname, `../projects/${key}`));
  if (isStat && isStat.isDirectory()) {
    await spawn('xl_close_port', ['-p', value], {
      shell: process.platform === 'win32'
    });
    spawn('webpack-dev-server', ['--config', './webpacks/webpack.dev.js', '--port', value, '--unsafe-perm'], {
      cwd: path.join(__dirname, `../projects/${key}/`),
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
  } else {
    process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(key)} 的项目，无法启动 ${chalk.red(key)}，其他项目不影响\n\n************ \n`));
  }
};

const run = async () => {
  // 选择启动的子项目
  const { selects, projects } = await askPack('启动');
  // 获取选择参数
  let Projects = [];
  let BaseProjects = projects.filter(project => project.base);
  selects.then(async data => {
    data.development.forEach(key => {
      const SelectProjects = projects.filter(project => (project.name === key));
      Projects = Projects.concat(SelectProjects);
    });
    if (Projects.length > 0) {
      // 根据选择的子项目启动
      Projects = BaseProjects.concat(Projects);
      createProjectsJson(Projects);
      for (let i = 0; i < Projects.length; i++) {
        await start(Projects[i].name, Projects[i].port);
      }
    } else {
      createProjectsJson(projects);
      projects.forEach(async project => {
        start(project.name, project.port);
      })
    }
    // 启动项目基础框架
    await RegisterBase();
  });
}

run();
