import { createAction, createAsyncAction } from 'typesafe-actions'
import type { Geo }                        from '~/interfaces/geo'
import type { Venue }                      from '~/interfaces/venue'


export const FETCH_VENUES = createAsyncAction(
  'list/FETCH_VENUES_R',
  'list/FETCH_VENUES_S',
  'list/FETCH_VENUES_F',
)<Geo, Venue[], Error>()

export const RESET = createAction('list/RESET')<void>()
