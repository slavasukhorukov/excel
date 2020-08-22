import {BaseComponent} from '@core/BaseComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends BaseComponent {
  static className = 'excel__table';

  toHTML() {
    return createTable(11);
  }
}
