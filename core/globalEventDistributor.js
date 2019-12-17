/*
 * @Author: Zhou zhongyu
 * @Date: 2019-10-26 09:00:00
 */

export default class GlobalEventDistributor {

  constructor() {
    this.stores = [];
  }

  registerStore(store) {
    this.stores.push(store);
  }

  dispatch(event) {
    this.stores.forEach((s) => {
      s.dispatch(event);
    });
  }

  getState() {
    const state = {};
    this.stores.forEach((s) => {
      const currentState = s.getState();
      state[currentState.namespace] = currentState;
    });
    return state;
  }
}
