/*
 * @Author: Squall Sha
 * @Date: 2019-12-24 17:01:31
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2019-12-25 14:53:56
 */
import React, { FC } from 'react';
import { Link } from '@reach/router';
import * as Form from './form';

const LOGINFORM: FC = () => {
  return (
    <section className="login-form">
      <h1 className="text-header">Sign in</h1>
      <p className="text-email">
        New user? <Link to="/" className="text-link"> Create an account </Link>
      </p>
      <Form />
    </section>
  );
};

export default LOGINFORM;
