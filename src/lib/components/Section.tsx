import styled from 'styled-components'
import { theme } from '../../theme'

export const Section = styled.div`
  margin: 0 -5em;
  padding: 0 5em;

  &:not(:last-of-type) {
    border-bottom: ${theme.borders.style.separator};
  }
`

export const SectionTitle = styled.h3`
  padding: 0;
  margin: 0.75em 0 0 0;
`
