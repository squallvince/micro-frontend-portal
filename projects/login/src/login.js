import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
// import setPublicPath from './set-public-path';
import RootComponent from './root.component';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  // loadRootComponent: () => import('./root.component.js').then(namespace => namespace.default),
  rootComponent: RootComponent,
  domElementGetter: () => document.querySelector('.root')
});

export const bootstrap = [
  // setPublicPath,
  reactLifecycles.bootstrap
];

export const mount = [
  reactLifecycles.mount
];

export const unmount = [
  reactLifecycles.unmount
];

export const unload = [
  reactLifecycles.unload
];

