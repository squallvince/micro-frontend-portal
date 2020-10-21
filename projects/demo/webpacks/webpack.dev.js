/*
 * @Author: Squall Sha 
 * @Date: 2019-12-23 16:08:40 
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-21 11:26:56
 */

/* eslint-env node */
const webpack = require('webpack');// 是否单独打包
const config = require('./webpack.common');
const isIndependence = (process.env.mode === 'independent');
config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devServer = {
  historyApiFallback: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
}

if (isIndependence) {
  Object.assign(config.devServer, {
    host: 'localhost',
    hot: true,
    open: true,
    compress: true
  });
}

config.mode = 'development';
config.devtool = 'cheap-module-eval-source-map';

module.exports = config;
