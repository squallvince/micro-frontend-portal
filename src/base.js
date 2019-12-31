/*
 * @Author: Squall Sha
 * @Date: 2019-10-22 11:10:00
 */
/* eslint-disable */
import * as singleSpa from 'single-spa';
import { registerApp } from '../core/register';
import PromiseFetch from '../core/fetch';
import * as CommonUrls from '../core/utils/tools/url';

window.SystemJS = window.System;

const hasStore = (item) => {
  return item.store ? { store: `@portal/${item.name}/store.js` } : {};
};

const hasVendor = (item) => {
  if (PRODUCTION) {
    return item.vendors ? { vendors: `@portal/${item.name}/vendors.js` } : {};
  }
  return {};
};

const hasRuntime = (item) => {
  if (PRODUCTION) {
    return item.runtime ? { runtime: `@portal/${item.name}/runtime.js` } : {};
  }
  return {};
};

const hasCss = (item) => {
  return item.externalCss ? { externalCss: `@portal/${item.name}/${item.name}.css` } : {};
};

// 绑定公用函数到window
function bindCommon() {
  window.PromiseFetch = PromiseFetch;
}

function checkPortalStatus(status) {
  if (!status || status !== 'MOUNTED') {
    // window.singleSpaNavigate('/errors/404');
  }
}

function checkPath() {
  const currentPortal = CommonUrls.getPath();
  document.body.className = currentPortal;
  if (currentPortal !== '') {
    const status = this.getAppStatus(currentPortal);
    checkPortalStatus(status);
  }
}

//  注册项目以及启动sigle-spa
async function baseRegister() {
  const projects = window.PromiseFetch(`//${window.location.host}/projects.json`, {}, 'get').then((data) => {
    const baseProject = data.filter(item => item.base);
    if (baseProject.length) {
      const nameSpace = [];
      baseProject.forEach((item, idx) => {
        nameSpace.push(`base${idx}`);
        nameSpace[idx] = registerApp({
          name: item.name,
          main: `@portal/${item.name}/${item.name}.js`,
          url: item.prefix,
          base: item.base,
          ...hasRuntime(item),
          ...hasVendor(item),
          ...hasStore(item),
          ...hasCss(item)
        });
      });

      Promise.all(nameSpace).then(() => {
        data.forEach(project => {
          //  项目是否是壳子项目
          if (!project.base) {
            registerApp({
              name: project.name,
              main: `@portal/${project.name}/${project.name}.js`,
              url: project.prefix,
              base: project.base,
              ...hasRuntime(project),
              ...hasVendor(project),
              ...hasStore(project),
              ...hasCss(project)
            });
          }
        });
      });
    }
  });

  // 报错信息
  singleSpa.addErrorHandler(err => {
    console.log(err);
    console.log(err.appOrParcelName);
    console.log(singleSpa.getAppStatus(err.appOrParcelName));
  });

  //  启动
  singleSpa.start();

  // 监听路有切换是否加载到对应模块
  window.addEventListener('single-spa:app-change', checkPath.bind(singleSpa));
}

bindCommon();
baseRegister();
