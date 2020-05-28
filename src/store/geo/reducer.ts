import { ActionType, createReducer } from 'typesafe-actions';
import { Geo }                       from '~/interfaces/geo';
import * as A                        from './actions';

export type State = Geo|null;

export default createReducer<State, ActionType<typeof A>>(null)
  .handleAction(A.GET, s => s)
  .handleAction(A.SET, (s, { payload }) => payload)
  .handleAction(A.UNSET, () => null)
;
