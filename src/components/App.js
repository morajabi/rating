import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Modal from './Modal'

class App extends Component {
  render() {
    this.props.dispatch({ type: 'hey' })

    return (
      <Fragment>
        <Modal />
      </Fragment>
    )
  }
}

export default connect(state => ({
  hey: 'asd',
}))(App)
