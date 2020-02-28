/*
 * @Author: Squall Sha
 * @Date: 2020-02-21 16:04:55
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-02-27 14:32:33
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import './index.less';

const { Sider } = Layout;

const sider = props => {
  const { className } = props;

  const [notifications] = useState([]);
  console.log(notifications);

  return (
    <Sider className={clsx('', className)}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="calendar" />
          Navigation Two
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

sider.propTypes = {
  className: PropTypes.string
};

export default sider;
