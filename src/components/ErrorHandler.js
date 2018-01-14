import React, { Component } from 'react'

import { Message } from './Messages'

class ErrorHandler extends Component {
  state = {
    hasError: false,
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    console.log('Error caught:', error, info)
  }

  render() {
    return this.state.hasError ? (
      <Message>
        Something went wront{' '}
        <span role="img" aria-label="crying face">
          ☹️
        </span>
      </Message>
    ) : (
      this.props.children
    )
  }
}

export default ErrorHandler
