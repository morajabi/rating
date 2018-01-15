import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import modal, { setClosedSaga, getClosedPrefSaga } from './modal'
import rating, { submitRatingSaga, getHasRatedSaga } from './rating'

export default combineReducers({
  modal,
  rating,
})

export function* rootSaga() {
  yield all([
    setClosedSaga(),
    getClosedPrefSaga(),
    getHasRatedSaga(),
    submitRatingSaga(),
  ])
}
