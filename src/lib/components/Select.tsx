import styled from 'styled-components'
import { theme } from '../../theme'

export const Select = styled.select`
  padding: calc(0.25em + 0.15em) 0.75em; // TODO: Link Select padding to Button padding + border.
  color: ${theme.colors.text.dark};
  box-shadow: ${theme.shadows.primary};
  border-radius: ${theme.borders.radius.primary};
  border: none;
  outline: none;

  &:focus {
    outline: solid ${theme.outline.width} ${theme.colors.type.primary};
  }
`

export const SelectExpanded = styled(Select)`
  flex: 1;
`
