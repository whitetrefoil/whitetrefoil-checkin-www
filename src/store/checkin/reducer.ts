import omit                          from 'object.omit'
import { ActionType, createReducer } from 'typesafe-actions'
import { Checkin }                   from '~/interfaces/checkin'
import * as A                        from './actions'


type Action = ActionType<typeof A>


export interface State {
  [venueId: string]: Saveable<Checkin>
}


export default createReducer<State, Action>({})

  .handleAction(A.CHECKIN.request, (s, { payload }) => ({
    ...s,
    [payload[0]]: {
      ...omit(s[payload[0]], 'saveError'),
      saving: true,
    },
  }))

  .handleAction(A.CHECKIN.success, (s, { payload }) => ({
    ...s,
    [payload[0]]: {
      ...omit(s[payload[0]], ['saveError', 'saving']),
      data: payload[1],
    },
  }))

  .handleAction(A.CHECKIN.failure, (s, { payload }) => ({
    ...s,
    [payload[0]]: {
      ...omit(s[payload[0]], ['saving', 'data']),
      saveError: payload[1],
    },
  }))

