import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import root from './root.component.js'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: root,
  domElementGetter,
})

export const bootstrap = [
  reactLifecycles.bootstrap,
]

export const mount = [
  reactLifecycles.mount,
]

export const unmount = [
  reactLifecycles.unmount,
]

export const unload = [
  reactLifecycles.unload,
]

function domElementGetter() {
  let el = document.getElementById("planets");
  if (!el) {
    el = document.createElement('div');
    el.id = 'planets';
    document.body.appendChild(el);
  }

  return el;
}
