import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { rem } from '../utils/rem'
import { StarDefault, StarActive } from '../components/Svgs'

class StarRadio extends Component {
  constructor(p) {
    super(p)
    this.inputRef = null
  }

  render() {
    const {
      name,
      number,
      checked,
      active,
      id,
      onInputChange = () => {},
      onClick = () => {},
      onMouseEnter = () => {},
      onMouseLeave = () => {},
    } = this.props

    return (
      <Wrapper>
        <RadioInput
          id={id}
          type="radio"
          name={name}
          value={number}
          checked={checked}
          aria-checked={String(checked)}
          innerRef={c => {
            this.inputRef = c
          }}
          onChange={onInputChange}
        />
        <Label
          for={id}
          onClick={() => onClick(number, this.inputRef)}
          onMouseEnter={() => onMouseEnter(number)}
          onMouseLeave={() => onMouseLeave(number)}
        >
          <Icon>{active ? <StarActive /> : <StarDefault />}</Icon>
          <NumberText>{number}</NumberText>
        </Label>
      </Wrapper>
    )
  }
}

export default StarRadio

StarRadio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
}

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`

const Label = styled.label`
  display: inline-block;
  padding: 0 5px;
  cursor: pointer;

  &:focus {
    background: blue;
  }
`

const Icon = styled.span`
  display: block;
`

const NumberText = styled.span`
  display: block;
  margin-top: 9px;
  font-size: ${rem(12)};
  color: #999;
`

const RadioInput = styled.input`
  position: absolute;
  appearance: none;
  opacity: 0;

  &:focus + ${Label} {
    border-radius: 5px;
    box-shadow: 0 0 0 2px lightBlue;
  }
`
