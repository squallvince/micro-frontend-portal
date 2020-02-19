/*
 * @Author: Squall Sha
 * @Date: 2019-12-19 11:09:03
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-02-18 16:41:18
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import singleSpaReact from 'single-spa-react';
import RootComponent from './root.component';
import configureStore from 'store';

const store = configureStore();

const appWithProvider: any = () => {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
};

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: appWithProvider,
  domElementGetter: () => document.querySelector('.root') as Element
});

export const bootstrap = [
  reactLifecycles.bootstrap
];

export const mount = [
  reactLifecycles.mount
];

export const unmount = [
  reactLifecycles.unmount
];