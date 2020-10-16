/*
 * @Author: Squall Sha
 * @Date: 2019-12-23 11:14:08
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-16 14:27:00
 */

import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';
import { Normalize } from 'styled-normalize';
import routes from './routes';
import configureStore, { history } from './store';

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Normalize />
        <ConnectedRouter history={history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;