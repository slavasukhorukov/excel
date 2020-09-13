export class TableSelector {
  static activeClass = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(TableSelector.activeClass);
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelector.activeClass));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelector.activeClass));
  }
}
