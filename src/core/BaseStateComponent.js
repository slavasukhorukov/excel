import {BaseComponent} from '@core/BaseComponent';

export class BaseStateComponent extends BaseComponent {
  constructor(...args) {
    super(...args);
  }

  get template() {
    throw new Error('Getter [template] must be override');
  }

  setState(newState) {
    // необходимо реализовать проверку нового и старого состояния,
    // чтобы не переасайнивать объекты каждый раз
    this.state = {...this.state, ...newState};
    this.$root.html(this.template);
  }

  initState(initialState = {}) {
    this.state = {...initialState};
  }
}
