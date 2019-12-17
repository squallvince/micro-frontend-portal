/*
 * @Author: Squall Sha
 * @Date: 2019-11-26 09:00:00
 */
/* eslint no-unused-vars: 0 */
import { isAdmin, getCurrentPortal, getCurrentVDC, isVdcManager } from '../utils/cache';
import { PORTAL } from '../constants/portals';
import * as cookie from '../utils/tools/cookie';

const openNotification = (type, res) => {
  window.Notification[type]({
    message: res.errorCode,
    duration: 0
  });
};

// 判断是否登录态失效
const _when401 = (res) => {
  // 401
  const { errorCode } = res;
  if (errorCode === 'AuthFailure') {
    const currentUrl = window.location.href;
    window.prevHref = currentUrl;
    window.singleSpaNavigate('/login');
    return false;
  }
};

// 当用户无访问权限，跳转到403页面
const _when403 = (res) => {
  // 403 UnauthorizedOperation
  // openNotification('error', res);
  return false;
};

const checkStatus = (res, responseStatus) => {
  if (responseStatus.code === 200) {
    // 成功即清理前一次浏览的url
    window.prevHref = null;
    return res;
  }
  if (responseStatus.code === 401) {
    // 处理401
    _when401(res);
  }
  if (responseStatus.code === 403) {
    // 处理403
    _when403(res);
  }
  if (responseStatus.code && (responseStatus.code !== 200 && responseStatus.code !== 401)) {
    // window.singleSpaNavigate('/login');
    openNotification('error', res);
  }
  if (responseStatus.code && responseStatus.code !== 200) {
    throw res;
  }
};

const parseJSON = (response, responseStatus) => {
  responseStatus.code = response.status;
  return response.json();
};

const _fetch = (requestPromise, timeout = 60000) => {
  let timeoutAction = null;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject(new Error('timeout'));
    };
  });
  setTimeout(() => {
    timeoutAction();
  }, timeout);
  return Promise.race([requestPromise, timerPromise]);
};

const setHeaders = (opts) => {
  const currentPortal = getCurrentPortal();
  opts.headers['X-CSRFToken'] = cookie.get('csrftoken');

  if (currentPortal === PORTAL.admin.id) {
    if (isAdmin()) {
      opts.headers['X-Scope'] = 'System';
    } else if(isVdcManager()) {
      opts.headers['X-Scope'] = 'Vdc';
      opts.headers['X-VDC-Id'] = getCurrentVDC();
    }
  } else if (currentPortal === PORTAL.operation.id) {
    opts.headers['X-Scope'] = 'System';
  } else {
    opts.headers['X-Scope'] = 'Project';
  }

  return opts;
};

export default (url = '', data = {}, type = 'GET', singleSpa = {}, timeOut) => {
  type = type.toUpperCase();
  if (type === 'GET') {
    let dataStr = '';
    Object.keys(data).forEach(key => {
      dataStr += `${key}=${data[key]}$`;
    });

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = `${url}?${dataStr}`;
    }
  }

  const requestConfig = {
    credentials: 'include',
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'force-cache'
  };

  if (type === 'POST') {
    Object.defineProperty(requestConfig, 'body', {
      value: JSON.stringify(data)
    });
  }

  const opts = setHeaders(requestConfig);
  try {
    const defer = new Promise((resolve, reject) => {
      const responseStatus = {
        type: 'HANDLE_RESPONSE_STATUS'
      };
      _fetch(fetch(url, opts), timeOut)
        .then(res => {
          return parseJSON(res, responseStatus);
        })
        .then(res => {
          return checkStatus(res, responseStatus);
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
    return defer;
  } catch (error) {
    throw new Error(error);
  }
};
