import type { NoMeta }                     from 'typesafe-actions'
import { createAction, createAsyncAction } from 'typesafe-actions'
import type { Geo }                        from '~/interfaces/geo'
import type { Venue }                      from '~/interfaces/venue'


export const SEARCH = createAction('search/INPUT')<string>()

export const FETCH_VENUES = createAsyncAction(
  'search/FETCH_VENUES_R',
  'search/FETCH_VENUES_S',
  'search/FETCH_VENUES_F',
)<NoMeta<[string, Geo]>, Venue[], Error>()

export const RESET = createAction('search/RESET')<void>()
