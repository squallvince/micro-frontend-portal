/* eslint-env node */
const webpack = require('webpack');
const Merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Config = require('./webpack.common');

module.exports = Merge(Config, {
  optimization: {
    // runtimeChunk: 'single',
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //         name: 'vendors',
    //         chunks: 'all'
    //     }
    //   }
    // },
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
    providedExports: true,
    usedExports: true,
    // 识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
    // 依赖于optimization.providedExports和optimization.usedExports
    sideEffects: true,
    // 取代 new webpack.optimize.ModuleConcatenationPlugin()
    concatenateModules: true,
    // 取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
    noEmitOnErrors: true
  },
  plugins: [
    new CompressionPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]
});
