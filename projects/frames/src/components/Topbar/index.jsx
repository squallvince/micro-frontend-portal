/*
 * @Author: Squall Sha
 * @Date: 2020-02-26 16:03:30
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-02-26 16:08:37
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Avatar, Badge } from 'antd';

const Topbar = props => {
  const { className } = props;

  return (
    <div className={clsx('top-bar', className)}>
      <Badge dot>
        <Avatar shape="square" icon="user" />
      </Badge>
    </div>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
