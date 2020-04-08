/*
 * @Author: Squall Sha
 * @Date: 2020-02-21 16:04:55
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-03-04 16:39:21
 */

import React from 'react';
// import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Logo from '../../components/Logo';
import Topbar from '../../components/Topbar';
import './index.less';

const Header = props => {
  const { className, onSidebarOpen, ...rest } = props;

  // const [notifications] = useState([]);
  // console.log(notifications);

  return (
    <header className={clsx('clearfix', className)}>
      <Row {...rest} type="flex">
        <Col span={4}>
          <Logo
            collapsed={false}
            to="/"
          />
        </Col>
        <Col span={20}>
          <Topbar />
        </Col>
      </Row>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
