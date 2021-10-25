import styled from 'styled-components'
import { theme } from '../../theme'

export const StyledCard = styled.article`
  box-shadow: ${theme.shadows.primary};
  padding: 1em 1em 1em 1.5em;
  color: ${theme.colors.text.dark};
  border-radius: ${theme.borders.radius.primary};
  position: relative;
  margin-top: 0.5em;
`
