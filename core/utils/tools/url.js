/*
 * @Author: Squall Sha
 * @Date: 2019-12-02 15:00:00
 */

/**
 * 将请求参数转为query params
 */
const _ = window._;

export const queryParams = (params) => {
  if (!params) { return ''; }
  return Object.keys(params)
    .sort()
    .filter(key => {
      const val = _.trim(params[key]);
      return !_.isEmpty(val);
    })
    .map(key => `${key}=${_.trim(params[key])}`)
    .join('&');
};

/**
 * 获取指定path
 */
export const getPath = (num = 1) => {
  const _arr = window.location.pathname.split('/');
  let _str = '';
  _arr.forEach((item, index) => {
    if (index <= num) {
      _str = item;
    }
  });
  return _str;
};
