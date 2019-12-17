/**
 * 入口配置
 *
 * @author: Squall Sha
 * @created:  2019-11-26 18:00:00
 */

import { getCurrentPortal } from '../utils/cache';

window.LangCode = 'zh_CN';

const PORTAL_INTL = {
  ADMIN: {
    'zh_CN': '云管门户',
    'en': 'Cloud Management'
  },
  PROJECT: {
    'zh_CN': '自服务门户',
    'en': 'Own Service'
  },
  SELFSERVICE: {
    'zh_CN': '自服务门户',
    'en': 'Own Service'
  },
  OPERATION: {
    'zh_CN': '运维门户',
    'en': 'Operation Management'
  }
};

export const PORTAL = {
  admin: {
    id: 'admin',
    name: PORTAL_INTL.ADMIN[window.LangCode],
    url: '/admin/overview'
  },
  project: {
    id: 'project',
    name: PORTAL_INTL.SELFSERVICE[window.LangCode],
    url: '/project/overview'
  },
  selfservice: {
    id: 'selfservice',
    name: PORTAL_INTL.SELFSERVICE[window.LangCode],
    url: '/selfservice/overview'
  },
  operation: {
    id: 'operation',
    name: PORTAL_INTL.OPERATION[window.LangCode],
    url: '/operation/overview/'
  }
};

export const PORTAL_XSCOPE_MAPPER = {
  admin: 'System',
  project: 'Project',
  operation: 'System'
};

export const getXScope = () => {
  return PORTAL_XSCOPE_MAPPER[getCurrentPortal()];
};
