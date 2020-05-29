import { createAsyncAction, NoMeta } from 'typesafe-actions';
import { Checkin }                   from '~/interfaces/checkin';
import { Geo }                       from '~/interfaces/geo';


export const CHECKIN = createAsyncAction(
  'checkin/CHECKIN_R',
  'checkin/CHECKIN_S',
  'checkin/CHECKIN_F',
)<NoMeta<[string, Geo]>, NoMeta<[string, Checkin]>, NoMeta<[string, Error]>>();
