/* eslint-env node */
const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const project = require('../config/project.json');
const packageJson = require('../package.json');
// 是否单独打包
const isIndependence = (process.env.mode === 'independent');
// 项目根路径
const ROOT_PATH = path.resolve(__dirname, '../');
// build路径
const BUILD_PATH = isIndependence ? path.resolve(ROOT_PATH, './build') : path.resolve(ROOT_PATH, '../../build/projects', `${project.name}`);

const vendors = Object.keys(packageJson.dependencies);

module.exports = {
  output: {
    filename: '[name].[contenthash:8].js',
    library: '[name]',
    path: BUILD_PATH
  },
  entry: {
    vendor: vendors
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        exclude: /\/(node_modules|libs\/)/,
        terserOptions: {
          output: {
            beautify: false,
            comments: false
          },
          compress: {
            drop_console: true
          }
        }
      })
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(BUILD_PATH, 'vendor-manifest.json'),
      name: '[name]',
      context: __dirname
    }),
    new CompressionPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]
};