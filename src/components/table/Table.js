import {BaseComponent} from '@core/BaseComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';

export class Table extends BaseComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(100);
  }

  onMousedown(event) {
    if (this.shouldResize(event)) {
      resizeHandler(event, this.$root);
    }
  }

  shouldResize(event) {
    return event.target.dataset.resize;
  }
}
