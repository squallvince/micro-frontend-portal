//  使用child_process创建异步进程
const process = require('process');
const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');
//  看执行的方法后面是否有参数
let params = process.argv.splice(2);
//  端口映射文件
const Port = require('../config/port');
//  判断项目中是否有文件
const getStat = require('./util');

//  --------------开始 遍历配置，执行install
let install = async (key) => {
  let isStat = await getStat(path.join(__dirname, `../projects/${key}`));
  if (isStat && isStat.isDirectory()) {
    spawn('npm', ['install'], {
      cwd: path.join(__dirname, `../projects/${key}/`),
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })
  } else if (key !== 'base') {
    process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(key)} 的项目，无法install ${chalk.red(key)}，其他项目不影响\n\n************ \n`))
  }
}
//  有参数，遍历参数，如果匹配配置文件的key，则去调用install
if (params.length > 0) {
  params.forEach(item => {
    if (Port[item]) {
      install(item)
    } else {
      process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(item)} 的项目\n\n************ \n\n`))
    }
  })
} else {
  //  遍历端口映射，拿到所有的key去install
  Object.keys(Port).forEach(item => {
    install(item)
  })
}
//  --------------结束




