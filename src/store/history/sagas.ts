import { put, select, takeLatest }     from 'redux-saga/effects'
import { ActionType }                  from 'typesafe-actions'
import { FETCH_USER }                  from '~/store/session/actions'
import { getInStorage, updateStorage } from '~/utils/in-storage'
import { $user }                       from '../session/selectors'
import { APPEND, SET }                 from './actions'


function *init(action: ActionType<typeof FETCH_USER.success>) {
  const user = action.payload
  if (user == null) {
    return
  }
  const h = getInStorage().h?.[user.id] ?? {}
  yield put(SET(h))
}

function *append(action: ActionType<typeof APPEND>) {
  const user = yield select($user)
  const venueId = action.payload
  if (user == null || venueId == null) {
    return
  }
  updateStorage(prev => ({
    ...prev,
    h: {
      ...prev.h,
      [user.id]: {
        ...(prev.h ?? {})[user.id],
        [venueId]: Date.now(),
      },
    },
  }))
}


export function *watch() {
  yield takeLatest(FETCH_USER.success, init)
  yield takeLatest(APPEND, append)
}
