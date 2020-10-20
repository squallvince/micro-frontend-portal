/*
 * @Author: Squall Sha
 * @Date: 2019-12-19 11:09:03
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-16 11:51:54
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { renderRoutes } from 'react-router-config';
// import { ConnectedRouter } from 'connected-react-router';
import { Normalize } from 'styled-normalize';
// import routes from './routes';
import App from 'pages/App';
import configureStore from 'store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Normalize />
    <App />
  </Provider>,
  document.getElementById('root')
);