import { StyledCard } from '../../lib/components/Card'
import { StyledIndicator } from '../../lib/components/Indicator'
import { SuccessIndicatorIcon } from '../../lib/components/IndicatorIcon'
import { CancelButton, PauseButton, ViewButton } from '../../lib/components/Button'
import React from 'react'
import styled from 'styled-components'

const WorkflowName = styled.h2`
  padding: 0;
  margin: 0 0 0.5em 0;
`

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

export const WorkflowCard = () => (
  <StyledCard>
    <WorkflowName>Workflow 1vwppi3h</WorkflowName>

    <StyledIndicator text="completed">
      <SuccessIndicatorIcon/>
    </StyledIndicator>

    <WorkflowProperties>
      <WorkflowProperty>Namespace: 12312</WorkflowProperty>
      <WorkflowProperty>Started at: 12gregerg</WorkflowProperty>
      <WorkflowProperty>Finished at: 342vre</WorkflowProperty>
    </WorkflowProperties>

    <WorkflowActions>
      <li><ViewButton>View {'->'}</ViewButton></li>
      <li><PauseButton>Pause ||</PauseButton></li>
      <li><CancelButton>Cancel X</CancelButton></li>
    </WorkflowActions>
  </StyledCard>
)
