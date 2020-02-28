/*
 * @Author: Squall Sha
 * @Date: 2020-02-18 16:51:44
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-02-20 10:23:30
 */

import React, { FC } from 'react';
import LoginForm from 'components/Login/Form';
import 'less/index';

const LoginText: FC = () => {
  return (
    <section className="login-item login-context">
      <div className="login-container">
        <div className="context">
          <div className="context-header">
            <div className="context-header-icon" />
            <h1 className="context-header-title">Login</h1>
          </div>
          <p className="context-copy">Sign in an account</p>
        </div>
      </div>
    </section>
  );
};

const Login: FC = () => {
  return (
    <section className="login-bg">
      <section className="login-grid">
        <LoginText />
        <LoginForm />
      </section>
    </section>
  );
};

export default Login;
