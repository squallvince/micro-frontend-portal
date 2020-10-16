/*
 * @Author: Squall Sha
 * @Date: 2019-12-19 11:09:03
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-16 18:07:15
 */

import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import RootComponent from './root.component';

const appWithProvider: any = () => {
  return (
    <RootComponent />
  );
};

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: appWithProvider,
  domElementGetter: () => document.querySelector('.content-section') as Element
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