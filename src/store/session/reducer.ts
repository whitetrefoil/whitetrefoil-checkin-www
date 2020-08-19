import omit                          from 'object.omit'
import { ActionType, createReducer } from 'typesafe-actions'
import { User }                      from '~/interfaces/user'
import * as A                        from './actions'


export interface State {
  token?: string
  user?: User
}

export default createReducer<State, ActionType<typeof A>>({})

  .handleAction(A.LOGIN.success, (s, { payload }) => ({
    token: payload.token,
    user : payload.user,
  }))

  .handleAction(A.LOGIN.failure, s => omit(s, ['token', 'user']))

  .handleAction(A.FETCH_USER.success, (s, { payload }) => ({
    ...s,
    user: payload,
  }))

  .handleAction(A.FETCH_USER.failure, s => omit(s, ['token', 'user']))

  .handleAction(A.AUTH_ERROR, s => omit(s, ['token', 'user']))

