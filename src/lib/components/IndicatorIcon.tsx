import { ColorType, theme } from '../../theme'
import styled from 'styled-components'

const IndicatorIcon = (props: { type: ColorType }) => styled.div`
  width: 0.6em;
  height: 0.6em;
  background-color: ${theme.colors.type[props.type]};
  border-radius: 1em;
`

export const PrimaryIndicatorIcon = IndicatorIcon({ type: 'primary' })
export const SuccessIndicatorIcon = IndicatorIcon({ type: 'success' })
export const ChangeIndicatorIcon = IndicatorIcon({ type: 'change' })
export const DangerIndicatorIcon = IndicatorIcon({ type: 'danger' })
