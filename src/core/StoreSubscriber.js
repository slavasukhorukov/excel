import {isEqual} from '@core/utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.subscription = null;
    this.prevState = {};
  }

  subscribeComponents(components) {
    this._refreshPrevState();
    const stateComparator = state => {
      Object.keys(state).forEach(key => {
        if (isEqual(this.prevState[key], state[key])) {
          return;
        }
        components.forEach(component => {
          if (component.isWatching(key)) {
            const changes = {[key]: state[key]};
            component.storeChanged(changes);
          }
        });
      });
      this._refreshPrevState();
    };
    this.subscription = this.store.subscribe(stateComparator);
  }

  _refreshPrevState() {
    this.prevState = this.store.getState();
  }

  unsubscribeFromStore() {
    this.subscription.unsubscribe();
  }
}
