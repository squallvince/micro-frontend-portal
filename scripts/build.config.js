#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');
const chalk = require('chalk');
/* CONFIG
** output: 重写配置
** target: 项目目录下每个子目录配置文件相对位置，
** dir: 项目目录地址
*/
const CONFIG = {
  output: './build/projects.json',
  target: './config/project.json',
  dir: 'projects'
}

function printTips(msg, color = 'green') {
  process.stdout.write(chalk[color](msg));
}

function exitProcess(msg, color = 'green') {
  printTips(msg, color);
  process.exit();
}

function writeData(file, data) {
  fs.writeFile(file, data, 'utf8', (err) => {
    if (err) {
      throw err;
    }
    exitProcess(`********** projects.json已生成*********** \n`, 'green');
  });
}

function getAllDirs(mypath = '.') {
  const items = fs.readdirSync(mypath);
  const result = [];
  items.forEach(item => {
    const temp = path.join(mypath, item);
    if (fs.statSync(temp).isDirectory()) {
      result.push(item);
    }
  });
  return result;
};

function hasFile(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return filePath;
  } catch (err) {
    // console.log(`未发现配置文件${path}`);
  }
};

async function getValidableConfigPath(dir) {
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
}

function readFile(file) {
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
}

function checkRepeatName(arr) {
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
}

function formatData(data) {
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
  // const wrapData = `module.exports = [${data}];\n`;
  const wrapData = `[${data}]`;
  // 首先判断文件夹是否存在
  fs.exists('./src', exists => {
    if (exists) {
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
    }
  });
}

// 读取所有配置文件
async function readAllFile(files) {
  const readList = [];
  files.forEach(file => {
    readList.push(readFile(file));
  });
  await Promise.all(readList).then(data => {
    if (data.length) {
      formatData(data);
    } else {
      printTips('********* 未发现任何子项目配置文件！***********\n')
    }
  })
}

// 获取某个目录下所有文件夹下的配置文件
async function getAllConfigByDir(dir) {
  let vaildPaths = [];
  // 获取有效的配置文件地址
  vaildPaths = await getValidableConfigPath(dir);
  readAllFile(vaildPaths);
}

getAllConfigByDir(CONFIG.dir);
