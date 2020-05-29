import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { addCheckin }                       from '~/api/add-checkin';
import { getVenues }                        from '~/api/get-venues';
import { Geo }                              from '~/interfaces/geo';
import { APPEND }                           from '~/store/history/actions';
import { CHECKIN, FETCH_VENUES }            from './actions';


function *doFetchVenues(action: PA<Geo>) {
  const geo = action.payload;
  try {
    const { venues }: AsyncReturnValue<typeof getVenues> = yield call(getVenues, geo);
    yield put(FETCH_VENUES.success(venues));
  } catch (e) {
    yield put(FETCH_VENUES.failure(e));
  }
}

function *doCheckin(action: PA<[string, Geo]>) {
  const [venueId] = action.payload;
  try {
    const checkin: AsyncReturnValue<typeof addCheckin> = yield call(addCheckin, action.payload[0], action.payload[1]);
    yield put(CHECKIN.success([venueId, checkin]));
    yield put(APPEND(venueId));
  } catch (e) {
    yield put(CHECKIN.failure([venueId, e]));
  }
}


export function *watch() {
  yield takeLatest(FETCH_VENUES.request, doFetchVenues);
  yield takeEvery(CHECKIN.request, doCheckin);
}
