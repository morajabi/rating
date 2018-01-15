import { take, call } from 'redux-saga/effects'
import { CLOSED, setClosedSaga } from '../../modules/modal'
import * as api from '../../utils/api'

describe('setClosedSaga', () => {
  const gen = setClosedSaga()
  it('should wait for user to close modal', () => {
    expect(gen.next().value).toMatchObject(take(CLOSED))
  })
  it('should send closed preference to the API', () => {
    expect(gen.next().value).toMatchObject(call(api.setClosed))
  })
})

// ... and maybe test more sagas
