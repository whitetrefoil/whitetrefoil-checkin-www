import { createAction, createAsyncAction } from 'typesafe-actions'
import type { User }                       from '~/interfaces/user'


export const LOGIN = createAsyncAction(
  'session/LOGIN_R',
  'session/LOGIN_S',
  'session/LOGIN_F',
)<string, { token: string, user: User }, unknown>()


export const FETCH_USER = createAsyncAction(
  'session/FETCH_USER_R',
  'session/FETCH_USER_S',
  'session/FETCH_USER_F',
)<void, User, unknown>()


export const AUTH_ERROR = createAction('session/AUTH_ERROR')<void>()
