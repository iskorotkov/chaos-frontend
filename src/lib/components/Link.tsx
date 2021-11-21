import { ColorType, theme } from '../../theme'
import styled, { css } from 'styled-components'

const Link = (props: { type: ColorType, filled: boolean }) => styled.a`
  box-shadow: ${theme.shadows.primary};
  padding: 0.25em;
  width: 6em;
  margin: 0;
  border: 0.15em solid ${theme.colors.type[props.type]};
  border-radius: ${theme.borders.radius.primary};
  display: block;
  text-align: center;
  text-decoration: none;

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

export const CreateLink = Link({ type: 'success', filled: true })
export const ViewLink = Link({ type: 'primary', filled: true })
export const CancelLink = Link({ type: 'danger', filled: false })
export const PauseLink = Link({ type: 'change', filled: false })
export const BackLink = Link({ type: 'primary', filled: false })
export const RunLink = Link({ type: 'success', filled: true })
export const RefreshLink = Link({ type: 'primary', filled: false })
export const PreviewLink = Link({ type: 'primary', filled: false })
