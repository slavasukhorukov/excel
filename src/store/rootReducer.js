import {TYPES} from './types';

export function rootReducer(state, action) {
  let currentState;
  let stateField;
  switch (action.type) {
    case TYPES.TABLE_RESIZE:
      stateField = action.payload.typeResize === 'col'
          ? 'colsState'
          : 'rowsState';
      currentState = state[stateField] || {};
      currentState[action.payload.id] = action.payload.value;
      return {
        ...state,
        [stateField]: currentState,
      };

    case TYPES.CHANGE_TEXT:
      stateField = 'dataTableState';
      currentState = state[stateField] || {};
      if (!action.payload.text) {
        delete currentState[action.payload.id];
      } else {
        currentState[action.payload.id] = action.payload.text;
      }
      return {
        ...state,
        [stateField]: currentState,
        currentText: action.payload.text,
      };

    case TYPES.CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.payload,
      };

    case TYPES.APPLY_STYLE:
      stateField = 'stylesState';
      currentState = state[stateField] || {};
      action.payload.ids.forEach(id => {
        currentState[id] = {...currentState[id], ...action.payload.value};
      });
      return {
        ...state,
        [stateField]: currentState,
        currentStyles: {...state.currentStyles, ...action.payload.value},
      };

    case TYPES.CHANGE_DOC_TITLE:
      stateField = 'documentTitle';
      return {
        ...state,
        [stateField]: action.payload.title,
      };
    default:
      return state;
  }
}
