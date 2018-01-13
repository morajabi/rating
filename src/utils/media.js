import { css } from 'styled-components'

import { rem } from './rem'

export const mobile = inner => css`
  @media (max-width: ${rem(900)}px) {
    ${inner};
  }
`
