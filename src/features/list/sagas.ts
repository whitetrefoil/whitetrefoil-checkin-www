import { call, put, takeLatest } from 'redux-saga/effects'
import { getVenues }             from '~/api/get-venues'
import type { Geo }              from '~/interfaces/geo'
import { FETCH_VENUES }          from './actions'


function *doFetchVenues(action: PA<Geo>) {
  const geo = action.payload
  try {
    const { venues } = (yield call(getVenues, geo)) as ResolvedReturn<typeof getVenues>
    yield put(FETCH_VENUES.success(venues))
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error('unknown error')
    yield put(FETCH_VENUES.failure(error))
  }
}


export function *watch() {
  yield takeLatest(FETCH_VENUES.request, doFetchVenues)
}
