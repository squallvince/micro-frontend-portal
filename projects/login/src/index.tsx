/*
 * @Author: Squall Sha
 * @Date: 2019-12-19 11:09:03
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-02-18 16:41:18
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store';
import { Normalize } from 'styled-normalize';
import Login from 'components/Login';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Normalize />
    <Login />
  </Provider>,
  document.getElementById('root')
);