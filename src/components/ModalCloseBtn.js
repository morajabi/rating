import React, { Component } from 'react'
import styled from 'styled-components'

import { Cross } from '../components/Svgs'

class ModalCloseBtn extends Component {
  render() {
    return (
      <Button>
        <Cross />
      </Button>
    )
  }
}

export default ModalCloseBtn

const Button = styled.button`
  padding: 7px;
  vertical-align: middle;
  line-height: 1;

  opacity: 0.8;
  border-radius: 5px;
  cursor: pointer;
  /* reset button styles */
  background: none;
  border: none;

  transition: background 150ms, opacity 150ms;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.07);
    opacity: 1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`
