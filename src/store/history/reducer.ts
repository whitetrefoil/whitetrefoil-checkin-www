import type { ActionType } from 'typesafe-actions'
import { createReducer }   from 'typesafe-actions'
import * as A              from './actions'

type Action = ActionType<typeof A>

export interface State {
  [venueId: string]: number
}

export default createReducer<State, Action>({})
  .handleAction(A.SET, (s, { payload }) => payload)
  .handleAction(A.APPEND, (s, { payload }) => ({
    ...s,
    [payload]: Date.now(),
  }))

