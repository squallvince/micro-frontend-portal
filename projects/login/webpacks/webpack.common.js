/* eslint-env node */
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    libraryTarget: 'amd',
    path: BUILD_PATH,
  },
  mode: 'production',
  module: {
    rules: [
      { parser: { System: false } },
      {
        test: /\.js[x]?$/,
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
        test: /\.js[x]?$/,
        exclude: [path.resolve(ROOT_PATH, 'node_modules')],
        loader: 'babel-loader?cacheDirectory=true',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: true
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: (isDev ? '[name].[ext]' : '[name].[contenthash].[ext]'),
            outputPath: 'assets/',
            publicPath: (isDev ? `//localhost:${project.port}/assets/` : `/projects/${project.name}/assets/`)
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? `${project.name}.css` : `${project.name}.[contenthash:8].css`
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
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../config/project.json'), to: BUILD_PATH }
    ])
  ],
  // 适合生产环境
  devtool: 'cheap-module-source-map'
}
