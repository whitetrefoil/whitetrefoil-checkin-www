import { call, put, takeEvery } from 'redux-saga/effects'
import { addCheckin }           from '~/api/add-checkin'
import { Geo }                  from '~/interfaces/geo'
import { APPEND }               from '~/store/history/actions'
import { CHECKIN }              from './actions'


function *doCheckin(action: PA<[string, Geo]>) {
  const [venueId] = action.payload
  try {
    const checkin: AsyncReturnValue<typeof addCheckin> = yield call(addCheckin, action.payload[0], action.payload[1])
    yield put(CHECKIN.success([venueId, checkin]))
    yield put(APPEND(venueId))
  } catch (e) {
    yield put(CHECKIN.failure([venueId, e]))
  }
}


export function *watch() {
  yield takeEvery(CHECKIN.request, doCheckin)
}
