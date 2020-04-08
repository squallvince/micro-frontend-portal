const webpack = require('webpack')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = (process.env.env === 'development');
// 是否单独打包
const isIndependence = (process.env.mode === 'independent');
const project = require('../config/project.json');
// 项目根路径
const ROOT_PATH = path.resolve(__dirname, '../');
// build路径
const BUILD_PATH = isIndependence ? path.resolve(ROOT_PATH, './build') : path.resolve(ROOT_PATH, '../../build/projects', `${project.name}`);

module.exports = {
  entry: {
    [project.name]: path.resolve(__dirname, project.main)
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    library: '[name]',
    libraryTarget: isIndependence ? 'umd' : 'amd',
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
      }]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? `[name].css` : '[name].[contenthash:8].css'
    }),
    new ManifestPlugin({
      publicPath: `/projects/${project.name}/`,
      basePath: `@portal/${project.name}/`,
      filter: (file) => {
        // 筛选需要通过SystemJS注入的文件
        // file: { path, name, isInitial, isChunk, isAsset, isModuleAsset}
        return file.isChunk && (!file.path.endsWith('.map'))
      }
    }),
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
