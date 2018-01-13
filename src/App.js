import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: green;
`

class App extends Component {
  render() {
    return (
      <Wrapper>
        <h1>Welcome to React</h1>
      </Wrapper>
    )
  }
}

export default App
