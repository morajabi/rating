/* eslint-disable */
import React from 'react'
import styled from 'styled-components'

import { rem } from '../utils/rem'

const Wrapper = styled.span`
  width: 100%;
  padding: 100px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${rem(40)};
  font-weight: bold;
  color: #888;
  opacity: 0.8;
`

const WhatsUp = () => <Wrapper>👋 What's up Michal?</Wrapper>
const HowAreYou = () => <Wrapper>How are you Michal? 🙂</Wrapper>
const Thanks = () => <Wrapper>Thanks for your time Michal! 🙏✨</Wrapper>
const Love = () => <Wrapper>I ❤️ H5 and you</Wrapper>

export const Loading = () => <Wrapper>👀 Loading ...</Wrapper>
export const Error = () => (
  <Wrapper>😿 Network error! You may check the console & network tab.</Wrapper>
)
export const RandomMessage = () => {
  const messages = [WhatsUp, HowAreYou, Thanks, Love]
  const randomInt = Math.floor(Math.random() * (3 - 0 + 1)) + 0
  const Msg = messages[randomInt]

  return <Msg />
}
