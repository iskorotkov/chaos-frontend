import styled, { css } from 'styled-components'
import { theme } from '../../theme'
import React from 'react'

const Container = styled.div`
  position: relative;
  display: inline-block;
`

const CheckboxElement = styled.input.attrs(() => ({
  type: 'checkbox',
  value: '',
  checked: true,
  indeterminate: false
}))`
  visibility: hidden;
  position: absolute;

  // Center checkbox.
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ClickableBox = styled.span`
  display: block;
  width: 1.5em;
  height: 1.5em;
  border-radius: 0.25em;
  background-color: ${theme.colors.type.primary};
  color: ${theme.colors.text.light};
  position: relative;

  &:focus {
    outline: solid 0.2em ${theme.colors.type.primary}; // TODO: Move outline width to theme.
  }

  // Checkbox is disabled.
  ${props => !props.indeterminate && !props.checked && css`
    background-color: ${theme.colors.background.muted};
  `}
`

const CheckboxIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${props => props.indeterminate
          ? '~'
          : props.checked && 'v'};
`

export const Checkbox = (props: { checked?: boolean, indeterminate?: boolean }) => (
  <Container>
    <CheckboxElement/>
    <ClickableBox checked={props.checked ?? false} indeterminate={props.indeterminate ?? false}>
      <CheckboxIcon/>
    </ClickableBox>
  </Container>
)
