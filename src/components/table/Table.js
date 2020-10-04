import {$} from '@core/dom';
import {BaseComponent} from '@core/BaseComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelector} from '@/components/table/TableSelector';
import * as actions from '@/store/actions';
import {defaultStyles} from '@core/constants';
import {
  getDataId,
  getMatrixCellsIds,
  nextSelector,
} from '@/components/table/table.functions';
import {parseExpression} from '@core/parseExpression';

export class Table extends BaseComponent {
  static className = 'excel__table';
  static defaultActiveCell = '0:0';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
    this.state = this.store.getState();
    Table.rowCount = this.state.rowCount || 1000;
  }

  prepare() {
    this.selector = new TableSelector();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find(`[data-id="${Table.defaultActiveCell}"]`));

    this.$on('formula:input', value => {
      this.selector.current
          .attr('data-value', value)
          .text(parseExpression(value))
      ;
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selector.current.focus();
    });

    this.$on('toolbar.applyStyle', value => {
      this.selector.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selector.selectedIds,
      }));
    });
  }

  selectCell($cell) {
    this.selector.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  toHTML() {
    return createTable(Table.rowCount, this.store.getState());
  }

  onMousedown(event) {
    if (this.shouldResize(event)) {
      this.resizeTable(event);
    }
    if (this.isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = getMatrixCellsIds($target, this.selector.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selector.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  shouldResize(event) {
    return event.target.dataset.resize;
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error', e.message);
    }
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
    const text = $(event.target).text();
    this.updateTextInStore(text);
  }

  updateTextInStore(text) {
    this.$dispatch(actions.changeText({
      id: this.selector.current.data.id,
      text,
    }));
  }
}
