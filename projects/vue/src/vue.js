import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';
import router from './router'

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    render: h => h(App),
    el: '#app'
  }
});

export const bootstrap = [
  vueLifecycles.bootstrap
];

export function mount(props) {
  console.log('----------mount', props);
  return vueLifecycles.mount(props);
}

export function unmount(props) {
  console.log('----------unmount', props);
  return vueLifecycles.unmount(props);
}
