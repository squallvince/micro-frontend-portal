/*
 * @Author: Squall Sha
 * @Date: 2020-02-21 16:04:55
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-06-05 10:56:35
 */

import React from 'react';
// import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Layout, Breadcrumb } from 'antd';
import './index.less';

const { Content } = Layout;

const main = props => {
  const { className } = props;

  return (
    <Layout className={clsx('', className)}>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="content-section" />
    </Layout>
  );
};

main.propTypes = {
  className: PropTypes.string
};

export default main;
