import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';
import router from './router';

const domElementGetter = () => {
  const el = document.querySelector('main');
  const div = document.createElement('div');
  el.appendChild(div);
  return div;
};

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    render: h => h(App),
    el: domElementGetter()
  }
});
export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
