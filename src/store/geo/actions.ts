import { createAction } from 'typesafe-actions'
import { Geo }          from '~/interfaces/geo'

export const GET = createAction('geo/GET')<void>()
export const SET = createAction('geo/SET')<Geo>()
export const UNSET = createAction('geo/UNSET')<void>()
