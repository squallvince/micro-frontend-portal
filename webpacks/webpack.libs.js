/* eslint-env node */
const path = require('path');
// 项目根路径
const ROOT_PATH = path.resolve(__dirname, '../');
module.exports = {
  mode: 'production',
  entry: [
    path.resolve(ROOT_PATH, 'libs/system.min.js'),
    path.resolve(ROOT_PATH, 'libs/amd.min.js'),
    path.resolve(ROOT_PATH, 'libs/named-exports.min.js'),
    path.resolve(ROOT_PATH, 'libs/use-default.min.js')
  ],
  output: {
    path: path.resolve(ROOT_PATH, 'vendors'),
    filename: 'libs.js'
  }
};