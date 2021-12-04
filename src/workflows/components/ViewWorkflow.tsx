import { Header, Main, Page, PageName } from '../../lib/components/Page'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { Card, CardTitle } from '../../lib/components/Card'
import { Section, SectionTitle } from '../../lib/components/Section'
import { Grid, GridCard } from '../../lib/components/Grid'
import { CancelButton, PauseButton } from '../../lib/components/Button'
import { BackLink, RunLink } from '../../lib/components/Link'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { Workflow } from '../types/workflows'
import { StatusIndicatorIcon } from '../../lib/components/Indicator'

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

export const ViewWorkflow = (props: { preview: boolean }) => {
  const { namespace, name } = useParams<{ namespace: string, name: string }>()
  const [workflow, setWorkflow] = useState<Workflow>()

  useEffect(() => {
    axios(`${BACKEND_URL}/api/v1/workflows/${namespace}/${name}`)
      .then(resp => setWorkflow(resp.data as Workflow))
      .catch(err => console.log(`error getting workflow info: ${err}`))
  }, [namespace, name])

  const pageName = props.preview ? 'Preview workflow' : 'View workflow'

  return (
    <Page>
      <Header>
        <PageName>Chaos Framework / {pageName}</PageName>
      </Header>

      <Main>
        {props.preview
          ? <ActionsRowForPreview>
            <BackLink href="/create"><i className="fas fa-arrow-left"/> Back</BackLink>
            <RunLink href={`/view/${namespace}/${name}`}>Run <i className="fas fa-caret-right"/></RunLink>
          </ActionsRowForPreview>
          : <ActionsRowForView>
            <BackLink href="/"><i className="fas fa-arrow-left"/> Back</BackLink>
            <PauseButton>Pause <i className="fas fa-pause"/></PauseButton>
            <CancelButton>Cancel <i className="fas fa-times"/></CancelButton>
          </ActionsRowForView>}

        <Card>
          <CardTitle>{name}</CardTitle>

          <Section>
            <SectionTitle>General info</SectionTitle>

            <WorkflowInfo>
              <WorkflowInfoLine>Namespace: {namespace}</WorkflowInfoLine>
              {!props.preview &&
                  <WorkflowInfoLine>
                      Started at: {workflow ? new Date(workflow.startedAt).toLocaleString() : '-'}
                  </WorkflowInfoLine>}
              {!props.preview &&
                  <WorkflowInfoLine>
                      Finished at: {workflow ? new Date(workflow.finishedAt).toLocaleString() : '-'}
                  </WorkflowInfoLine>}
            </WorkflowInfo>
          </Section>

          {workflow && workflow.stages.map((stage, stageIndex) => (
            <Section key={stageIndex}>
              <SectionTitle>Stage {stageIndex + 1}</SectionTitle>

              <Grid>
                {stage.steps.map((step, stepIndex) => (
                  <GridCard key={stepIndex}>
                    {step.name}

                    {!props.preview &&
                        <IndicatorWrapper>
                            <StatusIndicatorIcon status={step.status}/>
                        </IndicatorWrapper>
                    }
                  </GridCard>
                ))}
              </Grid>
            </Section>
          ))}
        </Card>
      </Main>
    </Page>
  )
}
