import React, { Component } from 'react'
import styled from 'styled-components'

import { rem } from '../utils/rem'

class Modal extends Component {
  render() {
    return (
      <Overlay>
        <Wrapper>
          <TopBar>
            How likely are you to recommend <strong>Hunderd5</strong> to a
            friend or colleague?
          </TopBar>
          <Content />
        </Wrapper>
      </Overlay>
    )
  }
}

export default Modal

const radius = '8px'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.03);
`

const Wrapper = styled.div`
  width: ${rem(560)};
  height: auto;

  overflow: hidden;
  border-radius: ${radius};
  background: #fff;
`

const TopBar = styled.div`
  width: 100%;
  padding: 20px 0;
  text-align: center;

  border-radius: ${radius} ${radius} 0 0;
  background: rgb(243, 198, 210);
  color: rgba(0, 0, 0, 0.8);
`

const Content = styled.div`
  width: 100%;
  padding: 30px 0;
  text-align: center;
`
