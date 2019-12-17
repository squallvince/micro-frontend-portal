export const LoginErrors = {
  user: '用户名不能为空。',
  password: '登录密码不能为空。',
  oldPassword: '原密码不能为空',
  newPassword: '新密码不能为空',
  confirmPassword: '确认密码不能为空',
  passwordValid: '6-20字符，须同时包含英文大、小写、数字和特殊字符'
};

export const AuthErrors = {
  'NamePasswordNotMatch': '当前用户名或密码错误。',
  'InvalidUser.NotFound': '未找到用户。',
  'UserInactive': '此用户被禁用，请联系管理员。',
  'ClientIPIsNotPermitted': '客户端IP不在许可IP地址段内。',
  'OldPassword.Error': '原密码不正确。',
  'AuthFailure': 'Session已失效，请重新登录。',
  'ConnectError': '服务连接失败，请联系管理员'
};
