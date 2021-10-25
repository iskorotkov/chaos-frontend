import { ColorType, theme } from '../../theme'
import styled, { css } from 'styled-components'

const Button = (props: { type: ColorType, filled: boolean }) => styled.button`
  box-shadow: ${theme.shadows.primary};
  padding: 0.25em;
  width: 6em;
  border: 0.15em solid ${theme.colors.type[props.type]};
  border-radius: ${theme.borders.radius.primary};
  ${
          props.filled
                  ? css`
                    background-color: ${theme.colors.type[props.type]};
                    color: ${theme.colors.text.light};
                  `
                  : css`
                    background-color: transparent;
                    color: ${theme.colors.type[props.type]};
                  `
  }
`

export const CreateButton = Button({ type: 'success', filled: true })
export const ViewButton = Button({ type: 'primary', filled: true })
export const CancelButton = Button({ type: 'danger', filled: false })
export const PauseButton = Button({ type: 'change', filled: false })
