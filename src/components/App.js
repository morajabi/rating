import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { closeModal, getIsModalOpen, getIsStatusLoading } from '../modules'
import Modal from './Modal'
import { Loading, RandomMessage } from './Messages'

class App extends Component {
  render() {
    const { isModalOpen, isStatusLoading } = this.props

    return (
      <Fragment>
        {isStatusLoading ? <Loading /> : <RandomMessage />}
        {isModalOpen && <Modal onClose={this.modalClosed} />}
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
  }),
  {
    closeModal,
  },
)(App)
