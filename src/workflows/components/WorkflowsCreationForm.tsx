import { Header, Main, Page, PageName } from '../../lib/components/Page'
import React from 'react'
import styled from 'styled-components'
import { BackButton, RefreshButton, RunButton } from '../../lib/components/Button'
import { Input } from '../../lib/components/Input'
import { Card, CardTitle, CompactCard } from '../../lib/components/Card'
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
import { theme } from '../../theme'

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

const Section = styled.div`
  margin: 0 -5em;
  padding: 0 5em;
  
  &:not(:last-of-type) {
    border-bottom: ${theme.borders.style.separator};
  }
`

const SectionContent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1em 0 1em 2em;
  gap: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  grid-auto-rows: 1fr;
  place-items: stretch;
`

const SectionItem = styled.li`
  display: flex;
`

const SectionItemCard = styled(CompactCard)`
  justify-self: stretch;
  align-self: stretch;
  flex: 1;
`

const SectionCard = (props: { checked: boolean, title: string }) => (
  <SectionItem>
    <SectionItemCard>
      <CompactFormField>
        <Checkbox checked={props.checked}/>
        <CompactFormLabel>{props.title}</CompactFormLabel>
      </CompactFormField>
    </SectionItemCard>
  </SectionItem>
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

            <SectionContent>
              <SectionCard checked={true} title={'network latency'}/>
              <SectionCard checked={false} title={'network jitter'}/>
              <SectionCard checked={false} title={'network packet drop'}/>
              <SectionCard checked={true} title={'network loss'}/>

              <SectionCard checked={true} title={'network latency'}/>
              <SectionCard checked={false} title={'network jitter'}/>
              <SectionCard checked={true} title={'network packet drop'}/>
              <SectionCard checked={false} title={'network loss'}/>
            </SectionContent>
          </Section>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Delete failures</FormLabel>
            </FormField>

            <SectionContent>
              <SectionCard checked={true} title={'network latency'}/>
              <SectionCard checked={false} title={'network jitter'}/>
              <SectionCard checked={false} title={'network packet drop'}/>
              <SectionCard checked={true} title={'network loss'}/>
            </SectionContent>
          </Section>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Filesystem failures</FormLabel>
            </FormField>

            <SectionContent>
              <SectionCard checked={true} title={'network latency'}/>
              <SectionCard checked={false} title={'network jitter'}/>
              <SectionCard checked={false} title={'network packet drop'}/>
              <SectionCard checked={true} title={'network loss'}/>
            </SectionContent>
          </Section>
        </Card>

        <Card>
          <CardTitle>Targets</CardTitle>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Deployments</FormLabel>
            </FormField>

            <SectionContent>
              <SectionCard checked={true} title={'network latency'}/>
              <SectionCard checked={false} title={'network jitter'}/>
              <SectionCard checked={false} title={'network packet drop'}/>
              <SectionCard checked={true} title={'network loss'}/>
            </SectionContent>
          </Section>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Stateful sets</FormLabel>
            </FormField>

            <SectionContent>
              <SectionCard checked={true} title={'network latency'}/>
              <SectionCard checked={false} title={'network jitter'}/>
              <SectionCard checked={false} title={'network packet drop'}/>
              <SectionCard checked={true} title={'network loss'}/>
            </SectionContent>
          </Section>

          <Section>
            <FormField>
              <Checkbox indeterminate={true}/>
              <FormLabel>Daemon sets</FormLabel>
            </FormField>

            <SectionContent>
              <SectionCard checked={true} title={'network latency'}/>
              <SectionCard checked={false} title={'network jitter'}/>
              <SectionCard checked={false} title={'network packet drop'}/>
              <SectionCard checked={true} title={'network loss'}/>
            </SectionContent>
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
