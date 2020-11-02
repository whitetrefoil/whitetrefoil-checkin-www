import omit                                          from 'object.omit'
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects'
import type { ActionType }                           from 'typesafe-actions'
import { checkLogin }                                from '~/api/check-login'
import { getUserDetail }                             from '~/api/get-user.detail'
import { updateStorage }                             from '~/utils/in-storage'
import * as A                                        from './actions'
import * as $                                        from './selectors'


function *doCheckToken(action: ActionType<typeof A.LOGIN.request>) {
  try {
    const res = (yield call(checkLogin, action.payload)) as ResolvedReturn<typeof checkLogin>
    yield put(A.LOGIN.success(res))
  } catch (e: unknown) {
    yield put(A.LOGIN.failure(e))
  }
}

function *doSaveToken(token?: string) {
  if (token == null) {
    yield call(updateStorage, prev => omit(prev, 't'))
  } else {
    yield call(updateStorage, prev => ({ ...prev, t: token }))
  }
}

function *doFetchUser() {
  const token = (yield select($.$token)) as ReturnType<typeof $.$token>
  if (token == null) {
    yield put(A.FETCH_USER.failure(new Error('no token found')))
    return
  }
  try {
    const res = (yield call(getUserDetail, token)) as ResolvedReturn<typeof getUserDetail>
    yield put(A.FETCH_USER.success(res))
  } catch (e: unknown) {
    yield put(A.FETCH_USER.failure(e))
  }
}

export function *watch() {
  yield takeLatest(A.LOGIN.request, doCheckToken)
  yield takeLatest(A.FETCH_USER.request, doFetchUser)
  yield fork(function *() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const action: ActionType<typeof A.LOGIN.success|typeof A.LOGIN.failure|typeof A.FETCH_USER.failure|typeof A.AUTH_ERROR> = yield take(
        [
          A.LOGIN.success,
          A.LOGIN.failure,
          A.FETCH_USER.failure,
          A.AUTH_ERROR,
        ])
      yield fork(doSaveToken, (action.payload as ActionType<typeof A.LOGIN.success>['payload'])?.token)
    }
  })
}
