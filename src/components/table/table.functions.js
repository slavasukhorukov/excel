import {range} from '@core/utils';
import {Table} from '@/components/table/Table';

export function getMatrixCellsIds($target, $current) {
  const targetDataId = getDataId($target);
  const currentDataId = getDataId($current);
  const cols = range(currentDataId.col, targetDataId.col);
  const rows = range(currentDataId.row, targetDataId.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function getDataId($el) {
  const [row, col] = $el.data.id.split(':');
  return {
    row: parseInt(row),
    col: parseInt(col),
  };
}

export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0;
  const MAX_COL_VALUE = 25;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > Table.rowCount - 1 ? Table.rowCount - 1 : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_COL_VALUE ? MAX_COL_VALUE : col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
