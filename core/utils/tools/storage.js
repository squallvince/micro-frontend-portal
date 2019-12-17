/**
 * 本地存储相关
 *
 * @author: Zhang feng
 * @created:  2019-11-26 18:00:00
 */

import moment from 'moment';
import STORAGE_KEYS from '../../constants/storageTypes';

const storage = window.localStorage;

const isAuthenticKey = (key) => {
  try {
    if (!key || !Object.values(STORAGE_KEYS).includes(key)) {
      // 抛出一个异常， key不在规定的范围
      throw new Error('this key is not within the specified range !');
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const remove = (key) => {
  if (!isAuthenticKey(key)) {
    return;
  }

  storage.removeItem(key);
};

export const get = (key) => {
  if (!isAuthenticKey(key)) {
    return;
  }

  const data = JSON.parse(storage.getItem(key));
  // 到期时间戳大于当前时间戳或没有限制
  if (data && (data.timestamp > moment().valueOf() || data.timestamp === -1)) {
    return data.value;
  }

  // 到期时间戳小于当前时间移除key返回null
  remove(key);
  return null;
};

export const clear = () => {
  Object.values(STORAGE_KEYS).forEach(key => storage.removeItem(key));
};
