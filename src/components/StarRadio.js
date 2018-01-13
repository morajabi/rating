import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { rem } from '../utils/rem'
import { StarDefault, StarActive } from '../components/Svgs'

const StarRadio = ({ number, checked, id }) => (
  <Wrapper id={id} role="checkbox" aria-checked={String(checked)}>
    <Label>
      <Icon>
        <StarActive />
      </Icon>
      <NumberText>{number}</NumberText>
    </Label>
  </Wrapper>
)

export default StarRadio

StarRadio.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
}

const Wrapper = styled.span`
  display: inline-block;
`

const Label = styled.label`
  display: inline-block;
  padding: 0 5px;
  cursor: pointer;
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
