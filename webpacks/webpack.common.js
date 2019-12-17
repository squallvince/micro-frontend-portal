/* eslint-env node */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] global-require: 0 */
const Webpack = require('webpack');
const Path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const isDev = (process.env.env === 'development');
const BaseProject = require('../config/project.json');

// 项目根路径
const ROOT_PATH = Path.resolve(__dirname, '../');
// 源代码路径
const SRC_PATH = `${ROOT_PATH}/src`;
const BUILD_PATH = Path.resolve(__dirname, '../build');

module.exports = {
  entry: {
    base: Path.resolve(__dirname, BaseProject.main)
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    library: '[name]',
    libraryTarget: 'amd',
    path: BUILD_PATH
  },
  mode: 'production',
  module: {
    rules: [
      { parser: { System: false }},
      {
        test: /\.js[x]?$/,
        exclude: [Path.resolve(ROOT_PATH, 'node_modules'), Path.resolve(ROOT_PATH, 'config/projects.js')],
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }]
      },
      {
        test: /\.js[x]?$/,
        exclude: [Path.resolve(ROOT_PATH, 'node_modules')],
        use: ['babel-loader?cacheDirectory=true']
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
        exclude: [Path.resolve(ROOT_PATH, 'node_modules')]
      }
    ]
  },
  resolve: {
    modules: [
      `${ROOT_PATH}/node_modules`,
      SRC_PATH
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Neo-CloudUltra',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      template: './src/template/index.html',
      path: isDev ? `//localhost:${BaseProject.port}/vendors` : `/vendors`,
      inject: false
    }),
    new Webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(!isDev)
    }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../vendors/libs.js'), to: `${BUILD_PATH}/vendors` },
      { from: Path.resolve(__dirname, '../vendors/css.min.js'), to: `${BUILD_PATH}/vendors` },
      { from: Path.resolve(__dirname, '../vendors/lodash.min.js'), to: `${BUILD_PATH}/vendors` },
      { from: Path.resolve(__dirname, '../config/project.json'), to: BUILD_PATH }
    ]),
    new ManifestPlugin({
      publicPath: `/`,
      basePath: '@portal/base/',
      filter: (file) => {
        // 筛选需要通过SystemJS注入的文件
        // file: { path, name, isInitial, isChunk, isAsset, isModuleAsset}
        return file.isChunk && (!file.path.endsWith('.map'));
      }
    })
  ],
  // 适合生产环境
  devtool: 'cheap-module-source-map',
  externals: [
    /^lodash$/
  ]
};

