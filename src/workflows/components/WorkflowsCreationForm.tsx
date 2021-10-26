import { Header, Main, Page, PageName } from '../../lib/components/Page'
import React from 'react'
import styled from 'styled-components'
import { BackButton, RefreshButton, RunButton } from '../../lib/components/Button'
import { Input } from '../../lib/components/Input'
import { Card, CardTitle } from '../../lib/components/Card'
import { FormField, FormLabelFixed, FormLabelMuted, FormVerticalBlock } from '../../lib/components/Form'
import { Checkbox } from '../../lib/components/Checkbox'

const ActionsRow = styled.div`
  display: flex;
  margin: 0.5em 0;
  gap: 0.5em;
  justify-content: space-between;
`

const StagesNumberField = styled(Input).attrs(() => ({
  type: 'number',
  value: 1,
  min: 0,
  max: 100
}))``

export const WorkflowsCreationForm = () => (
  <Page>
    <Header>
      <PageName>Chaos Framework / Create a new workflow</PageName>
    </Header>

    <Main>
      <ActionsRow>
        <BackButton>{'<-'} Back</BackButton>
        <RunButton>Run {'|>'}</RunButton>
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

            <RefreshButton>Random @</RefreshButton>
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
          <Checkbox checked={true}/>
          <Checkbox checked={false}/>
          <Checkbox indeterminate={true}/>
        </Card>

        <Card>
          <CardTitle>Targets</CardTitle>
        </Card>
      </form>
    </Main>

    <datalist id="namespaces">
      <option selected>chaos-app</option>
      <option>default</option>
    </datalist>
  </Page>
)
