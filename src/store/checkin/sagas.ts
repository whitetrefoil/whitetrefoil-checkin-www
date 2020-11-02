import { call, put, takeEvery } from 'redux-saga/effects'
import { addCheckin }           from '~/api/add-checkin'
import type { Geo }             from '~/interfaces/geo'
import { APPEND }               from '~/store/history/actions'
import { CHECKIN }              from './actions'


function *doCheckin(action: PA<[string, Geo]>) {
  const [venueId] = action.payload
  try {
    const checkin = (yield call(addCheckin, action.payload[0], action.payload[1])) as ResolvedReturn<typeof addCheckin>
    yield put(CHECKIN.success([venueId, checkin]))
    yield put(APPEND(venueId))
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error('unknown error')
    yield put(CHECKIN.failure([venueId, error]))
  }
}


export function *watch() {
  yield takeEvery(CHECKIN.request, doCheckin)
}
