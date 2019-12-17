/* eslint-env node */
const Webpack = require('webpack');
const Config = require('./webpack.common');
const DevServerConfig = require('../config/dev-config');
const InsertHtmlPlugin = require('./insertHtmlCode');
const BaseProject = require('../config/project.json');
const Projects = require('../build/projects');
const Imports = {};

/* 生成System Imports, 根据模块命名，避免同名冲突
** 规则like: @portal/base/base.js: http://localhost:8231/base.js
** 与 ManifestPlugin 插件前缀保持一致, 与base.js中入口文件也需保持一致。
*/
Imports[`@portal/${BaseProject.name}/${BaseProject.name}.js`] = `http://localhost:${BaseProject.port}/${BaseProject.name}.js`;
Projects.forEach(item => {
  Imports[`@portal/${item.name}/${item.name}.js`] = `http://localhost:${item.port}/${item.name}.js`;
  if (item.store) (Imports[`@portal/${item.name}/store.js`] = `http://localhost:${item.port}/store.js`);
  if (item.externalCss) (Imports[`@portal/${item.name}/${item.name}.css`] = `http://localhost:${item.port}/${item.name}.css`);
});
Config.plugins.push(new Webpack.NamedModulesPlugin());
Config.plugins.push(new Webpack.HotModuleReplacementPlugin());
Config.plugins.push(new InsertHtmlPlugin({
  paths: [{
    label: 'script',
    type: 'systemjs-importmap',
    content: { imports: Imports }
  }]
}));
Config.devServer = DevServerConfig.devServer;
Config.mode = 'development';
Config.devtool = 'cheap-module-eval-source-map';

module.exports = Config;
