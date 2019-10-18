const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * {options} 参数
 * label: script | link
 * type: type类型
 * content: content内容
 */
class InsertHtmlPlugin {
  constructor(options) {
    this.paths = options.paths
  }
  apply (compiler) {
    compiler.hooks.compilation.tap('InsertHtmlPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'InsertHtmlPlugin',
        (data, cb) => {
          let script = ''
          if (this.paths.length > 0) {
            this.paths.forEach(src => {
              script += `<${src.label} type='${src.type}'>${JSON.stringify(src.content)}</${src.label}>`
            });
          }
          data.html = data.html.toString().split('<body>')[0] + script + data.html.toString().split('<body>')[1]
          cb(null, data)
        }
      )
    })
  }
}

module.exports = InsertHtmlPlugin