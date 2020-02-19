/*
 * @Author: Squall Sha 
 * @Date: 2020-02-18 17:27:52 
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-02-18 17:36:25
 */

import React, { FC } from 'react';
// import { Link } from '@reach/router';
import LoginFormSubmit from 'components/Login/Form/FormSubmit';
import LoginSocial from 'components/Login/LoginSocial';

const Index: FC = () => {
  return (
    <section className="login-form">
      <h1 className="text-header">Sign in</h1>
      {/* <p className="text-email">
        New user? <Link to="/" className="text-link"> Create an account </Link>
      </p> */}
      <LoginFormSubmit />
      <LoginSocial />
    </section>
  );
};

export default Index;
