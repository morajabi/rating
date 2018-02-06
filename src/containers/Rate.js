import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  setRating,
  setActiveRate,
  setActiveRateToRating,
  setRatingAndSubmit,
  getRating,
  getActiveRate,
  requestSubmit,
} from '../modules/rating'
import StarRadio from '../components/StarRadio'

class Rate extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
  }

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
    const { rating, activeRate, disabled } = this.props

    return (
      <Wrapper onSubmit={this.submitted} disabled={disabled}>
        <div
          role="radiogroup"
          aria-describedby="rate-modal-question"
          aria-label="Rate us from 0 to 10"
        >
          {this.numbers.map(num => (
            <StarRadio
              key={num}
              name="rate"
              id={`rate-radio-${num}`}
              number={num}
              disabled={disabled}
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

    this.props.requestSubmit()
    console.log('Rate form submit triggered!')

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
    requestSubmit,
  },
)(Rate)

const Wrapper = styled.form`
  ${p =>
    p.disabled &&
    css`
      opacity: 0.4;
    `};
`
const SubmitButton = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
`
