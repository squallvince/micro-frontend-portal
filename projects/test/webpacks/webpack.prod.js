/* eslint-env node */
const webpack = require('webpack');
const Merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Config = require('./webpack.common');
const project = require('../config/project.json');

module.exports = Merge(Config, {
  optimization: {
    // 使用systemJs不能使用splitChunks，因为打包出来的文件名不确定
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/].*\.js$/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          enforce: true
        },
        styles: {
          test: /\.css$/,
          name: project.name,
          chunks: 'all',
          enforce: true
        }
      }
    },
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
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        canPrint: true
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
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('../build/vendor-manifest.json')
    // }),
    new CompressionPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]
});
