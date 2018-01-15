// Note:
// Since this reducer still does small, it's in one file.
// If we planned to add more features for rating, we can
// refactor and exclude logic in several modules.

import produce from 'immer'
import { put, call, select, take } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import * as api from '../utils/api'

const RATING_CHANGED = 'h5/rate/RATING_CHANGED'
const ACTIVE_RATE_CHANGED = 'h5/rate/ACTIVE_RATE_CHANGED'
const ACTIVE_RATE_CHANGED_TO_RATING = 'h5/rate/ACTIVE_RATE_CHANGED_TO_RATING'

const RATING_CHANGED_AND_SUBMIT_REQUESTED =
  'h5/rate/RATING_CHANGED_AND_SUBMIT_REQUESTED'
const SUBMIT_REQUESTED = 'h5/rate/SUBMIT_REQUESTED'
const SUBMIT_SUCCEEDED = 'h5/rate/SUBMIT_SUCCEEDED'
const SUBMIT_FAILED = 'h5/rate/SUBMIT_FAILED'

export const HAS_RATED_REQUESTED = 'h5/rate/HAS_RATED_REQUESTED'
export const HAS_RATED_SUCCEEDED = 'h5/rate/HAS_RATED_SUCCEEDED'
export const HAS_RATED_FAILED = 'h5/rate/HAS_RATED_FAILED'

// Reducer
export const initialState = {
  rating: null,
  activeRate: null,

  submitLoading: false,
  submitError: null,

  hasRated: null,
  loading: false,
  error: null,
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RATING_CHANGED:
        draft.rating = draft.activeRate = action.rating
        break
      case ACTIVE_RATE_CHANGED:
        draft.activeRate = action.activeRate
        break
      case ACTIVE_RATE_CHANGED_TO_RATING:
        draft.activeRate = state.rating
        break

      case RATING_CHANGED_AND_SUBMIT_REQUESTED:
        draft.rating = draft.activeRate = action.rating
        draft.submitLoading = true
        break

      // Submit
      case SUBMIT_REQUESTED:
        draft.submitLoading = true
        draft.submitError = null
        break
      case SUBMIT_SUCCEEDED:
        draft.submitLoading = false
        draft.hasRated = true // so modal will be closed
        break
      case SUBMIT_FAILED:
        draft.submitLoading = false
        draft.submitError = action.error
        break

      // Has Rated
      case HAS_RATED_REQUESTED:
        draft.loading = true
        draft.error = null
        break
      case HAS_RATED_SUCCEEDED:
        draft.loading = false
        draft.hasRated = action.hasRated
        break
      case HAS_RATED_FAILED:
        draft.loading = false
        draft.hasRated = null
        draft.error = action.error
        break

      default:
        break
    }
  })

export default reducer

// ---
// Action Creators
export const setRating = rating => ({
  type: RATING_CHANGED,
  rating,
})
export const setActiveRate = activeRate => ({
  type: ACTIVE_RATE_CHANGED,
  activeRate,
})
export const setActiveRateToRating = () => ({
  type: ACTIVE_RATE_CHANGED_TO_RATING,
})
export const setRatingAndSubmit = rating => ({
  type: RATING_CHANGED_AND_SUBMIT_REQUESTED,
  rating,
})

export const requestSubmit = () => ({
  type: SUBMIT_REQUESTED,
})
export const submitSucceeded = () => ({
  type: SUBMIT_SUCCEEDED,
})
export const submitFailed = error => ({
  type: SUBMIT_FAILED,
  error,
})

export const requestHasRated = () => ({
  type: HAS_RATED_REQUESTED,
})
export const hasRatedSucceeded = hasRated => ({
  type: HAS_RATED_SUCCEEDED,
  hasRated,
})
export const hasRatedFailed = error => ({
  type: HAS_RATED_FAILED,
  error,
})

// ---
// Selectors
export const getRatingData = state => state.rating
export const getRating = createSelector(
  [getRatingData],
  rating => rating.rating,
)
export const getActiveRate = createSelector(
  [getRatingData],
  rating => rating.activeRate,
)

export const getIsSubmitLoading = createSelector(
  [getRatingData],
  rating => rating.submitLoading,
)
export const getSubmitError = createSelector(
  [getRatingData],
  rating => rating.submitError,
)

export const getHasRated = createSelector(
  [getRatingData],
  rating => rating.hasRated,
)
export const getIsHasRatedLoading = createSelector(
  [getRatingData],
  rating => rating.loading,
)
export const getHasRatedError = createSelector(
  [getRatingData],
  rating => rating.error,
)

// ---
// Sagas
export function* submitRatingSaga() {
  while (true) {
    try {
      const { rating: ratingFromAction } = yield take([
        SUBMIT_REQUESTED,
        RATING_CHANGED_AND_SUBMIT_REQUESTED,
      ])

      // Fill rating with latest data based on which action got fired
      let rating
      if (typeof ratingFromAction === 'number') {
        rating = ratingFromAction
      } else {
        rating = yield select(getRating)
      }

      yield call(api.setRating, rating)
      yield put(submitSucceeded())
    } catch (error) {
      console.log('modal/submitRating saga error', error)
      yield put(submitFailed(error))
    }
  }
}

export function* getHasRatedSaga() {
  while (true) {
    try {
      yield take(HAS_RATED_REQUESTED)
      const { rating } = yield call(api.getRating)
      const hasRated = typeof rating === 'number'
      yield put(hasRatedSucceeded(hasRated))
    } catch (error) {
      console.log('modal/getHasRated saga error', error)
      yield put(hasRatedFailed(error))
    }
  }
}
