import React from 'react';

export default function Icon(props) {
  const { type } = props;
  return <i className={`iconfont icon-${type}`} />;
}
