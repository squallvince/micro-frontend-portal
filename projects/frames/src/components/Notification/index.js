import { Notification } from 'antd';
import React from 'react';
import Icon from './Icon';
import './index.less';

const notification = {};
const NoticeTypes = [
  { type: 'error', defaultDuration: 0, icon: 'error-o' },
  { type: 'success', defaultDuration: 4, icon: 'correct-o' },
  { type: 'info', defaultDuration: 4, icon: 'info-o' },
  { type: 'warning', defaultDuration: 4, icon: 'warning-o' }
];

const NoticeContent = ({ description, duration, type }) => {
  return (
    <div className="notification-content-wrapper">
      <p className="text"> {description} </p>
      <p className={`notification-progress ${type}`}
        style={
          { animationDuration: `${duration}s` }}
      /> </div>
  );
};

const NoticeTitle = ({ type, title, icon }) => {
  return (
    <div className={`notification-title-wrapper ${type}`}>
      <Icon type={icon} />
      {title && <p className="text title">{title}</p>}
    </div>
  );
};

NoticeTypes.forEach(({ type, defaultDuration, icon }) => {
  notification[type] = (description, title = '', duration = defaultDuration) => {
    const args = {
      message: (
        <NoticeTitle
          type={type}
          title={title}
          icon={icon}
        />
      ),
      description: (
        <NoticeContent
          description={description}
          duration={duration}
          type={type}
        />
      ),
      duration
    };
    Notification.open(args);
  };
});

export default notification;
