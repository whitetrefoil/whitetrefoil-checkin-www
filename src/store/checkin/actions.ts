import type { NoMeta }       from 'typesafe-actions'
import { createAsyncAction } from 'typesafe-actions'
import type { Checkin }      from '~/interfaces/checkin'
import type { Geo }          from '~/interfaces/geo'


export const CHECKIN = createAsyncAction(
  'checkin/CHECKIN_R',
  'checkin/CHECKIN_S',
  'checkin/CHECKIN_F',
)<NoMeta<[string, Geo]>, NoMeta<[string, Checkin]>, NoMeta<[string, Error]>>()
