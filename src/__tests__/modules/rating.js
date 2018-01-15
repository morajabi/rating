import SagaTester from 'redux-saga-tester'
import {
  HAS_RATED_SUCCEEDED,
  requestHasRated,
  hasRatedSucceeded,
  getHasRatedSaga,
  initialState,
} from '../../modules/rating'
jest.mock('../../utils/api')

describe('getHasRated', () => {
  let sagaTester

  beforeEach(() => {
    sagaTester = new SagaTester({ initialState })
    sagaTester.start(getHasRatedSaga)
  })

  it('should not fail on 404 error and return hasRated `false`', async () => {
    expect.assertions(1)
    sagaTester.dispatch(requestHasRated())
    await sagaTester.waitFor(HAS_RATED_SUCCEEDED)

    expect(sagaTester.getLatestCalledAction()).toMatchObject(
      hasRatedSucceeded(false),
    )
  })
})

// ... test more sagas
