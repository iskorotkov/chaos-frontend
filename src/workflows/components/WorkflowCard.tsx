import { Card, CardTitle } from '../../lib/components/Card'
import { Indicator } from '../../lib/components/Indicator'
import { SuccessIndicatorIcon } from '../../lib/components/IndicatorIcon'
import { CancelButton, PauseButton, ViewButton } from '../../lib/components/Button'
import React from 'react'
import styled from 'styled-components'

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
  <Card>
    <CardTitle>Workflow 1vwppi3h</CardTitle>

    <Indicator text="completed">
      <SuccessIndicatorIcon/>
    </Indicator>

    <WorkflowProperties>
      <WorkflowProperty>Namespace: 12312</WorkflowProperty>
      <WorkflowProperty>Started at: 12gregerg</WorkflowProperty>
      <WorkflowProperty>Finished at: 342vre</WorkflowProperty>
    </WorkflowProperties>

    <WorkflowActions>
      <li><ViewButton>View <i className="fas fa-arrow-right"/></ViewButton></li>
      <li><PauseButton>Pause <i className="fas fa-pause"/></PauseButton></li>
      <li><CancelButton>Cancel <i className="fas fa-times"/></CancelButton></li>
    </WorkflowActions>
  </Card>
)
