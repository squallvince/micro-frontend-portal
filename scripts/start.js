const process = require('process');
const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');

//  看执行的方法后面是否有参数
const argvs = process.argv.splice(2);
const Port = require('../config/port');
const getStat = require('./util');



//  --------------开始 启动壳子
const baseStart = async () => {
  //  关闭当前端口的占用
  await spawn('xl_close_port', ['-p', Port['base']], {
    shell: process.platform === 'win32'
  })
  spawn('webpack-dev-server', ['--config', './webpack.dev.js', '--port', Port['base'], '--unsafe-perm'], {
    cwd: path.join(__dirname, `../`),
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
}

baseStart();
//  --------------结束

//  --------------开始 执行start
const start = async (key, value) => {
  //  关闭当前端口的占用
  const isStat = await getStat(path.join(__dirname, `../projects/${key}`))
  if (isStat && isStat.isDirectory()) {
    await spawn('xl_close_port', ['-p', value], {
      shell: process.platform === 'win32'
    })
    spawn('webpack-dev-server', ['--config', './webpack.dev.js', '--port', value, '--unsafe-perm'], {
      cwd: path.join(__dirname, `../projects/${key}/`),
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
  } else {
    process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(key)} 的项目，无法启动 ${chalk.red(key)}，其他项目不影响\n\n************ \n`))
  }
}
//  判断是单独打包还是全局打包
if (argvs.length > 0) {
  argvs.forEach(key => {
    if (Port[key]) {
      start(key, Port[key])
    } else {
      process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(key)} 的项目\n\n************ \n\n`))
    }
  })
} else {
  Object.keys(Port).forEach(async key => {
    if (key !== 'base') {
      start(key, Port[key])
    }
  })
}
//  --------------结束

