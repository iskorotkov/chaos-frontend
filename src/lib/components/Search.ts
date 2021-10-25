import styled from 'styled-components'
import { theme } from '../../theme'

export const StyledSearch = styled.input`
  flex: 1;
  margin-right: 0.5em;
  box-shadow: ${theme.shadows.primary};
  border-radius: ${theme.borders.radius.primary};
  border: none;
  // TODO: Use real search image.
  background-image: url('logo192.png');
  background-position: 1em 0.3em;
  background-size: 1.5em;
  background-repeat: no-repeat;
  object-fit: contain;
  padding-left: 3.5em;
  outline: none;
`
