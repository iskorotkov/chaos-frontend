import styled from 'styled-components'
import { theme } from '../../theme'
import React, { FormEvent, FormEventHandler } from 'react'

const Container = styled.div`
  position: relative;
  flex: 1;
`

const iconWidth = '3.5em'

const SearchInput = styled.input`
  color: ${theme.colors.text.dark};
  box-shadow: ${theme.shadows.primary};
  border-radius: ${theme.borders.radius.primary};
  border: none;
  width: calc(100% - 3.5em);
  height: calc(1em + 0.75em); // TODO: Find out how it's calculated.
  padding-left: ${iconWidth};

  &:focus {
    outline: solid ${theme.outline.width} ${theme.colors.type.primary};
  }
`

const SearchIcon = styled.i`
  position: absolute;
  left: calc(${iconWidth} / 2);
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Search = (props: {
  value: string
  onInput: FormEventHandler<HTMLInputElement>
  placeholder?: string
}) => {
  const onInput = (e: FormEvent<HTMLInputElement>) => props.onInput(e)

  return (
    <Container>
      <SearchIcon className='fas fa-search' />
      <SearchInput
        type='text'
        value={props.value}
        placeholder={props.placeholder}
        onInput={onInput}
      />
    </Container>
  )
}
