import { Card, CardTitle } from '../../lib/components/Card'
import { Indicator, StatusIndicatorIcon } from '../../lib/components/Indicator'
import { CancelButton, PauseButton } from '../../lib/components/Button'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../theme'
import moment from 'moment'
import { ViewLink } from '../../lib/components/Link'
import { Workflow } from '../types/workflows'

const WorkflowProperties = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const WorkflowProperty = styled.li`
`

const WorkflowActions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row nowrap;
  gap: 0.75em;
  justify-content: end;
  align-content: end;
`

const DatetimeSpan = styled.span``

const ElapsedSpan = styled.span`
  color: ${theme.colors.text.muted};
`

const formatTime = (datetime: string) => {
  const elapsed = moment.duration(new Date().valueOf() - new Date(datetime).valueOf())

  return (
    <span>
      <DatetimeSpan>{new Date(datetime).toLocaleString()}</DatetimeSpan> <ElapsedSpan>({elapsed.humanize()} ago)</ElapsedSpan>
    </span>
  )
}

export const WorkflowCard = ({ workflow }: { workflow: Workflow }) => (
  <Card>
    <CardTitle>{workflow.name}</CardTitle>

    <Indicator text={workflow.status}>
      <StatusIndicatorIcon status={workflow.status}/>
    </Indicator>

    <WorkflowProperties>
      <WorkflowProperty>
        Namespace: {workflow.namespace}
      </WorkflowProperty>

      <WorkflowProperty>
        Started at: {formatTime(workflow.startedAt)}
      </WorkflowProperty>

      {workflow.finishedAt &&
          <WorkflowProperty>Finished at: {formatTime(workflow.finishedAt)}</WorkflowProperty>}

      <WorkflowProperty>
        Stages: {workflow.stages.length}
      </WorkflowProperty>

      <WorkflowProperty>
        Steps: {workflow.stages
        .map(_ => _.steps.length)
        .reduce((prev, cur) => prev + cur, 0)}
      </WorkflowProperty>
    </WorkflowProperties>

    <WorkflowActions>
      <li><ViewLink href={`/view/${workflow.namespace}/${workflow.name}`}>
        View <i className="fas fa-arrow-right"/>
      </ViewLink></li>

      {workflow.status === 'running' && <>
          <li><PauseButton>Pause <i className="fas fa-pause"/></PauseButton></li>
          <li><CancelButton>Cancel <i className="fas fa-times"/></CancelButton></li>
      </>}
    </WorkflowActions>
  </Card>
)
