/* eslint-env node */
const config = require('./webpack.common');
const webpack = require('webpack');

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devServer = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
}

config.mode = 'development';
config.devtool = 'cheap-module-eval-source-map';

module.exports = config;


