import { call, put, takeLatest } from 'redux-saga/effects'
import { getVenues }             from '~/api/get-venues'
import { Geo }                   from '~/interfaces/geo'
import { FETCH_VENUES }          from './actions'


function *doFetchVenues(action: PA<[string, Geo]>) {
  const [search, geo] = action.payload
  try {
    const { venues }: AsyncReturnValue<typeof getVenues> = yield call(getVenues, geo, search)
    yield put(FETCH_VENUES.success(venues))
  } catch (e) {
    yield put(FETCH_VENUES.failure(e))
  }
}


export function *watch() {
  yield takeLatest(FETCH_VENUES.request, doFetchVenues)
}
