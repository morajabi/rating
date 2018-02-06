import React from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'

const TokenRefresh = () => <Button onClick={updateToken}>New Session</Button>

export default TokenRefresh

function updateToken() {
  if (window && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('token', v4())
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log('It`s not a browser environment')
  }
}

const Button = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;

  color: #555;
  background: #f2f2f2;
  border-radius: 5px;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
`
