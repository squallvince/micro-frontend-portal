import { Menu, Dropdown } from 'antd';
import React, { useState } from 'react';
import IconFont from '../IconFont';
import { MANAGE_PORTAL, OPERATION_PORTAL, Portal } from '../../constants/header';


const ProtalMenu = (props) => {
  const [mode, setMode] = useState(MANAGE_PORTAL);
  const changeMode = (item) => {
    setMode(item.key);
    props.changeMode(item.key);
  };
  const menu = (
    <Menu
      onClick={(item) => (changeMode(item))}
      selectedKeys={[mode]}
      defaultSelectedKeys={[MANAGE_PORTAL]}
    >
      <Menu.Item key={MANAGE_PORTAL}>
        <a href="#">云管门户<span className="hy-top-menu-selected" /></a>
      </Menu.Item>
      <Menu.Item key={OPERATION_PORTAL}>
        <a href="#">运维门户<span className="hy-top-menu-selected" /></a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      className="hy-portal-menu"
      overlayClassName="hy-portal-menu-dropdown"
      overlay={menu}
      trigger={['click']}
    >
      <span className="hy-menu-dropdown-link">
        <IconFont type="icon-computing" />{Portal[mode]}
      </span>
    </Dropdown>
  );
};

export default ProtalMenu;
