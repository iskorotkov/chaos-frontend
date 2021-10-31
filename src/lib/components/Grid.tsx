import styled from 'styled-components'
import { CompactCard } from './Card'
import { CompactFormField, CompactFormLabel } from './Form'
import { Checkbox } from './Checkbox'
import React from 'react'

export const Grid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1em 0 1em 2em;
  gap: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  grid-auto-rows: 1fr;
  place-items: stretch;
`

const GridItemWrapper = styled.li`
  display: flex;
`

const CheckboxCard = styled(CompactCard)`
  justify-self: stretch;
  align-self: stretch;
  flex: 1;
`

export const GridCard = (props: { checked: boolean, title: string }) => (
  <GridItemWrapper>
    <CheckboxCard>
      <CompactFormField>
        <Checkbox checked={props.checked}/>
        <CompactFormLabel>{props.title}</CompactFormLabel>
      </CompactFormField>
    </CheckboxCard>
  </GridItemWrapper>
)
