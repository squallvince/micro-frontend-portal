/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] no-console: 0 */
const { modifyHtml } = require('./utils');

// 定时检查所有模块打包状况
const replace  = () => {
  modifyHtml();
};

// 开始重构html
replace();
