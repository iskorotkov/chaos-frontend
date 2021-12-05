import styled from 'styled-components'
import { theme } from '../../theme'

export const Card = styled.article`
  box-shadow: ${theme.shadows.primary};
  padding: 1em 1em 1em 1.5em;
  color: ${theme.colors.text.dark};
  border-radius: ${theme.borders.radius.primary};
  position: relative;
  margin: 0.5em 0;
  overflow: hidden;
`

export const CompactCard = styled(Card)`
  padding: 0.5em 1em;
  margin: 0;
  display: flex;
  align-items: center;
`

export const CardTitle = styled.h2`
  padding: 0;
  margin: 0 0 0.5em 0;
`
