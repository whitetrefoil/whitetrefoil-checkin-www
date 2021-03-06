import type { ActionType } from 'typesafe-actions'
import { createReducer }   from 'typesafe-actions'
import type { Geo }        from '~/interfaces/geo'
import * as A              from './actions'

export type State = Geo|null

export default createReducer<State, ActionType<typeof A>>(null)
  .handleAction(A.GET, s => s)
  .handleAction(A.SET, (s, { payload }) => payload)
  .handleAction(A.UNSET, () => null)

