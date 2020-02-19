/*
 * @Author: Squall Sha
 * @Date: 2019-12-23 11:14:08
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-02-18 17:25:03
 */

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from 'components/Login';

class Root extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Route path="/">
            <Login />
          </Route>
        </BrowserRouter>
      </>
    );
  }
}

export default Root;