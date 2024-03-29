import {DomListener} from '@core/DomListener';

export class BaseComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.observedStates = options.observedStates || [];
    this.unsubscribers = [];
    this.prepare();
  }

  toHTML() {
    return '';
  }

  prepare() {}

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsubFn => unsubFn());
  }

  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  $on(eventName, fn) {
    const unsubFn = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsubFn);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged(changes) {}

  isWatching(stateKey) {
    return this.observedStates.includes(stateKey);
  }
}
