const webpack = require('webpack')
const path = require('path')
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const project = require('../config/project.json');
// 项目根路径
const ROOT_PATH = path.resolve(__dirname, '../')
// build路径
const BUILD_PATH = path.resolve(ROOT_PATH, '../../build/projects', `${project.name}`)

module.exports = {
  entry: path.resolve(__dirname, '../src/vuedemo.js'),
  output: {
    filename: 'vuedemo.js',
    library: 'vuedemo',
    libraryTarget: 'amd',
    path: BUILD_PATH,
  },
  mode: 'production',
  module: {
    rules: [
      { parser: { System: false } },
      {
        test: /\.(vue|js)$/,
        exclude: [path.resolve(ROOT_PATH, 'node_modules')],
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new VueLoaderPlugin()
    // new CleanWebpackPlugin(['build/demo1']),
    // CopyWebpackPlugin([
    //   {from: path.resolve(__dirname, '../src/demo1.js')}
    // ]),
  ],
  // 适合生产环境
  devtool: 'cheap-module-source-map',
  // externals: ['vue', 'vue-router']
}
