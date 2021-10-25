import { StyledSearch } from '../../lib/components/Search'
import { CreateButton } from '../../lib/components/Button'
import React from 'react'
import styled from 'styled-components'
import { Header, Main, Page, PageName } from '../../lib/components/Page'
import { WorkflowCard } from './WorkflowCard'

const ActionsRow = styled.div`
  display: flex;
  margin: 0.5em 0;
`

const Workflows = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const WorkflowsDashboard = () => (
  <Page>
    <Header>
      <PageName>Chaos Framework / Dashboard</PageName>
    </Header>

    <Main>
      <ActionsRow>
        <StyledSearch type="text" placeholder="type to search..."/>

        <CreateButton>New {/* TODO: Add arrow icon. */ '+'}</CreateButton>
      </ActionsRow>

      <Workflows>
        <li><WorkflowCard/></li>
        <li><WorkflowCard/></li>
      </Workflows>
    </Main>
  </Page>
)
