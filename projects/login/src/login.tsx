/*
 * @Author: Squall Sha
 * @Date: 2019-12-19 11:09:03
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2019-12-25 11:24:04
 */
import React, { FC } from 'react';
import LOGINFORM from './components/index';
import './less/index';

const LOGINTEXT: FC = () => {
  return (
    <section className="login-item login-context">
      <div className="login-container">
        <div className="context">
          <div className="context-header">
            <div className="context-header-icon" />
            <h1 className="context-header-title">Login</h1>
          </div>
          <p className="context-copy">Sign in or create an account</p>
        </div>
      </div>
    </section>
  );
};

const LOGIN: FC = () => {
  return (
    <section className="login-bg">
      <section className="login-grid">
        <LOGINTEXT />
        <LOGINFORM />
      </section>
    </section>
  );
};

export default LOGIN;
