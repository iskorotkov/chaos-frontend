import { ColorType, theme } from '../../theme'
import styled, { css } from 'styled-components'

const Button = (props: { type: ColorType, filled: boolean }) => styled.button.attrs(() => ({
  type: 'button'
}))`
  box-shadow: ${theme.shadows.primary};
  padding: 0.25em;
  margin: 0;
  width: 6em;
  border: 0.15em solid ${theme.colors.type[props.type]};
  border-radius: ${theme.borders.radius.primary};
  ${props.filled
    ? css`background-color: ${theme.colors.type[props.type]};
            color: ${theme.colors.text.light};`
    : css`background-color: transparent;
            color: ${theme.colors.type[props.type]};`
  }

  &:focus {
    outline: solid 0.2em ${theme.colors.type[props.type]}; // TODO: Move outline width to theme.
  }
`

export const CreateButton = Button({ type: 'success', filled: true })
export const ViewButton = Button({ type: 'primary', filled: true })
export const CancelButton = Button({ type: 'danger', filled: false })
export const PauseButton = Button({ type: 'change', filled: false })
export const BackButton = Button({ type: 'primary', filled: false })
export const RunButton = Button({ type: 'success', filled: true })
export const RefreshButton = Button({ type: 'primary', filled: false })
export const PreviewButton = Button({ type: 'primary', filled: false })
