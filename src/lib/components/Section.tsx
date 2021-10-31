import styled from 'styled-components'
import { theme } from '../../theme'

export const Section = styled.div`
  margin: 0 -5em;
  padding: 0 5em;

  &:not(:last-of-type) {
    border-bottom: ${theme.borders.style.separator};
  }
`
