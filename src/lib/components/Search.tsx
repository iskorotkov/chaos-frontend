import styled from 'styled-components'
import { theme } from '../../theme'
import React from 'react'

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
    outline: solid 0.2em ${theme.colors.type.primary}; // TODO: Move outline width to theme.
  }
`

const SearchIcon = styled.i`
  position: absolute;
  left: calc(${iconWidth} / 2);
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Search = (props: { placeholder?: string }) => (
  <Container>
    <SearchIcon className="fas fa-search"/>
    <SearchInput type="text" placeholder={props.placeholder}/>
  </Container>
)