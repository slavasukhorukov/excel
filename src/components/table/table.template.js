import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@core/constants';
import {parseExpression} from '@core/parseExpression';

const CHAR_CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 25;

export function createTable(rowsCount = 20, state) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')
  ;

  const rows = [];
  rows.push(createRow(cols, '', state));
  for (let rowNum = 0; rowNum < rowsCount; rowNum++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(rowNum, state))
        .join('')
    ;
    rows.push(createRow(cells, rowNum + 1, state.rowsState));
  }

  return rows.join('');
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index);
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colsState, index),
    };
  };
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function toColumn({col, index, width}) {
  return `
    <div 
        class="column" 
        data-type="resizable" 
        data-col="${index}" 
        style="width: ${width}"
    >
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, rowNum = '', state) {
  const dataRow = rowNum
      ? `data-row="${rowNum}"`
      : '';
  const resizer = rowNum
      ? '<div class="row-resize" data-resize="row"></div>'
      : '';

  const height = getHeight(state, rowNum);

  return `
    <div class="row" data-type="resizable" ${dataRow} style="height: ${height}">
      <div class="row-info">
        ${rowNum}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(rowNum, state) {
  return function(_, colNum) {
    const width = getWidth(state.colsState, colNum);
    const dataId = `${rowNum}:${colNum}`;
    const textFromState = state.dataTableState[dataId] || '';
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[dataId],
    });
    return `
      <div class="cell" 
        contenteditable 
        data-col="${colNum}"
        data-type="cell"
        data-id="${dataId}"
        data-value="${textFromState}"
        style="${styles} width: ${width}"
      >${parseExpression(textFromState) || ''}</div>
    `;
  };
}
