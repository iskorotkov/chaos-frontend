import styled from 'styled-components'
import { theme } from '../../theme'

export const Card = styled.article`
  box-shadow: ${theme.shadows.primary};
  padding: 1em 1em 1em 1.5em;
  color: ${theme.colors.text.dark};
  border-radius: ${theme.borders.radius.primary};
  position: relative;
  margin-top: 0.5em;
`

export const CardTitle = styled.h2`
  padding: 0;
  margin: 0 0 0.5em 0;
`
