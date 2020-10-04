import {createHeader} from '@/components/header/header.template';
import {BaseComponent} from '@core/BaseComponent';
import * as actions from '@/store/actions';
import {debounce} from '@core/utils';

export class Header extends BaseComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(event) {
    this.$dispatch(actions.changeDocumentTitle({
      title: event.target.value,
    }));
  }

  toHTML() {
    return createHeader(this.store.getState());
  }
}
