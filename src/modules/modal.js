import produce from 'immer'
import { put, call, take } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import * as api from '../utils/api'
import { getHasRated, getHasRatedError, getIsHasRatedLoading } from './rating'

const CLOSED_PREF_REQUESTED = 'rating/modal/CLOSED_PREF_REQUESTED'
const CLOSED_PREF_SUCCEEDED = 'rating/modal/CLOSED_PREF_SUCCEEDED'
const CLOSED_PREF_FAILED = 'rating/modal/CLOSED_PREF_FAILED'
export const CLOSED = 'rating/modal/CLOSED'

// Reducer
const initialState = {
  closedPreference: null,
  loading: false,
  error: null,
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CLOSED_PREF_REQUESTED:
        draft.loading = true
        draft.error = null
        break
      case CLOSED_PREF_SUCCEEDED:
        draft.loading = false
        draft.closedPreference = action.closedPreference
        break
      case CLOSED_PREF_FAILED:
        draft.loading = false
        draft.closedPreference = null
        draft.error = action.error
        break

      case CLOSED:
        draft.closedPreference = true
        break

      default:
        break
    }
  })

export default reducer

// Action Creators
export const requestClosedPref = () => ({
  type: CLOSED_PREF_REQUESTED,
})
export const closedPrefSucceeded = closedPreference => ({
  type: CLOSED_PREF_SUCCEEDED,
  closedPreference,
})
export const closedPrefFailed = error => ({
  type: CLOSED_PREF_FAILED,
  error,
})

export const closeModal = () => ({
  type: CLOSED,
})

// ---
// Selectors
// This might be overkill for a simple app, but for optimising in scale, it'd help a lot
export const getModal = state => state.modal
export const getClosedPref = createSelector(
  [getModal],
  modal => modal.closedPreference,
)
export const getIsClosedPrefLoading = createSelector(
  [getModal],
  modal => modal.loading,
)
export const getClosedPrefError = createSelector(
  [getModal],
  modal => modal.error,
)

export const getIsModalOpen = createSelector(
  [getClosedPref, getHasRated],
  (closedPref, hasRated) => closedPref === false && hasRated === false,
)
export const getIsModalLoading = createSelector(
  [getIsClosedPrefLoading, getIsHasRatedLoading],
  (closedPrefLoading, hasRatedLoading) => closedPrefLoading || hasRatedLoading,
)
export const getHasModalError = createSelector(
  [getClosedPrefError, getHasRatedError],
  (closedPrefError, hasRatedError) => closedPrefError || hasRatedError,
)

// ---
// Sagas
export function* setClosedSaga() {
  while (true) {
    try {
      yield take(CLOSED)
      yield call(api.setClosed)
    } catch (error) {
      console.log('modal/setClosed saga error', error)
      // We might want to do sth with this error (with the help of UX Designer)
      // for a better user experience, so we don't show modal over and over
      // again to a user
    }
  }
}

export function* getClosedPrefSaga() {
  while (true) {
    try {
      yield take(CLOSED_PREF_REQUESTED)
      const { closed } = yield call(api.getClosedPreference)
      yield put(closedPrefSucceeded(closed))
    } catch (error) {
      console.log('modal/getClosedPref saga error', error)
      yield put(closedPrefFailed(error))
    }
  }
}
