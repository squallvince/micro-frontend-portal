import { Avatar, Popover } from 'antd';
import React, { useState } from 'react';
import IconFont from '../IconFont';
import userImage from '../../images/user.jpg';
import { PATH_PREFIX } from '../../constants/header';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const path = `${PATH_PREFIX}/setting/personSetting`;
  function layout() {
    window.PromiseFetch('/api/identity/logout', {}, 'post').then((data) => {
      window.singleSpaNavigate('/login');
    }).catch(() => {
      // 请求出错可以在这里控制显示
      // window.Notification.error({
      //   message: '错误',
      //   duration: 0
      // });
    });
  }
  const content = (
    <div className="hy-user-menu-content">
      <ul>
        <li key="0">
          <a onClick={() => window.singleSpaNavigate(path)}><IconFont type="icon-user_setting"/><span>个人设置</span></a>
        </li>
      </ul>
      <a className="hy-user-menu-layout" onClick={layout}><IconFont type="icon-signout"/><span>退出</span></a>
    </div>
  );
  return (
    <Popover
      className="hy-user-menu"
      placement="bottomRight"
      style={{ top: '50px' }}
      content={content}
      trigger="click"
    >
      <div onClick={() => setOpen(!open)}>
        <Avatar
          shape="square"
          icon={
            <img alt="user" src={userImage} />
          }
        />
        <div className="hy-user-menu-info">
          <div>admin</div>
          <div>超级管理员</div>
        </div>
        <IconFont
          style={{ fontSize: 12 }}
          type={`${open ? 'icon-down' : 'icon-up'}`}
        />
      </div>
    </Popover>
  );
};

export default UserMenu;
