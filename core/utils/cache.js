/**
 * 一些通用方法
 *
 * @author: Squall Sha
 * @created:  2019-11-26 18:00:00
 */
import { PORTAL } from '../constants/config';
import { get } from './tools/storage';

const _ = window._;
/**
 * 获取当前的portal
 * 可选值：admin, project,selfservice
 * @returns {*}
 */
export const getCurrentPortal = () => {
  const portalInUrl = location.pathname.split('/')[1];

  if (!_.isEmpty(portalInUrl) && PORTAL[portalInUrl.toUpperCase()]) {
    return PORTAL[portalInUrl.toUpperCase()];
  }

  const portal = localStorage.currentPortal;
  if (portal) {
    return portal;
  }
  return '';
};

/**
 * 判断当前用户是否为云平台管理员 --- 新 （根据角色判断）
 */
export const isAdmin = () => {
  let result = false;
  const systemRole = localStorage.systemRole;
  if (systemRole && _.size(systemRole) > 0) {
    Object.keys(JSON.parse(systemRole)).forEach(item => {
      if (item.type === 'System' && item.portal === 'Admin') {
        result = true;
      }
    });
  }
  return result;
};

export const getCurrentVDC = () => {
  const currentVDCId = get('currentVDCId');

  if (currentVDCId) {
    return currentVDCId;
  }

  return '';
};

/**
 * 判断当前用户是否为VDC管理员
 * 注意：若用户既是平台管理员，又是VDC管理员，也返回true
 */
export const isVdcManager = () => {
  let result = false;
  const systemRole = localStorage.systemRole;
  if (systemRole && _.size(systemRole) > 0) {
    Object.keys(JSON.parse(systemRole)).forEach(item => {
      if (item.type === 'Vdc' && item.portal === 'Admin') {
        result = true;
      }
    });
  }
  return result;
};
