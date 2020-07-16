/*
 * @Author: Squall Sha
 * @Date: 2020-06-05 10:44:43
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-06-05 14:52:21
 */

const BindUrlRefresh = (commonFunc) => {
  window.addEventListener('load', commonFunc(), false);
  window.addEventListener('popstate', commonFunc(), false);
};

export { BindUrlRefresh };
