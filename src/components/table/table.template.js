const CHAR_CODES = {
  A: 65,
  Z: 90,
};

export function createTable(rowsCount = 20) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  ;
  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')
  ;

  const rows = [];
  rows.push(createRow(cols));
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}

function createRow(content, rowNum = '') {
  return `
    <div class="row">
      <div class="row-info">${rowNum}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn(col) {
  return `<div class="column">${col}</div>`;
}

function toCell() {
  return `<div class="cell" contenteditable></div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index);
}
