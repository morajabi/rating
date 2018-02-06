import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Modal from '../components/Modal'
import TokenRefresh from '../components/TokenRefresh'
import { Loading, Error, RandomMessage } from '../components/Messages'
import { requestHasRated, getIsSubmitLoading } from '../modules/rating'
import {
  requestClosedPref,
  closeModal,
  getIsModalOpen,
  getHasModalError,
  getIsModalLoading,
} from '../modules/modal'

class App extends Component {
  componentDidMount() {
    this.props.requestHasRated()
    this.props.requestClosedPref()
  }

  render() {
    const {
      isModalOpen,
      isModalLoading,
      modalError,
      isSubmitLoading,
    } = this.props

    return (
      <Fragment>
        {/* Loading, error or some random messages */}
        {isModalLoading ? (
          <Loading />
        ) : modalError ? (
          <Error />
        ) : (
          <RandomMessage />
        )}

        {/* Modal */}
        {isModalOpen && (
          <Modal onClose={this.modalClosed} ratingDisabled={isSubmitLoading} />
        )}

        <TokenRefresh />
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
    isModalLoading: getIsModalLoading(state),
    modalError: getHasModalError(state),
    isSubmitLoading: getIsSubmitLoading(state),
  }),
  {
    closeModal,
    requestHasRated,
    requestClosedPref,
  },
)(App)
