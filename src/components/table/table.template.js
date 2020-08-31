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
  const resizer = rowNum
      ? '<div class="row-resize" data-resize="row"></div>'
      : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowNum}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(_, colNum) {
  return `<div class="cell" contenteditable data-col="${colNum}"></div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index);
}
