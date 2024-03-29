import { Header, Main, Page, PageName } from '../../lib/components/Page'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router'
import { Card, CardTitle } from '../../lib/components/Card'
import { Section, SectionTitle } from '../../lib/components/Section'
import { Grid, GridCard } from '../../lib/components/Grid'
import { CancelButton, RunButton } from '../../lib/components/Button'
import { BackLink } from '../../lib/components/Link'
import { Workflow, WorkflowPreview } from '../types/workflows'
import { StatusIndicatorIcon } from '../../lib/components/Indicator'
import axios from 'axios'
import { SCHEDULER_URL, WORKFLOWS_URL, WORKFLOWS_WS_URL } from '../../config'
import { selectCreateWorkflowForm } from '../reducers/createWorkflowForm'
import { useAppSelector } from '../../store'
import { theme } from '../../theme'
import useWebSocket from 'react-use-websocket'
import { Loading } from '../../lib/components/Loading'

const ActionsRowForPreview = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: space-between;
`

const ActionsRowForView = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: left;
`

const WorkflowInfo = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1em 0;
`

const WorkflowInfoLine = styled.li`
  padding: 0.1em 0;
`

const IndicatorWrapper = styled.div`
  margin-left: auto;
`

const CardContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`

const CardContentRow = styled.p`
  padding: 0;
  margin: 0;

  &:not(:first-of-type) {
    color: ${theme.colors.text.muted};
  }
`

export const WatchWorkflow = () => {
  const { namespace, name } = useParams<{ namespace: string; name: string }>()
  const { lastJsonMessage } = useWebSocket(
    `${WORKFLOWS_WS_URL}/api/v1/workflows/${namespace}/${name}/watch`,
    {
      reconnectAttempts: 1000,
      reconnectInterval: 5000,
      retryOnError: true,
    },
  )

  const workflow = lastJsonMessage as Workflow | undefined

  const history = useHistory()
  const onCancel = () => {
    axios(`${WORKFLOWS_URL}/api/v1/workflows/${namespace}/${name}/cancel`, {
      method: 'POST',
    })
      .then((resp) =>
        console.log('cancelled workflow with response', resp.data),
      )
      .then(() => history.goBack())
      .catch((e) => {
        console.error(`error getting workflow preview: ${e}`)
        alert('Error cancelling workflow')
      })
  }

  return (
    <Page>
      <Header>
        <PageName>Chaos Framework / View workflow</PageName>
      </Header>

      <Main>
        <ActionsRowForView>
          <BackLink href='/'>
            <i className='fas fa-arrow-left' /> Back
          </BackLink>
          {workflow?.status === 'running' && (
            <CancelButton onClick={onCancel}>
              Cancel <i className='fas fa-times' />
            </CancelButton>
          )}
        </ActionsRowForView>

        {!workflow ? (
          <Loading text='Workflow is loading...' />
        ) : (
          <Card>
            <CardTitle>{workflow.name}</CardTitle>

            <Section>
              <SectionTitle>General info</SectionTitle>

              <WorkflowInfo>
                <WorkflowInfoLine>
                  Namespace: {workflow.namespace}
                </WorkflowInfoLine>
                <WorkflowInfoLine>
                  Started at:{' '}
                  {workflow
                    ? new Date(workflow.startedAt).toLocaleString()
                    : '-'}
                </WorkflowInfoLine>
                <WorkflowInfoLine>
                  Finished at:{' '}
                  {workflow
                    ? new Date(workflow.finishedAt).toLocaleString()
                    : '-'}
                </WorkflowInfoLine>
              </WorkflowInfo>
            </Section>

            {workflow &&
              workflow.stages.map((stage, stageIndex) => (
                <Section key={stageIndex}>
                  <SectionTitle>Stage {stageIndex + 1}</SectionTitle>

                  <Grid>
                    {stage.steps.map((step, stepIndex) => (
                      <GridCard key={stepIndex}>
                        <CardContent>
                          <CardContentRow>{step.name}</CardContentRow>
                          <CardContentRow>
                            severity: {step.severity}
                          </CardContentRow>
                          <CardContentRow>scale: {step.scale}</CardContentRow>
                        </CardContent>

                        <IndicatorWrapper>
                          <StatusIndicatorIcon status={step.status} />
                        </IndicatorWrapper>
                      </GridCard>
                    ))}
                  </Grid>
                </Section>
              ))}
          </Card>
        )}
      </Main>
    </Page>
  )
}

export const PreviewWorkflow = () => {
  const [workflow, setWorkflow] = useState<WorkflowPreview>()
  const workflowReq = useAppSelector(selectCreateWorkflowForm)

  useEffect(() => {
    axios(`${SCHEDULER_URL}/api/v1/workflows/preview`, {
      method: 'POST',
      data: workflowReq,
    })
      .then((resp) => setWorkflow(resp.data as WorkflowPreview))
      .catch((e) => {
        console.error(`error getting workflow preview: ${e}`)
        alert('Error getting workflow preview')
      })
  }, [workflowReq])

  const history = useHistory()
  const onRun = () => {
    axios(`${SCHEDULER_URL}/api/v1/workflows`, {
      method: 'POST',
      data: workflowReq,
    })
      .then((resp) => {
        const { name, namespace } = resp.data as {
          namespace: string
          name: string
        }
        history.push(`/view/${namespace}/${name}`)
      })
      .catch((e) => {
        console.error(e)
        alert('Error running workflow')
      })
  }

  return (
    <Page>
      <Header>
        <PageName>Chaos Framework / Preview workflow</PageName>
      </Header>

      <Main>
        <ActionsRowForPreview>
          <BackLink href='/create'>
            <i className='fas fa-arrow-left' /> Back
          </BackLink>
          <RunButton onClick={onRun}>
            Run <i className='fas fa-caret-right' />
          </RunButton>
        </ActionsRowForPreview>

        {!workflow ? (
          <Loading text='Generating a workflow...' />
        ) : (
          <Card>
            <CardTitle>Previewing a workflow</CardTitle>

            <Section>
              <SectionTitle>General info</SectionTitle>

              <WorkflowInfo>
                <WorkflowInfoLine>
                  Namespace: {workflow.namespace}
                </WorkflowInfoLine>
              </WorkflowInfo>
            </Section>

            {workflow &&
              workflow.stages.map((stage, stageIndex) => (
                <Section key={stageIndex}>
                  <SectionTitle>Stage {stageIndex + 1}</SectionTitle>

                  <Grid>
                    {stage.steps.map((step, stepIndex) => (
                      <GridCard key={stepIndex}>
                        <CardContent>
                          <CardContentRow>{step.name}</CardContentRow>
                          <CardContentRow>
                            target: {step.target.appLabelValue}
                          </CardContentRow>
                          <CardContentRow>
                            severity: {step.severity}
                          </CardContentRow>
                          <CardContentRow>scale: {step.scale}</CardContentRow>
                        </CardContent>
                      </GridCard>
                    ))}
                  </Grid>
                </Section>
              ))}
          </Card>
        )}
      </Main>
    </Page>
  )
}
