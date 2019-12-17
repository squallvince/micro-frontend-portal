import React from 'react';
import './index.less';

export default function Loading(props) {
  const renderDefault = (size) => {
    return (
      <div className="loading-view" style={{ width: size, height: size }}>
        <div className="item item-1" />
        <div className="item item-2" />
        <div className="item item-3" />
        <div className="item item-4" />
        <div className="item item-5" />
      </div>
    );
  };

  const renderCircle = (prefixCls, size) => {
    return (
      <div className={`${prefixCls}-circle`} style={{ width: size, height: size }} >
        <div className={`${prefixCls}-circle1`} />
        <div className={`${prefixCls}-circle2`} />
        <div className={`${prefixCls}-circle3`} />
        <div className={`${prefixCls}-circle4`} />
        <div className={`${prefixCls}-circle5`} />
        <div className={`${prefixCls}-circle6`} />
        <div className={`${prefixCls}-circle7`} />
        <div className={`${prefixCls}-circle8`} />
        <div className={`${prefixCls}-circle9`} />
        <div className={`${prefixCls}-circle10`} />
        <div className={`${prefixCls}-circle11`} />
        <div className={`${prefixCls}-circle12`} />
      </div>
    );
  };

  const { prefixCls, className, style, mask, type } = props;
  const classes = `${prefixCls}-loading ${mask || ''} ${className || ''}`;
  let size;
  switch (props.size) {
    case 'small':
      size = 30;
      break;
    case 'large':
      size = 60;
      break;
    default:
      size = props.size;
  }

  return (
    <div className={classes} style={style}>
      {type === 'circle' ? renderCircle(prefixCls, size) : renderDefault(size)}
    </div>
  );
}

Loading.defaultProps = {
  prefixCls: 'hy',
  className: '',
  style: null,
  size: 'large',
  mask: false,
  type: 'default'
};
