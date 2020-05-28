import { createAction, createAsyncAction, NoMeta } from 'typesafe-actions';
import { Checkin }                                 from '~/interfaces/checkin';
import { Geo }                                     from '~/interfaces/geo';
import { Venue }                                   from '~/interfaces/venue';


export const FETCH_VENUES = createAsyncAction(
  'list/FETCH_VENUES_R',
  'list/FETCH_VENUES_S',
  'list/FETCH_VENUES_F',
)<Geo, Venue[], Error>();

export const CHECKIN = createAsyncAction(
  'list/CHECKIN_R',
  'list/CHECKIN_S',
  'list/CHECKIN_F',
)<NoMeta<[string, Geo]>, NoMeta<[string, Checkin]>, NoMeta<[string, Error]>>();

export const GOTO_SEARCH = createAction('list/GOTO_SEARCH')<void>();

export const RESET = createAction('list/RESET')<void>();
