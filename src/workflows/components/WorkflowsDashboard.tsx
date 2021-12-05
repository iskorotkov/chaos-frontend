import { Search } from '../../lib/components/Search'
import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Header, Main, Page, PageName } from '../../lib/components/Page'
import axios from 'axios'
import { WORKFLOWS_URL } from '../../config'
import { WorkflowCard } from './WorkflowCard'
import { CreateLink } from '../../lib/components/Link'
import { Workflow } from '../types/workflows'

const ActionsRow = styled.div`
  display: flex;
  gap: 0.5em;
`

const Workflows = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const matchWorkflow = (workflow: Workflow, re: RegExp) => {
  return re.test(workflow.namespace) ||
    re.test(workflow.name) ||
    re.test(workflow.status) ||
    re.test(workflow.startedAt.toLocaleString()) ||
    (workflow.finishedAt && re.test(workflow.finishedAt.toLocaleString()))
}

export const WorkflowsDashboard = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios(`${WORKFLOWS_URL}/api/v1/workflows`)
      .then(res => res.data as Workflow[])
      .then(setWorkflows)
      .catch(console.error)
  }, [])

  const onSearchInput = (e: FormEvent<HTMLInputElement>) => setQuery((e.target as HTMLInputElement).value)

  return (
    <Page>
      <Header>
        <PageName>Chaos Framework / Dashboard</PageName>
      </Header>

      <Main>
        <ActionsRow>
          <Search value={query} placeholder="type to search..." onInput={onSearchInput}/>

          <CreateLink href="/create">New <i className="fas fa-plus"/></CreateLink>
        </ActionsRow>

        <Workflows>
          {workflows
            .filter(w => matchWorkflow(w, new RegExp(query, 'ig')))
            .map(w => (
              <li key={`${w.namespace}/${w.name}`}><WorkflowCard workflow={w}/></li>
            ))}
        </Workflows>
      </Main>
    </Page>
  )
}
