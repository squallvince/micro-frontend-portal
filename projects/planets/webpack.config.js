const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/planets.js'),
  output: {
    filename: 'planets.js',
    library: 'planets',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, '../../build/planets'),
  },
  mode: 'production',
  module: {
    rules: [
      {parser: {System: false}},
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /\.krem.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'kremling-loader',
            options: {
              namespace: 'planets',
              postcss: {
                plugins: {
                  'autoprefixer': {}
                }
              }
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build/planets']),
    CopyWebpackPlugin([
      {from: path.resolve(__dirname, 'src/planets.js')}
    ]),
  ],
  devtool: 'source-map',
  externals: [
    /^@portal\/*/,
    /^lodash$/,
    /^single-spa$/,
    /^rxjs\/?.*$/,
    /^react$/,
    /^react\/lib.*/,
    /^react-dom$/,
    /.*react-dom.*/,
  ],
}
