import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

export default (state, action) => state

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  while
  try {
    yield put({ type: 'USER_FETCH_SUCCEEDED' })
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED' })
  }
}

export function* mySaga() {
  yield takeLatest('hey', fetchUser)
}
