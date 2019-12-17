const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * {options} 参数
 * label: script | link
 * type: type类型
 * external: src属性
 * content: content内容
 */
class InsertHtmlPlugin {
  constructor(options) {
    this.paths = options.paths;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InsertHtmlPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'InsertHtmlPlugin',
        (data, cb) => {
          let script = ''
          if (this.paths.length > 0) {
            this.paths.forEach(src => {
              // 判断是否是src外链的，如果是，需要拼接起来，调用的时候也需要按照自己的循序排列
              if (src.external && Array.isArray(src.external) && src.external.length > 0) {
                src.external.forEach(arr => {
                  script += `<${src.label} src='${arr}.js'></${src.label}>`;
                })
              } else {
                //  如果是script里面import内容，那么content就是内容，需要转化为字符串使用
                script += `<${src.label} type='${src.type}'>${JSON.stringify(src.content)}</${src.label}>`;
              }
            });
          }
          //  暂时为定制化，找到<div id="script">并向里面添加
          let html = data.html.toString();
          let index = html.indexOf('<div id="script">')
          data.html = html.substr(0, index + 17) + script + html.substr(index + 17);
          cb(null, data)
        }
      )
    })
  }
}

module.exports = InsertHtmlPlugin;
