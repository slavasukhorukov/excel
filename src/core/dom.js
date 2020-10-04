class Dom {
  constructor(selector) {
    this.$nativeElement = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(htmlContent = '') {
    if (typeof htmlContent === 'string') {
      this.$nativeElement.innerHTML = htmlContent;
      return this;
    }
    return this.$nativeElement.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$nativeElement.textContent = text;
      return this;
    }
    if (this.$nativeElement.tagName.toLocaleLowerCase() === 'input') {
      return this.$nativeElement.value.trim();
    }
    return this.$nativeElement.textContent.trim();
  }

  clear() {
    this.html();
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$nativeElement;
    }
    if (Element.prototype.append) {
      this.$nativeElement.append(node);
    } else {
      this.$nativeElement.appendChild(node);
    }
    return this;
  }

  on(eventType, callback) {
    this.$nativeElement.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$nativeElement.closest(selector));
  }

  getCoords() {
    return this.$nativeElement.getBoundingClientRect();
  }

  get data() {
    return this.$nativeElement.dataset;
  }

  attr(name, value) {
    if (value) {
      this.$nativeElement.setAttribute(name, value);
      return this;
    }
    return this.$nativeElement.getAttribute(name);
  }

  findAll(selector) {
    return this.$nativeElement.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$nativeElement.querySelector(selector));
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$nativeElement.style[key] = styles[key];
    });
  }

  getStyles(styles = []) {
    // как вариант можно переписать на обычный forEach с проверкой,
    // чтобы не было пустых значений
    return styles.reduce((res, s) => {
      res[s] = this.$nativeElement.style[s];
      return res;
    }, {});
  }

  addClass(className) {
    this.$nativeElement.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$nativeElement.classList.remove(className);
    return this;
  }

  focus() {
    this.$nativeElement.focus();
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
