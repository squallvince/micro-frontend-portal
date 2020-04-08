/*
 * @Author: Squall Sha
 * @Date: 2020-02-21 16:04:55
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-03-11 10:36:12
 */

import React from 'react';
// import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Layout, Menu, Icon } from 'antd';
import './index.less';

const { Sider } = Layout;

const sider = props => {
  const { className } = props;
  // const [notifications] = useState([]);
  // console.log(notifications);

  return (
    <Sider className={clsx('', className)}>
      <Menu
        mode="inline"
        // defaultSelectedKeys={['1']}
        className={`${className}-menu`}
      >
        {
          window.menuProjects.length > 0 && window.menuProjects.map(item => {
            return (
              <Menu.Item key={item.name}>
                <Link
                  key={item.name}
                  to={item.prefix}
                >
                  <Icon component={item.name} />
                  {item.name}
                </Link>
              </Menu.Item>
            );
          })
        }
      </Menu>
    </Sider>
  );
};

sider.propTypes = {
  className: PropTypes.string
};

export default sider;
