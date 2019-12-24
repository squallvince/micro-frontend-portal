/*
 * @Author: Squall Sha
 * @Date: 2019-12-23 11:14:08
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2019-12-24 14:25:48
 */

import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './login';

class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path='/login'>
          <Login />
        </Route>
      </BrowserRouter>
    );
  }
}

export default Root;
