import { createAction, createAsyncAction, NoMeta } from 'typesafe-actions';
import { Checkin }                                 from '~/interfaces/checkin';
import { Geo }                                     from '~/interfaces/geo';
import { Venue }                                   from '~/interfaces/venue';


export const SEARCH = createAction('search/INPUT')<string>();

export const FETCH_VENUES = createAsyncAction(
  'search/FETCH_VENUES_R',
  'search/FETCH_VENUES_S',
  'search/FETCH_VENUES_F',
)<NoMeta<[string, Geo]>, Venue[], Error>();

export const CHECKIN = createAsyncAction(
  'search/CHECKIN_R',
  'search/CHECKIN_S',
  'search/CHECKIN_F',
)<NoMeta<[string, Geo]>, NoMeta<[string, Checkin]>, NoMeta<[string, Error]>>();

export const RESET = createAction('search/RESET')<void>();
