import React, { Component } from 'react'
import styled from 'styled-components'

import StarRadio from './StarRadio'

class Rate extends Component {
  constructor(p) {
    super(p)
    this.numbers = this.generateNumbersArray()
    this.state = {
      // Check the middle star as default
      checked: 5,
      active: 5,
    }
  }

  generateNumbersArray() {
    let numbers = []
    for (let i = 1; i <= 10; i++) {
      numbers.push(i)
    }
    return numbers
  }

  render() {
    return (
      <Wrapper onSubmit={this.submitted}>
        <div role="radiogroup">
          {this.numbers.map(num => (
            <StarRadio
              name="rate"
              id={`rate-radio-${num}`}
              number={num}
              checked={this.state.checked === num}
              active={this.state.active && this.state.active >= num}
              onClick={this.onRadioClick}
              onMouseEnter={this.onRadioMouseEnter}
              onMouseLeave={this.onRadioMouseLeave}
              onInputChange={this.onRadioInputChange}
            />
          ))}
        </div>
        <SubmitButton type="submit" aria-hidden="true" tabIndex="-1" />
      </Wrapper>
    )
  }

  setCheckedAndActive = num => {
    this.setState({ checked: num, active: num })
  }

  onRadioClick = (num, inputRef) => {
    this.setCheckedAndActive(num)
    if (inputRef) {
      inputRef.focus()
    }
    // Submit form
    this.submitted()
  }

  onRadioMouseEnter = num => {
    this.setState({ active: num })
  }

  onRadioMouseLeave = () => {
    this.setState(prev => ({ active: prev.checked }))
  }

  onRadioInputChange = e => {
    // This event is triggered from radio input (wit keyboard or screenreader)
    this.setCheckedAndActive(Number(e.target.value))
  }

  submitted = e => {
    if (e) {
      e.preventDefault()
    }

    console.log('Form Submitted!')

    return false
  }
}

export default Rate

const Wrapper = styled.form``
const SubmitButton = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
`
