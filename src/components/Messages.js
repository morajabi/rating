/* eslint-disable */
import React from 'react'
import styled from 'styled-components'

import { rem } from '../utils/rem'

export const Message = styled.span`
  width: 100%;
  padding: 100px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: ${rem(40)};
  font-weight: bold;
  color: #888;
  opacity: 0.8;
`

const WhatsUp = () => <Message>👋 What's up Change?</Message>
const HowAreYou = () => <Message>How are you? 🙂</Message>
const Thanks = () => <Message>Thanks for your time! 🙏✨</Message>
const Love = () => <Message>I ❤️ Change</Message>

export const Loading = () => <Message>👀 Loading ...</Message>
export const Error = () => (
  <Message>😿 Network error! You may check the console & network tab.</Message>
)
export const RandomMessage = () => {
  const messages = [WhatsUp, HowAreYou, Thanks, Love]
  const randomInt = Math.floor(Math.random() * (3 - 0 + 1)) + 0
  const Msg = messages[randomInt]

  return <Msg />
}
