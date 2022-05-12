import styled, { css } from 'styled-components'
import { theme } from '../../theme'
import React from 'react'

const Container = styled.div`
  position: relative;
  display: inline-block;
`

const ClickableBox = styled.button<{
  indeterminate: boolean
  checked: boolean
}>`
  display: block;
  width: 1.5em;
  height: 1.5em;
  border-radius: 0.25em;
  background-color: ${theme.colors.type.primary};
  color: ${theme.colors.text.light};
  border: none;
  padding: 0;
  margin: 0;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);

  &:focus {
    outline: solid ${theme.outline.width} ${theme.colors.type.primary};
    outline-offset: 0;
  }

  // Checkbox is disabled.
  ${(props) =>
    !props.indeterminate &&
    !props.checked &&
    css`
      background-color: ${theme.colors.background.muted};
    `}
`

const CheckboxIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

// TODO: Add outline to native checkbox.
export const Checkbox = (props: {
  checked?: boolean
  indeterminate?: boolean
  readOnly?: boolean
  // eslint-disable-next-line no-unused-vars
  onToggled?: (value: boolean) => void
}) => {
  const onClick = () => props.onToggled?.call(null, !props.checked)

  return (
    <Container>
      <ClickableBox
        type='button'
        disabled={props.readOnly ?? false}
        checked={props.checked ?? false}
        indeterminate={props.indeterminate ?? false}
        onClick={onClick}
      >
        <CheckboxIcon
          className={
            props.indeterminate
              ? 'fas fa-minus'
              : props.checked
              ? 'fas fa-check'
              : ''
          }
        />
      </ClickableBox>
    </Container>
  )
}
