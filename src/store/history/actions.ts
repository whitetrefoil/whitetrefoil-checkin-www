import { createAction } from 'typesafe-actions';

export const SET = createAction('history/SET')<Record<string, number>>();
export const APPEND = createAction('history/APPEND')<string>();
