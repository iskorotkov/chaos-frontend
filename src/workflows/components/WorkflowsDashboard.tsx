import { Search } from '../../lib/components/Search'
import { CreateButton } from '../../lib/components/Button'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Header, Main, Page, PageName } from '../../lib/components/Page'
import axios from 'axios'
import { backendAddress } from '../../config'
import { WorkflowCard } from './WorkflowCard'
import { WorkflowStatus } from '../types/workflows'

const ActionsRow = styled.div`
  display: flex;
  gap: 0.5em;
`

const Workflows = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const WorkflowsDashboard = () => {
  const [workflows, setWorkflows] = useState<WorkflowStatus[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios(`${backendAddress()}/api/v1/workflows`)
      .then(res => res.data as WorkflowStatus[])
      .then(workflows => workflows.map(w => {
        return {
          createdAt: new Date(w.startedAt),
          finishedAt: new Date(w.finishedAt),
          ...w
        }
      }))
      .then(workflows => setWorkflows(workflows))
      .catch(err => console.error(err))
  }, [])

  const onSearchInput = (e: InputEvent) => setQuery(e.target.value)

  const re = new RegExp(query, 'ig')
  const matchWorkflow = w => {
    return re.test(w.namespace) ||
      re.test(w.name) ||
      re.test(w.startedAt.toLocaleString()) ||
      (w.finishedAt && re.test(w.finishedAt.toLocaleString()))
  }

  const workflowsCards = workflows
    .filter(matchWorkflow)
    .map(w =>
      <li key={`${w.namespace}-${w.name}`}><WorkflowCard workflow={w}/></li>)

  return (
    <Page>
      <Header>
        <PageName>Chaos Framework / Dashboard</PageName>
      </Header>

      <Main>
        <ActionsRow>
          <Search value={query} placeholder="type to search..." onInput={onSearchInput}/>

          <CreateButton>New <i className="fas fa-plus"/></CreateButton>
        </ActionsRow>

        <Workflows>
          {workflowsCards}
        </Workflows>
      </Main>
    </Page>
  )
}
