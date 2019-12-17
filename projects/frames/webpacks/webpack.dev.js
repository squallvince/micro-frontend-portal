/* eslint-env node */
const Config = require('./webpack.common');
const webpack = require('webpack');
Config.plugins.push(new webpack.NamedModulesPlugin());
Config.plugins.push(new webpack.HotModuleReplacementPlugin());
Config.devServer = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
}

Config.mode = 'development';
Config.devtool = 'cheap-module-eval-source-map';

module.exports = Config;
