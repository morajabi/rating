import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  closeModal,
  requestStatus,
  getIsSubmitRatingLoading,
  getIsModalOpen,
  getIsStatusLoading,
  getStatusError,
} from '../modules'
import Modal from './Modal'
import { Loading, Error, RandomMessage } from './Messages'

class App extends Component {
  componentDidMount() {
    this.props.requestStatus()
  }

  render() {
    const {
      isModalOpen,
      isStatusLoading,
      statusError,
      isSubmitRatingLoading,
    } = this.props

    return (
      <Fragment>
        {isStatusLoading ? (
          <Loading />
        ) : statusError ? (
          <Error />
        ) : (
          <RandomMessage />
        )}

        {isModalOpen && (
          <Modal
            onClose={this.modalClosed}
            ratingDisabled={isSubmitRatingLoading}
          />
        )}
      </Fragment>
    )
  }

  modalClosed = () => {
    this.props.closeModal()
  }
}

export default connect(
  state => ({
    isModalOpen: getIsModalOpen(state),
    isStatusLoading: getIsStatusLoading(state),
    statusError: getStatusError(state),
    isSubmitRatingLoading: getIsSubmitRatingLoading(state),
  }),
  {
    closeModal,
    requestStatus,
  },
)(App)
