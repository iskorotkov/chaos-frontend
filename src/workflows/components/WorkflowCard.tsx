import { Card, CardTitle } from '../../lib/components/Card'
import { Indicator } from '../../lib/components/Indicator'
import {
  ChangeIndicatorIcon,
  DangerIndicatorIcon,
  PrimaryIndicatorIcon,
  SuccessIndicatorIcon
} from '../../lib/components/IndicatorIcon'
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

const indicatorForStatus = (status: string) => {
  switch (status) {
    case 'running':
      return <ChangeIndicatorIcon/>
    case 'pending':
      return <ChangeIndicatorIcon/>
    case 'succeeded':
      return <SuccessIndicatorIcon/>
    case 'failed':
      return <DangerIndicatorIcon/>
    case 'error':
      return <DangerIndicatorIcon/>
    case 'canceled':
      return <DangerIndicatorIcon/>
    default:
      console.error(`unknown status: ${status}`)
      return <PrimaryIndicatorIcon/>
  }
}

export const WorkflowCard = (props: { workflow: Workflow }) => (
  <Card>
    <CardTitle>Workflow {props.workflow.name}</CardTitle>

    <Indicator text={props.workflow.status}>
      {indicatorForStatus(props.workflow.status)}
    </Indicator>

    <WorkflowProperties>
      <WorkflowProperty>Started at: {formatTime(props.workflow.startedAt)}</WorkflowProperty>
      {props.workflow.finishedAt &&
          <WorkflowProperty>Finished at: {formatTime(props.workflow.finishedAt)}</WorkflowProperty>}
      <WorkflowProperty>Stages: {props.workflow.stages.length}</WorkflowProperty>
      <WorkflowProperty>Steps: {props.workflow.stages
        .map(_ => _.steps.length)
        .reduce((prev, cur) => prev + cur, 0)}</WorkflowProperty>
    </WorkflowProperties>

    <WorkflowActions>
      <li><ViewLink href="/view/x/y">View <i className="fas fa-arrow-right"/></ViewLink></li>
      {props.workflow.status === 'running' && <>
          <li><PauseButton>Pause <i className="fas fa-pause"/></PauseButton></li>
          <li><CancelButton>Cancel <i className="fas fa-times"/></CancelButton></li>
      </>}
    </WorkflowActions>
  </Card>
)
