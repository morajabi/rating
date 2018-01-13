import React, { Component } from 'react'
import styled from 'styled-components'

import { rem } from '../utils/rem'

class Modal extends Component {
  render() {
    return (
      <Wrapper>
        <TopBar>
          How likely are you to recommend <strong>Hunderd5</strong> to a friend
          or colleague?
        </TopBar>
      </Wrapper>
    )
  }
}

export default Modal

const radius = '8px'

const Wrapper = styled.div`
  width: ${rem(560)};
  height: auto;
  border-radius: ${radius};
`

const TopBar = styled.div`
  width: 100%;
  padding: 20px 0;
  background: rgb(243, 198, 210);
  border-radius: ${radius} ${radius} 0 0;
  color: rgba(0, 0, 0, 0.8);
  font-size: ${rem(16)};
  text-align: center;
`
