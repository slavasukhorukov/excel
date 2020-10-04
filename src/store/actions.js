import {TYPES} from '@/store/types';

export function tableResize(data) {
  return {
    type: TYPES.TABLE_RESIZE,
    payload: data,
  };
}

export function changeText(data) {
  return {
    type: TYPES.CHANGE_TEXT,
    payload: data,
  };
}

export function changeStyles(data) {
  return {
    type: TYPES.CHANGE_STYLES,
    payload: data,
  };
}

export function applyStyle(data) {
  return {
    type: TYPES.APPLY_STYLE,
    payload: data,
  };
}

export function changeDocumentTitle(data) {
  return {
    type: TYPES.CHANGE_DOC_TITLE,
    payload: data,
  };
}
