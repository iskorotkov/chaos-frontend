import styled from 'styled-components'
import { theme } from '../../theme'

export const FormField = styled.div`
  display: flex;
  position: relative;
  margin: 0.75em 0 0 0;
  flex-flow: row nowrap;
  gap: 0.5em;
  justify-items: start;
  align-items: stretch;
`

export const FormLabel = styled.label`
  padding: calc(0.25em + 0.15em) 0; // TODO: Link FormLabel padding to Button padding + border.
  display: block;
`

export const FormLabelFixed = styled(FormLabel)`
  width: 10em;
`

export const FormLabelMuted = styled(FormLabel)`
  color: ${theme.colors.text.muted};
`

export const FormVerticalBlock = styled.div`
  flex: 1 1;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.25em;
  align-items: stretch;
  text-align: center;
`
