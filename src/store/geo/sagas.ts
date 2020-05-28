import defer                      from '@redux-saga/deferred';
import { call, put, takeLeading } from 'redux-saga/effects';
import { Geo }                    from '~/interfaces/geo';
import * as A                     from './actions';

function *get() {
  try {
    const geo: Geo = yield call(() => {
      const deferred = defer<Geo>();
      window.navigator.geolocation.getCurrentPosition(
        gp => {
          deferred.resolve([gp.coords.latitude, gp.coords.longitude, gp.coords.altitude ?? 0, gp.coords.accuracy]);
        },
        err => {
          deferred.reject(err);
        },
        { enableHighAccuracy: false },
      );
      return deferred.promise;
    });
    yield put(A.SET(geo));
  } catch (e) {
    yield put(A.UNSET());
  }
}


export function *watch() {
  yield takeLeading(A.GET, get);
}
