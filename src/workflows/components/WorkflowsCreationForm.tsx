import { Header, Main, Page, PageName } from '../../lib/components/Page'
import React from 'react'
import styled from 'styled-components'

const ActionsRow = styled.div`
  display: flex;
  margin: 0.5em 0;
`

export const WorkflowsCreationForm = () => (
  <Page>
    <Header>
      <PageName>Chaos Framework / Dashboard</PageName>
    </Header>

    <Main>
      <ActionsRow>

      </ActionsRow>
    </Main>
  </Page>
)
