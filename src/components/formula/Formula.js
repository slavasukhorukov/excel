import {BaseComponent} from '@core/BaseComponent';
import {$} from '@core/dom';

export class Formula extends BaseComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
    this.setText = this.setText.bind(this);
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', this.setText);

    this.$on('table:input', this.setText);
  }

  setText($cell) {
    this.$formula.text($cell.text());
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
