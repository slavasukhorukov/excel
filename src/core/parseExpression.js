export function parseExpression(value = '') {
  if (isExpression(value)) {
    try {
      return eval(value.slice(1));
    } catch (e) {
      return value;
    }
  }
  return value;
}

export function isExpression(text) {
  return text.startsWith('=');
}
