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
import { Layout, Breadcrumb } from 'antd';
import './index.less';

const main = props => {
  const { className } = props;
  // const [notifications] = useState([]);
  // console.log(notifications);

  return (
    <Layout className={clsx('', className)}>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
    </Layout>
  );
};

main.propTypes = {
  className: PropTypes.string
};

export default main;
