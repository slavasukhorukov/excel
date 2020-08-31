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

  findAll(selector) {
    return this.$nativeElement.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$nativeElement.style[key] = styles[key];
    });
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