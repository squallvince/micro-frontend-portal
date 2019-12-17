/*
 * @Author: Squall Sha
 * @Date: 2019-11-14 11:00:00
 */
import React from 'react';
// import classnames from 'classnames';
import { Link } from '@reach/router';

const Logo = ({ prefixCls, collapsed, src, srcMini, to }) => {
  const url = collapsed ? srcMini : src;
  // const classes = classnames(`${prefixCls}-logo`, {
  //   [`${prefixCls}-logo-mini`]: !!collapsed
  // });
  return (
    <Link
      key={to}
      to={to}
      className="hy-logo"
    >
      <img alt="logo" src={url}/>
    </Link>
  );
};

export default Logo;
