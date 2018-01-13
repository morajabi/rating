import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
import ErrorHandler from '../components/ErrorHandler'
import App from '../components/App'

// Create redux store
const store = configureStore()

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ErrorHandler>
          <App />
        </ErrorHandler>
      </Provider>
    )
  }
}

export default Root
