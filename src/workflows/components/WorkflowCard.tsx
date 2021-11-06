import { Card, CardTitle } from '../../lib/components/Card'
import { Indicator } from '../../lib/components/Indicator'
import {
  ChangeIndicatorIcon,
  DangerIndicatorIcon,
  PrimaryIndicatorIcon,
  SuccessIndicatorIcon
} from '../../lib/components/IndicatorIcon'
import { CancelButton, PauseButton, ViewButton } from '../../lib/components/Button'
import React from 'react'
import styled from 'styled-components'
import { WorkflowStatus } from '../types/workflows'
import { theme } from '../../theme'
import moment from 'moment'

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

const formatTime = (datetime: Date) => {
  const elapsed = moment.duration(new Date() - new Date(datetime))

  return (
    <span>
      <DatetimeSpan>{datetime.toLocaleString()}</DatetimeSpan> <ElapsedSpan>({elapsed.humanize()} ago)</ElapsedSpan>
    </span>
  )
}

const indicatorForStatus = status => {
  switch (status) {
    case 'running':
      return <ChangeIndicatorIcon/>
    case 'succeeded':
      return <SuccessIndicatorIcon/>
    case 'failed':
      return <DangerIndicatorIcon/>
    default:
      console.error(`unknown status: ${status}`)
      return <PrimaryIndicatorIcon/>
  }
}

export const WorkflowCard = (props: { workflow: WorkflowStatus }) => (
  <Card>
    <CardTitle>Workflow {props.workflow.name}</CardTitle>

    <Indicator text={props.workflow.status}>
      {indicatorForStatus(props.workflow.status)}
    </Indicator>

    <WorkflowProperties>
      <WorkflowProperty>Namespace: {props.workflow.namespace}</WorkflowProperty>
      <WorkflowProperty>Started at: {formatTime(props.workflow.startedAt)}</WorkflowProperty>
      {props.workflow.finishedAt &&
          <WorkflowProperty>Finished at: {formatTime(props.workflow.finishedAt)}</WorkflowProperty>}
    </WorkflowProperties>

    <WorkflowActions>
      <li><ViewButton>View <i className="fas fa-arrow-right"/></ViewButton></li>
      {props.workflow.status === 'running' && <>
          <li><PauseButton>Pause <i className="fas fa-pause"/></PauseButton></li>
          <li><CancelButton>Cancel <i className="fas fa-times"/></CancelButton></li>
      </>}
    </WorkflowActions>
  </Card>
)
