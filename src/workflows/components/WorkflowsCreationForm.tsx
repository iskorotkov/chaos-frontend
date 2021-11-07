import { Header, Main, Page, PageName } from '../../lib/components/Page'
import React, { ChangeEvent, useEffect, useState } from 'react'
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
import { Target } from '../types/targets'
import { Namespace } from '../types/namespaces'
import { Failure } from '../types/failures'
import { backendAddress } from '../../config'
import axios from 'axios'
import plur from 'plur'

const stagesRange = {
  min: 0,
  max: 100
}

const ActionsRow = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: space-between;
`

const StagesNumberField = styled(Input).attrs(() => ({
  type: 'number',
  min: stagesRange.min,
  max: stagesRange.max
}))``

const CheckboxCard = (props: { checked: boolean, title: string, onToggled: (value: boolean) => void }) => (
  <GridCard>
    <CompactFormField>
      <Checkbox checked={props.checked} onToggled={props.onToggled} />
      <CompactFormLabel>{props.title}</CompactFormLabel>
    </CompactFormField>
  </GridCard>
)

const toFirstUpperCase = (s: string) => {
  if (s.length !== 0) {
    s = s[0].toUpperCase() + s.slice(1)
  }

  return s
}

const clamp = (x: number, min: number, max: number) => x < min
  ? min
  : x > max
    ? max
    : x

export const WorkflowsCreationForm = () => {
  const [targets, setTargets] = useState<Target[]>([])
  const [failures, setFailures] = useState<Failure[]>([])
  const [namespaces, setNamespaces] = useState<Namespace[]>([])

  const [seed, setSeed] = useState(0)
  const [stages, setStages] = useState({ single: 1, similar: 1, mixed: 1 })
  const [namespace, setNamespace] = useState('')
  const [enabledTargets, setEnabledTargets] = useState(new Set<Target>())
  const [enabledFailures, setEnabledFailures] = useState(new Set<Failure>())

  useEffect(() => {
    axios(`${backendAddress()}/api/v1/targets`)
      .then(res => res.data as Target[])
      .then(t => {
        setTargets(t)
        setEnabledTargets(new Set(t))
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    axios(`${backendAddress()}/api/v1/failures`)
      .then(res => res.data as Failure[])
      .then(f => {
        setFailures(f)
        setEnabledFailures(new Set(f))
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    axios(`${backendAddress()}/api/v1/namespaces`)
      .then(res => res.data as Namespace[])
      .then(setNamespaces)
      .catch(console.error)
  }, [])

  const groupedTargets = new Map<string, Target[]>()
  for (const target of targets) {
    const group = groupedTargets.get(target.type)
    if (group) {
      group.push(target)
    } else {
      groupedTargets.set(target.type, [target])
    }
  }

  const groupedFailures = new Map<string, Failure[]>()
  for (const failure of failures) {
    const group = groupedFailures.get(failure.type)
    if (group) {
      group.push(failure)
    } else {
      groupedFailures.set(failure.type, [failure])
    }
  }

  const randomizeSeed = () => setSeed(Math.floor(Math.random() * 1_000_000))

  const onSeedChanged = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value
    if (value.match(/[0-9]+/)) {
      setSeed(parseInt(value))
    }
  }

  const onStageCountChanged = (e: ChangeEvent, key: string) => {
    const value = (e.target as HTMLInputElement).value
    if (value.match(/[0-9]+/)) {
      setStages({
        ...stages,
        [key]: clamp(parseInt(value), stagesRange.min, stagesRange.max)
      })
    }
  }

  const onFailureToggled = (failure: Failure, value: boolean) => {
    setEnabledFailures(orig => {
      const copy = new Set(orig.keys())
      if (value) {
        copy.add(failure)
      } else {
        copy.delete(failure)
      }
      return copy
    })
  }

  const onTargetToggled = (target: Target, value: boolean) => {
    setEnabledTargets(orig => {
      const copy = new Set(orig.keys())
      if (value) {
        copy.add(target)
      } else {
        copy.delete(target)
      }
      return copy
    })
  }

  const onFailureGroupToggled = (group: string, failures: Failure[]) => {
    for (const failure of failures) {
      onFailureToggled(failure, !failures.every(f => enabledFailures.has(f)))
    }
  }

  const onTargetGroupToggled = (group: string, targets: Target[]) => {
    for (const target of targets) {
      onTargetToggled(target, !targets.every(t => enabledTargets.has(t)))
    }
  }

  return (
    <Page>
      <Header>
        <PageName>Chaos Framework / Create a new workflow</PageName>
      </Header>

      <Main>
        <ActionsRow>
          <BackButton><i className="fas fa-arrow-left" /> Back</BackButton>
          <RunButton>Run <i className="fas fa-caret-right" /></RunButton>
        </ActionsRow>

        <form>
          <Card>
            <CardTitle>Settings</CardTitle>

            <FormField>
              <FormLabelFixed htmlFor="namespace-input">Namespace</FormLabelFixed>
              <Input id="namespace-input" type="text" required list="namespaces" value={namespace}
                placeholder="select namespace..." onChange={e => setNamespace((e.target as HTMLInputElement).value)} />
            </FormField>

            <FormField>
              <FormLabelFixed htmlFor="random-seed-input">Random seed</FormLabelFixed>
              <Input id="random-seed-input" type="number" value={seed} onChange={onSeedChanged} />

              <RefreshButton onClick={randomizeSeed}>Random <i className="fas fa-sync" /></RefreshButton>
            </FormField>

            <FormField>
              <FormLabelFixed>Number of stages</FormLabelFixed>

              <FormVerticalBlock>
                <StagesNumberField id="stages-with-single-failure-input" value={stages.single} onChange={e => onStageCountChanged(e, 'single')} />
                <FormLabelMuted htmlFor="stages-with-single-failure-input">stages with single failure</FormLabelMuted>
              </FormVerticalBlock>

              <FormVerticalBlock>
                <StagesNumberField id="stages-with-similar-failures-input" value={stages.similar} onChange={e => onStageCountChanged(e, 'similar')} />
                <FormLabelMuted htmlFor="stages-with-similar-failures-input">stages with similar failures</FormLabelMuted>
              </FormVerticalBlock>

              <FormVerticalBlock>
                <StagesNumberField id="stages-with-mixed-failures-input" value={stages.mixed} onChange={e => onStageCountChanged(e, 'mixed')} />
                <FormLabelMuted htmlFor="stages-with-mixed-failures-input">stages with mixed failures</FormLabelMuted>
              </FormVerticalBlock>
            </FormField>
          </Card>

          <Card>
            <CardTitle>Failures</CardTitle>

            {Array.from(groupedFailures.entries()).map(([group, failures]) => (
              <Section key={group}>
                <FormField>
                  <Checkbox
                    checked={failures.every(f => enabledFailures.has(f))}
                    onToggled={() => onFailureGroupToggled(group, failures)}
                    indeterminate={!failures.every(f => enabledFailures.has(f)) && failures.some(f => enabledFailures.has(f))} />
                  <FormLabel>{plur(toFirstUpperCase(group), 2)}</FormLabel>
                </FormField>

                <Grid>
                  {failures.map(f => (
                    <CheckboxCard key={f.name}
                      checked={enabledFailures.has(f)}
                      title={toFirstUpperCase(f.name) + ' (' + f.scale + ' / ' + f.severity + ')'}
                      onToggled={value => onFailureToggled(f, value)} />
                  ))}
                </Grid>
              </Section>
            ))}
          </Card>

          <Card>
            <CardTitle>Targets</CardTitle>

            {Array.from(groupedTargets.entries()).map(([group, targets]) => (
              <Section key={group}>
                <FormField>
                  <Checkbox
                    checked={targets.every(t => enabledTargets.has(t))}
                    onToggled={() => onTargetGroupToggled(group, targets)}
                    indeterminate={!targets.every(t => enabledTargets.has(t)) && targets.some(t => enabledTargets.has(t))} />
                  <FormLabel>{plur(toFirstUpperCase(group), 2)}</FormLabel>
                </FormField>

                <Grid>
                  {targets.map(t => (
                    <CheckboxCard key={t.name}
                      checked={enabledTargets.has(t)}
                      title={t.name + ' (' + t.count + ')'}
                      onToggled={value => onTargetToggled(t, value)} />
                  ))}
                </Grid>
              </Section>
            ))}
          </Card>
        </form>
      </Main>

      <datalist id="namespaces">
        {namespaces.map((ns, i) => (
          <option key={ns.name}>{ns.name}</option>
        ))}
      </datalist>
    </Page>
  )
}
