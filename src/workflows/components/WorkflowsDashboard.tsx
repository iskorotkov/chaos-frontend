import { Search } from '../../lib/components/Search'
import { CreateButton } from '../../lib/components/Button'
import React, { FormEvent, useEffect, useState } from 'react'
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

const matchWorkflow = (workflow: WorkflowStatus, re: RegExp) => {
  return re.test(workflow.namespace) ||
    re.test(workflow.name) ||
    re.test(workflow.status) ||
    re.test(workflow.startedAt.toLocaleString()) ||
    (workflow.finishedAt && re.test(workflow.finishedAt.toLocaleString()))
}

export const WorkflowsDashboard = () => {
  const [workflows, setWorkflows] = useState<WorkflowStatus[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios(`${backendAddress()}/api/v1/workflows`)
      .then(res => res.data as WorkflowStatus[])
      .then(workflows => workflows.map(w => {
        return {
          ...w,
          createdAt: new Date(w.startedAt),
          finishedAt: new Date(w.finishedAt)
        }
      }))
      .then(setWorkflows)
      .catch(console.error)
  }, [])

  const onSearchInput = (e: FormEvent<HTMLInputElement>) => setQuery((e.target as HTMLInputElement).value)

  const workflowsCards = workflows
    .filter(w => matchWorkflow(w, new RegExp(query, 'ig')))
    .map(w => (
      <li key={`${w.namespace}-${w.name}`}><WorkflowCard workflow={w} /></li>
    ))

  return (
    <Page>
      <Header>
        <PageName>Chaos Framework / Dashboard</PageName>
      </Header>

      <Main>
        <ActionsRow>
          <Search value={query} placeholder="type to search..." onInput={onSearchInput} />

          <CreateButton>New <i className="fas fa-plus" /></CreateButton>
        </ActionsRow>

        <Workflows>
          {workflowsCards}
        </Workflows>
      </Main>
    </Page>
  )
}
