let devConfig = require('./default-dev-config');
// 添加代理
devConfig.devServer.publicPath = '/';

devConfig.devServer.proxy = [
  {
    context: '/front/api',
    target: 'http://178.101.229.53',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/front/': '' }
  },
  {
    context: '/api/',
    target: 'http://178.101.229.53',
    changeOrigin: true,
    secure: false
  }
];

module.exports = devConfig;
