import {$} from '@core/dom';
import {BaseComponent} from '@core/BaseComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelector} from '@/components/table/TableSelector';
import {
  getDataId,
  getMatrixCellsIds,
  nextSelector,
} from '@/components/table/table.functions';

export class Table extends BaseComponent {
  static className = 'excel__table';
  static defaultActiveCell = '0:0';
  static rowCount = 1000;

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selector = new TableSelector();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find(`[data-id="${Table.defaultActiveCell}"]`));

    this.$on('formula:input', (text) => {
      this.selector.current.text(text);
    });

    this.$on('formula:done', () => {
      this.selector.current.focus();
    });
  }

  selectCell($cell) {
    this.selector.select($cell);
    this.$emit('table:select', $cell);
  }

  toHTML() {
    return createTable(Table.rowCount);
  }

  onMousedown(event) {
    if (this.shouldResize(event)) {
      resizeHandler(event, this.$root);
    }
    if (this.isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = getMatrixCellsIds($target, this.selector.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selector.selectGroup($cells);
      } else {
        this.selector.select($target);
      }
    }
  }

  shouldResize(event) {
    return event.target.dataset.resize;
  }

  isCell(event) {
    return event.target.dataset.type === 'cell';
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const currentDataId = getDataId(this.selector.current);
      const $nextCell = this.$root.find(nextSelector(key, currentDataId));
      this.selectCell($nextCell);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
