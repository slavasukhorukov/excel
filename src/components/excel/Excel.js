import {$} from '@core/dom';

export class Excel {
  className = 'excel';

  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = options.emitter;
    this.store = options.store;
    this.storeSubscriber = options.storeSubscriber;
  }

  getRoot() {
    $.create();
    const $root = $.create('div', this.className);

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.storeSubscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.storeSubscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}
