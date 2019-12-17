//  使用child_process创建异步进程
const process = require('process');
const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');
const { getStat, getAllDirs } = require('./util');
//  看执行的方法后面是否有参数
let params = process.argv.splice(2);
//  --------------开始 遍历配置，执行install

let install = async (key) => {
  let dirPath = path.join(__dirname, `../projects/${key}`);
  let isStat = await getStat(dirPath);
  process.stdout.write(chalk.green(`******** 安装${key}的依赖包 ******** \n\n`))
  
  if (isStat && isStat.isDirectory()) {
    const ls = await spawn('npm', ['install'], {
      cwd: path.join(__dirname, `../projects/${key}/`),
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })
    ls.on('close', data => {
      process.stdout.write(chalk.green(`******** 项目${key}的依赖包安装完毕 ******** \n\n`))
    })

  } else if (key !== 'base') {
    process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(key)} 的项目，无法install ${chalk.red(key)}，其他项目不影响\n\n************ \n`))
  }
  
}

async function installProjects () {
  // 获取所有子项目文件
  const allProjects = await getAllDirs('projects');
  if (params.length > 0) {
    params.forEach(item => {
      if (allProjects.length > 0) {
        let target = allProjects.filter(project => project === item);
        if (target.length) {
          install(item)
        } else {
          process.stdout.write(chalk.yellow(`************ \n\n projects 文件夹中没有包含 ${chalk.red(item)} 的项目\n\n************ \n\n`))
        }
      } else {
        console.log('未在projects下查找到任何子项目！');
      }
    })
  } else {
    // 所有项目安装
    allProjects.forEach(item => {
      install(item)
    })
  }
}

installProjects()
//  --------------结束




