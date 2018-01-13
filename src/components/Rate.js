import React, { Component } from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'

import StarRadio from './StarRadio'

class Rate extends Component {
  renderRadios() {
    let radios = []
    for (let i = 1; i <= 10; i++) {
      radios.push(<StarRadio id={v4()} number={i} checked={false} />)
    }
    return radios
  }

  render() {
    return <Wrapper>{this.renderRadios()}</Wrapper>
  }
}

export default Rate

const Wrapper = styled.div``
