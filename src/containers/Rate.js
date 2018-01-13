import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  setRating,
  setActiveRate,
  setActiveRateToRating,
  setRatingAndSubmit,
  getRating,
  getActiveRate,
} from '../modules'
import StarRadio from '../components/StarRadio'

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
    for (let i = 0; i <= 10; i++) {
      numbers.push(i)
    }
    return numbers
  }

  render() {
    const { rating, activeRate } = this.props

    return (
      <Wrapper onSubmit={this.submitted}>
        <div role="radiogroup">
          {this.numbers.map(num => (
            <StarRadio
              key={num}
              name="rate"
              id={`rate-radio-${num}`}
              number={num}
              checked={rating === num}
              active={activeRate !== null && activeRate >= num}
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
    this.props.setRating(num)
  }

  onRadioClick = (num, inputRef) => {
    this.props.setRatingAndSubmit(num)
    if (inputRef) {
      inputRef.focus()
    }
  }

  onRadioMouseEnter = num => {
    this.props.setActiveRate(num)
  }

  onRadioMouseLeave = () => {
    // Reset active to the current selected rating
    this.props.setActiveRateToRating()
  }

  onRadioInputChange = e => {
    // This event is triggered from radio input (with keyboard or screenreader)
    this.props.setRating(Number(e.target.value))
  }

  submitted = e => {
    if (e) {
      e.preventDefault()
    }

    console.log('Form Submitted!')

    return false
  }
}

export default connect(
  state => ({
    rating: getRating(state),
    activeRate: getActiveRate(state),
  }),
  {
    setRating,
    setActiveRate,
    setActiveRateToRating,
    setRatingAndSubmit,
  },
)(Rate)

const Wrapper = styled.form``
const SubmitButton = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
`
