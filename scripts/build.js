const process = require('process');
const { spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');

//  拿到项目以及端口
const Port = require('../config/port');
//  判断项目中是否有文件
const getStat = require('./util');
//  看执行的方法后面是否有参数
const argvs = process.argv.splice(2);

//  --------------开始 针对base进行打包
const baseBuild = async () => {
  spawn('webpack', ['--config', './webpack.config.js', '-p'], {
    cwd: path.join(__dirname, `../`),
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
}

baseBuild();
//  --------------结束


//  --------------开始 执行子项目build
const build = async (key) => {
  const isStat = await getStat(path.join(__dirname, `../projects/${key}`));
  if (isStat && isStat.isDirectory()) {
    spawn('webpack', ['--config', './webpack.config.js', '-p'], {
      cwd: path.join(__dirname, `../projects/${key}/`),
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })
  } else {
    process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(key)} 的项目，无法打包 ${chalk.red(key)}，其他项目不影响\n\n************ \n`))
  }
}
//  判断是单独打包还是全局打包
if (argvs.length > 0) {
  argvs.forEach(key => {
    if (Port[key]) {
      build(key)
    } else {
      process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(key)} 的项目\n\n************ \n\n`))
    }
  })
} else {
  Object.keys(Port).forEach(async key => {
    if (key !== 'base') {
      build(key)
    }
  })
}
//  --------------结束
