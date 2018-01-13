import React, { Component } from 'react'

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
      <h1 style={{ padding: 20 }}>
        Something went wront{' '}
        <span role="img" aria-label="crying face">
          ☹️
        </span>
      </h1>
    ) : (
      this.props.children
    )
  }
}

export default ErrorHandler
