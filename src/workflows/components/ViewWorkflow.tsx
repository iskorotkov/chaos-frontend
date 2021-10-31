import { Header, Main, Page, PageName } from '../../lib/components/Page'
import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { Card, CardTitle } from '../../lib/components/Card'
import { Section, SectionTitle } from '../../lib/components/Section'
import { Grid, GridCard } from '../../lib/components/Grid'
import { ChangeIndicatorIcon } from '../../lib/components/IndicatorIcon'
import { BackButton, CancelButton, PauseButton, RunButton } from '../../lib/components/Button'

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

const IndicatorCard = () => (
  <GridCard>
    network latency
    <IndicatorWrapper>
      <ChangeIndicatorIcon/>
    </IndicatorWrapper>
  </GridCard>
)

export const ViewWorkflow = (props: { preview: boolean }) => {
  const { name } = useParams<{ namespace: string, name: string }>()

  const pageName = props.preview ? 'Preview workflow' : 'View workflow'

  const actionsRow =
    props.preview
      ? <ActionsRowForPreview>
        <BackButton><i className="fas fa-arrow-left"/> Back</BackButton>
        <RunButton>Run <i className="fas fa-caret-right"/></RunButton>
      </ActionsRowForPreview>
      : <ActionsRowForView>
        <BackButton><i className="fas fa-arrow-left"/> Back</BackButton>
        <PauseButton>Pause <i className="fas fa-pause"/></PauseButton>
        <CancelButton>Cancel <i className="fas fa-times"/></CancelButton>
      </ActionsRowForView>

  const StepCard = () => props.preview ? <GridCard>network latency</GridCard> : <IndicatorCard/>

  return (
    <Page>
      <Header>
        <PageName>Chaos Framework / {pageName}</PageName>
      </Header>

      <Main>
        {actionsRow}

        <Card>
          <CardTitle>Workflow {name}</CardTitle>

          <Section>
            <SectionTitle>General info</SectionTitle>

            <WorkflowInfo>
              {!props.preview && <WorkflowInfoLine>Started at: 2021-01-01 10:00:00</WorkflowInfoLine>}
              <WorkflowInfoLine>Namespace: app</WorkflowInfoLine>
              <WorkflowInfoLine>Seed: 123</WorkflowInfoLine>
            </WorkflowInfo>
          </Section>

          <Section>
            <SectionTitle>Stage 1</SectionTitle>

            <Grid>
              <StepCard/>
              <StepCard/>
              <StepCard/>
              <StepCard/>
              <StepCard/>
            </Grid>
          </Section>

          <Section>
            <SectionTitle>Stage 2</SectionTitle>

            <Grid>
              <StepCard/>
              <StepCard/>
              <StepCard/>
            </Grid>
          </Section>

          <Section>
            <SectionTitle>Stage 3</SectionTitle>

            <Grid>
              <StepCard/>
              <StepCard/>
              <StepCard/>
            </Grid>
          </Section>
        </Card>
      </Main>
    </Page>
  )
}
