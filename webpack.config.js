/* eslint-env node */
const webpack = require('webpack')
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const InsertHtmlPlugin = require('./webpacks/insetHtmlCode')
const Port = require('./config/port')
const Dependencies = require('./config/extFile')
const env = process.env.env
//  生成import

let imports = {}
Object.keys(Port).forEach(item => {
  if (env === 'development') {
    imports[`@portal/${item}`] = `http://localhost:${Port[item]}/${item}.js`
  } else {
    if (item !== 'base') {
      imports[`@portal/${item}`] = `./${item}/${item}.js`
    } else {
      imports[`@portal/${item}`] = `./${item}.js`
    }
  }
})

module.exports = {
  entry: './src/Bootstrap.js',
  output: {
    filename: 'bootstrap.js',
    library: 'bootstrap',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  module: {
    rules: [
      { parser: { System: false } },
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }]
      },
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules'), /\.krem.css$/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[path][name]__[local]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  require('autoprefixer')
                ];
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        exclude: [/\.krem.css$/],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'src/index.html',
      inject: false //  仅生成，不注入
    }),
    new InsertHtmlPlugin({
      paths: [{
        label: 'script',
        type: 'systemjs-importmap',
        content: { imports }
      }, {
        label: 'script',
        type: 'systemjs-importmap',
        content: Dependencies.devDependencies
      }]
    }),
    new CleanWebpackPlugin(['build']),
  ],
  devtool: 'source-map',
  // externals: [
  //   /^lodash$/,
  //   /^single-spa$/,
  //   /^rxjs\/?.*$/,
  // ],
};

