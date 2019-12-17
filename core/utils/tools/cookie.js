/**
 * cookie
 *
 * @author: Squall Sha
 * @created:  2019-11-26 18:00:00
 */

function _parseCookieValue(s) {
  if (s.indexOf('"') === 0) {
    // This is a quoted cookie as according to RFC2068, unescape...
    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return s;
}

/**
 * 设置cookie
 */
export const set = (name, value, day = 30) => {
  const exp = new Date();
  exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp.toGMTString()}; path=/`;
};

/**
 * 读取cookie
 */
export const get = (name) => {
  const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
  if (arr != null) return decodeURIComponent(_parseCookieValue(arr[2]));
  return null;
};

/**
 * 删除cookie
 */
export const del = (name) => {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = get(name);
  if (cval != null) document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
};
