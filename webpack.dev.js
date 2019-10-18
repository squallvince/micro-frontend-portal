/* eslint-env node */
const config = require('./webpack.config.js');
const webpack = require('webpack');

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devServer = {
  contentBase: './build',
  historyApiFallback: true,
  hot: true,
  open: true,
  compress: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
}
config.mode = 'development'

module.exports = config;
