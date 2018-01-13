import { injectGlobal } from 'styled-components'

import { BASE_FONT_SIZE } from './utils/rem'

injectGlobal`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-size: ${BASE_FONT_SIZE}px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
`
