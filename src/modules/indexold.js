import { put, call, select, all, take } from 'redux-saga/effects'
import produce from 'immer'

import * as api from '../utils/api'

// Action Types
// - modal
const MODAL_CLOSED = 'MODAL_CLOSED'
const MODAL_OPENED = 'MODAL_OPENED'

// - rating
const ACTIVE_RATE_CHANGED = 'ACTIVE_RATE_CHANGED'
const ACTIVE_RATE_CHANGED_TO_RATING = 'ACTIVE_RATE_CHANGED_TO_RATING'
const RATING_CHANGED = 'RATING_CHANGED'

const RATING_CHANGED_AND_SUBMIT_REQUESTED =
  'RATING_CHANGED_AND_SUBMIT_REQUESTED'
const SUBMIT_RATING_REQUESTED = 'SUBMIT_RATING_REQUESTED'
const SUBMIT_RATING_SUCCEEDED = 'SUBMIT_RATING_SUCCEEDED'
const SUBMIT_RATING_FAILED = 'SUBMIT_RATING_FAILED'

// - initial status
const STATUS_REQUESTED = 'STATUS_REQUESTED'
const STATUS_SUCCEEDED = 'STATUS_SUCCEEDED'
const STATUS_FAILED = 'STATUS_FAILED'

// Reducer
const initialState = {
  // local
  rating: null,
  activeRate: null,
  isModalOpen: false,

  // remote
  status: {
    closedPreference: null,
    rating: null,
    loading: false,
    error: null,
  },

  submitRating: {
    loading: false,
    error: null,
    done: null,
  },
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MODAL_OPENED:
        draft.isModalOpen = true
        break
      case MODAL_CLOSED:
        draft.isModalOpen = false
        break

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
        draft.submitRating.loading = true
        break

      // ---
      case STATUS_REQUESTED:
        draft.status.loading = true
        draft.status.error = null
        break
      case STATUS_SUCCEEDED:
        draft.status.loading = false
        draft.status.closedPreference = action.closedPreference
        draft.status.rating = action.rating
        break
      case STATUS_FAILED:
        draft.status.loading = false
        draft.status.rating = null
        draft.status.error = action.error
        break

      // ---
      case SUBMIT_RATING_REQUESTED:
        draft.submitRating.loading = true
        draft.submitRating.error = null
        break
      case SUBMIT_RATING_SUCCEEDED:
        draft.submitRating.loading = false
        draft.submitRating.done = true
        draft.isModalOpen = false
        break
      case SUBMIT_RATING_FAILED:
        draft.submitRating.loading = false
        draft.submitRating.error = action.error
        draft.submitRating.done = false
        draft.isModalOpen = false
        break

      default:
        break
    }
  })

export default reducer

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

export const openModal = () => ({
  type: MODAL_OPENED,
})

export const closeModal = () => ({
  type: MODAL_CLOSED,
})

// ---
export const requestStatus = () => ({
  type: STATUS_REQUESTED,
})
export const statusSucceeded = (closedPreference, rating) => ({
  type: STATUS_SUCCEEDED,
  closedPreference,
  rating,
})
export const statusFailed = error => ({
  type: STATUS_FAILED,
  error,
})

// ---
export const requestSubmitRating = () => ({
  type: SUBMIT_RATING_REQUESTED,
})
export const submitRatingSucceeded = () => ({
  type: SUBMIT_RATING_SUCCEEDED,
})
export const submitRatingFailed = error => ({
  type: SUBMIT_RATING_FAILED,
  error,
})

// ---
// Selectors
export const getRating = state => state.rating
export const getActiveRate = state => state.activeRate
export const getIsModalOpen = state => state.isModalOpen

export const getClosedPreference = state => state.status.closedPreference
export const getHasRated = state => state.status.hasRated
export const getStatus = state => state.status.rating
export const getIsStatusLoading = state => state.status.loading
export const getStatusError = state => state.status.error

export const getIsSubmitRatingDone = state => state.submitRating.done
export const getIsSubmitRatingLoading = state => state.submitRating.loading
export const getSubmitRatingError = state => state.submitRating.error

// ---
// Sagas
export function* rootSaga() {
  yield all([
    getStatusSaga(),
    setClosedSaga(),
    submitRatingSaga(),
    setAndSubmitRatingSaga(),
  ])
}

function* getStatusSaga() {
  while (true) {
    try {
      yield take(STATUS_REQUESTED)
      const [{ closed }, { rating }] = yield all([
        call(api.getClosedPreference),
        call(api.getRating),
      ])
      console.log('Inital status saga success', [closed, rating])
      yield put(statusSucceeded(closed, rating))
      if (typeof rating !== 'number' && !closed) {
        yield put(openModal())
      }
    } catch (error) {
      console.log('Initial status saga error', error)
      yield put(statusFailed(error))
    }
  }
}

function* setClosedSaga() {
  while (true) {
    try {
      yield take(MODAL_CLOSED)
      yield call(api.setClosed)
    } catch (error) {
      console.log('Modal close saga error', error)
    }
  }
}

function* submitRatingSaga() {
  while (true) {
    try {
      yield take(SUBMIT_RATING_REQUESTED)
      const rating = yield select(getRating)
      yield call(api.setRating, rating)
      yield put(submitRatingSucceeded())
    } catch (error) {
      console.log('Submit rating saga error', error)
      yield put(submitRatingFailed(error))
    }
  }
}

function* setAndSubmitRatingSaga() {
  while (true) {
    try {
      const { rating } = yield take(RATING_CHANGED_AND_SUBMIT_REQUESTED)
      yield call(api.setRating, rating)
      yield put(submitRatingSucceeded())
    } catch (error) {
      console.log('Submit rating saga error', error)
      yield put(submitRatingFailed(error))
    }
  }
}
