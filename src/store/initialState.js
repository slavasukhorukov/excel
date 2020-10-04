import {storage} from '@core/utils';
import {defaultDocumentTitle} from '@core/constants';

const defaultState = {
  rowCount: 10,
  rowsState: {},
  colsState: {},
  dataTableState: {},
  stylesState: {},
  currentStyles: defaultStatus,
  currentText: '',
  documentTitle: defaultDocumentTitle,
};

export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState;
