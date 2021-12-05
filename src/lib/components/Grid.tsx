import styled from 'styled-components'
import { CompactCard } from './Card'
import React from 'react'

export const Grid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1em 0 1em 2em;
  gap: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  grid-auto-rows: 1fr;
  place-items: stretch;
`

const GridItem = styled.li`
  display: flex;
`

const CardWrapper = styled(CompactCard)`
  justify-self: stretch;
  align-self: stretch;
  flex: 1;
`

export const GridCard = (props: { children: React.ReactNode }) => (
  <GridItem>
    <CardWrapper>
      {props.children}
    </CardWrapper>
  </GridItem>
)
