import { Search } from '../../lib/components/Search'
import { CreateButton } from '../../lib/components/Button'
import React from 'react'
import styled from 'styled-components'
import { Header, Main, Page, PageName } from '../../lib/components/Page'
import { WorkflowCard } from './WorkflowCard'

const ActionsRow = styled.div`
  display: flex;
  gap: 0.5em;
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
        <Search placeholder="type to search..."/>

        <CreateButton>New <i className="fas fa-plus"/></CreateButton>
      </ActionsRow>

      <Workflows>
        <li><WorkflowCard/></li>
        <li><WorkflowCard/></li>
      </Workflows>
    </Main>
  </Page>
)
