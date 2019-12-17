const Project = require('./project.json');

module.exports = {
  debug: true,
  devServer: {
    host: 'localhost',
    port: Project.port,
    contentBase: './build',
    historyApiFallback: true,
    hot: true,
    open: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  runtimeConfig: {
    baseServerUrl: '/mockserver/restapi/',
    theme: 'ult'
  },
  publicPath: '/'
};
