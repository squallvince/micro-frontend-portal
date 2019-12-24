/*
 * @Author: Squall Sha
 * @Date: 2019-12-19 11:09:03
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2019-12-24 17:17:04
 */
import React, { FC } from 'react';
// import * as LoginForm from './components/index';
import './less/index';

const LOGINTEXT = () => {
  return (
    <div className="login-item">
      <div className="login-container">
        <div className="context">
          <div className="context-header">
            <div className="context-header-icon" />
            <h1 className="context-header-title">Login</h1>
          </div>
          <p className="context-copy">Sign in or create an account</p>
        </div>
      </div>
    </div>
  );
};

const LOGIN: FC = () => {
  return (
    <section className="login-bg">
      <section className="login-grid">
        <LOGINTEXT />
      </section>
    </section>
  );
};

export default LOGIN;
