import defer                              from '@redux-saga/deferred'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import type { Geo }                       from '~/interfaces/geo'
import * as A                             from './actions'
import { $geo }                           from './selectors'


async function getGeo(): Promise<Geo> {
  const deferred = defer<Geo>()
  window.navigator.geolocation.getCurrentPosition(
    gp => {
      deferred.resolve([gp.coords.latitude, gp.coords.longitude, gp.coords.altitude ?? 0, gp.coords.accuracy])
    },
    err => {
      deferred.reject(err)
    },
    { enableHighAccuracy: false },
  )
  return deferred.promise
}

function *get() {
  const current = (yield select($geo)) as ReturnType<typeof $geo>
  if (current != null) {
    return
  }
  try {
    const geo = (yield call(getGeo)) as ResolvedReturn<typeof getGeo>
    yield put(A.SET(geo))
  } catch (e: unknown) {
    yield put(A.UNSET())
  }
}


export function *watch() {
  yield takeLeading(A.GET, get)
}
