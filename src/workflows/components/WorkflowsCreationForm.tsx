import { Header, Main, Page, PageName } from '../../lib/components/Page'
import React from 'react'
import styled from 'styled-components'
import { BackButton, RefreshButton, RunButton } from '../../lib/components/Button'
import { Input } from '../../lib/components/Input'
import { Card, CardTitle } from '../../lib/components/Card'
import {
  CompactFormField,
  CompactFormLabel,
  FormField,
  FormLabel,
  FormLabelFixed,
  FormLabelMuted,
  FormVerticalBlock
} from '../../lib/components/Form'
import { Checkbox } from '../../lib/components/Checkbox'
import { Section } from '../../lib/components/Section'
import { Grid, GridCard } from '../../lib/components/Grid'

const ActionsRow = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: space-between;
`

const StagesNumberField = styled(Input).attrs(() => ({
  type: 'number',
  value: 1,
  min: 0,
  max: 100
}))``

const CheckboxCard = (props: { checked: boolean, title: string }) => (
  <GridCard>
    <CompactFormField>
      <Checkbox checked={props.checked}/>
      <CompactFormLabel>{props.title}</CompactFormLabel>
    </CompactFormField>
  </GridCard>
)

export const WorkflowsCreationForm = () => (
  <Page>
    <Header>
      <PageName>Chaos Framework / Create a new workflow</PageName>
    </Header>

    <Main>
      <ActionsRow>
        <BackButton><i className="fas fa-arrow-left"/> Back</BackButton>
        <RunButton>Run <i className="fas fa-caret-right"/></RunButton>
      </ActionsRow>

      <form>
        <Card>
          <CardTitle>Settings</CardTitle>

          <FormField>
            <FormLabelFixed for="namespace-input">Namespace</FormLabelFixed>
            <Input id="namespace-input" type="text" required list="namespaces"
                   placeholder="select namespace..."/>
          </FormField>

          <FormField>
            <FormLabelFixed for="name-input">Name</FormLabelFixed>
            <Input id="name-input" type="text" required placeholder="enter name..."/>
          </FormField>

          <FormField>
            <FormLabelFixed for="random-seed-input">Random seed</FormLabelFixed>
            <Input id="random-seed-input" type="number" value="0"/>

            <RefreshButton>Random <i className="fas fa-sync"/></RefreshButton>
          </FormField>

          <FormField>
            <FormLabelFixed>Number of stages</FormLabelFixed>

            <FormVerticalBlock>
              <StagesNumberField id="stages-with-single-failure-input"/>
              <FormLabelMuted for="stages-with-single-failure-input">stages with single failure</FormLabelMuted>
            </FormVerticalBlock>

            <FormVerticalBlock>
              <StagesNumberField id="stages-with-similar-failures-input"/>
              <FormLabelMuted for="stages-with-similar-failures-input">stages with similar failures</FormLabelMuted>
            </FormVerticalBlock>

            <FormVerticalBlock>
              <StagesNumberField id="stages-with-mixed-failures-input"/>
              <FormLabelMuted for="stages-with-mixed-failures-input">stages with mixed failures</FormLabelMuted>
            </FormVerticalBlock>
          </FormField>
        </Card>

        <Card>
          <CardTitle>Failures</CardTitle>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Network failures</FormLabel>
            </FormField>

            <Grid>
              <CheckboxCard checked={true} title={'network latency'}/>
              <CheckboxCard checked={false} title={'network jitter'}/>
              <CheckboxCard checked={false} title={'network packet drop'}/>
              <CheckboxCard checked={true} title={'network loss'}/>

              <CheckboxCard checked={true} title={'network latency'}/>
              <CheckboxCard checked={false} title={'network jitter'}/>
              <CheckboxCard checked={true} title={'network packet drop'}/>
              <CheckboxCard checked={false} title={'network loss'}/>
            </Grid>
          </Section>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Delete failures</FormLabel>
            </FormField>

            <Grid>
              <CheckboxCard checked={true} title={'network latency'}/>
              <CheckboxCard checked={false} title={'network jitter'}/>
              <CheckboxCard checked={false} title={'network packet drop'}/>
              <CheckboxCard checked={true} title={'network loss'}/>
            </Grid>
          </Section>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Filesystem failures</FormLabel>
            </FormField>

            <Grid>
              <CheckboxCard checked={true} title={'network latency'}/>
              <CheckboxCard checked={false} title={'network jitter'}/>
              <CheckboxCard checked={false} title={'network packet drop'}/>
              <CheckboxCard checked={true} title={'network loss'}/>
            </Grid>
          </Section>
        </Card>

        <Card>
          <CardTitle>Targets</CardTitle>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Deployments</FormLabel>
            </FormField>

            <Grid>
              <CheckboxCard checked={true} title={'network latency'}/>
              <CheckboxCard checked={false} title={'network jitter'}/>
              <CheckboxCard checked={false} title={'network packet drop'}/>
              <CheckboxCard checked={true} title={'network loss'}/>
            </Grid>
          </Section>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Stateful sets</FormLabel>
            </FormField>

            <Grid>
              <CheckboxCard checked={true} title={'network latency'}/>
              <CheckboxCard checked={false} title={'network jitter'}/>
              <CheckboxCard checked={false} title={'network packet drop'}/>
              <CheckboxCard checked={true} title={'network loss'}/>
            </Grid>
          </Section>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Daemon sets</FormLabel>
            </FormField>

            <Grid>
              <CheckboxCard checked={true} title={'network latency'}/>
              <CheckboxCard checked={false} title={'network jitter'}/>
              <CheckboxCard checked={false} title={'network packet drop'}/>
              <CheckboxCard checked={true} title={'network loss'}/>
            </Grid>
          </Section>
        </Card>
      </form>
    </Main>

    <datalist id="namespaces">
      <option selected>chaos-app</option>
      <option>default</option>
    </datalist>
  </Page>
)
