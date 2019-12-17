export const PATH_PREFIX = '/front'; // 项目路由前缀
export const ResourceID = window.ResourceID || '9ee8bc17-6b31-4993-9cf3-50a3c4c6f741'; // 资源ID
export const MANAGE_PORTAL = 'manage'; // 云管门户，
export const OPERATION_PORTAL = 'operation'; // 运维门户

export const Portal = {
  [MANAGE_PORTAL]: '云管门户',
  [OPERATION_PORTAL]: '运维门户'
};

// 路由跳转，添加前缀和后缀
export const gotoLink = (path, id, pathSuffix) => {
  path = path || '';
  const hasSuffix = id === ResourceID;
  const targetPath = `${PATH_PREFIX}${path}${hasSuffix ? pathSuffix : ''}`;
  window.singleSpaNavigate(targetPath);
};
