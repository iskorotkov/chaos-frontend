import { Header, Main, Page, PageName } from '../../lib/components/Page'
import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { RefreshButton, RunButton } from '../../lib/components/Button'
import { Input } from '../../lib/components/Input'
import { Card, CardTitle } from '../../lib/components/Card'
import {
  CompactFormField,
  CompactFormLabel,
  FormField,
  FormLabel,
  FormLabelFixed,
  FormLabelMuted,
  FormVerticalBlock,
} from '../../lib/components/Form'
import { Checkbox } from '../../lib/components/Checkbox'
import { Section } from '../../lib/components/Section'
import { Grid, GridCard } from '../../lib/components/Grid'
import { Target } from '../types/targets'
import { Namespace } from '../types/namespaces'
import { Failure } from '../types/failures'
import { SCHEDULER_URL } from '../../config'
import axios from 'axios'
import { BackLink, PreviewLink } from '../../lib/components/Link'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  addFailureById,
  addTargetById,
  removeFailureById,
  removeTargetById,
  Seeds,
  selectCreateWorkflowForm,
  selectFailures,
  selectNamespace,
  selectSeeds,
  selectStages,
  selectTargets,
  setFailuresById,
  setNamespace,
  setSeeds,
  setStages,
  setTargetsIds,
  Stages,
} from '../reducers/createWorkflowForm'
import { useHistory } from 'react-router'
import { LoadingInline } from '../../lib/components/Loading'

const stagesRange = {
  min: 0,
  max: 100,
}

const ActionsRow = styled.div`
  display: flex;
  gap: 0.5em;
`

const ActionsRowGroup = styled.div`
  margin-right: auto;
`

const StagesNumberField = styled(Input).attrs(() => ({
  type: 'number',
  min: stagesRange.min,
  max: stagesRange.max,
}))``

const CheckboxCard = (props: {
  checked: boolean
  title: string
  // eslint-disable-next-line no-unused-vars
  onToggled: (value: boolean) => void
}) => (
  <GridCard>
    <CompactFormField>
      <Checkbox checked={props.checked} onToggled={props.onToggled} />
      <CompactFormLabel>{props.title}</CompactFormLabel>
    </CompactFormField>
  </GridCard>
)

const clamp = (x: number, min: number, max: number) =>
  x < min ? min : x > max ? max : x

export const WorkflowsCreationForm = () => {
  const [supportedTargets, setSupportedTargets] = useState<Target[]>()
  const [supportedFailures, setSupportedFailures] = useState<Failure[]>()
  const [supportedNamespaces, setSupportedNamespaces] = useState<Namespace[]>()

  const seeds = useAppSelector(selectSeeds)
  const namespace = useAppSelector(selectNamespace)
  const stages = useAppSelector(selectStages)
  const enabledTargets = useAppSelector(selectTargets)
  const enabledFailures = useAppSelector(selectFailures)
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios(`${SCHEDULER_URL}/api/v1/targets`)
      .then((res) => res.data as Target[])
      .then((targets) => {
        setSupportedTargets(targets)

        let intersected = enabledTargets.filter(
          (_) => targets.findIndex((__) => __.id === _) !== -1,
        )
        if (intersected.length === 0) {
          intersected = targets.map((_) => _.id)
        }

        dispatch(setTargetsIds(intersected))
      })
      .catch((e) => {
        console.error(e)
        alert('Error getting targets')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios(`${SCHEDULER_URL}/api/v1/failures`)
      .then((res) => res.data as Failure[])
      .then((failures) => {
        setSupportedFailures(failures)

        let intersected = enabledFailures.filter(
          (_) => failures.findIndex((__) => __.id === _) !== -1,
        )
        if (intersected.length === 0) {
          intersected = failures.map((_) => _.id)
        }

        dispatch(setFailuresById(intersected))
      })
      .catch((e) => {
        console.error(e)
        alert('Error getting failures')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios(`${SCHEDULER_URL}/api/v1/namespaces`)
      .then((res) => res.data as Namespace[])
      .then((namespaces) => {
        setSupportedNamespaces(namespaces)
        if (
          namespaces.length === 1 ||
          namespaces.findIndex((_) => _.name === namespace) === -1
        ) {
          dispatch(setNamespace(namespaces[0].name))
        }
      })
      .catch((e) => {
        console.error(e)
        alert('Error getting namespaces')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const groupedTargets = new Map<string, Target[]>()
  if (supportedTargets) {
    for (const target of supportedTargets) {
      const group = groupedTargets.get(target.type)
      if (group) {
        group.push(target)
      } else {
        groupedTargets.set(target.type, [target])
      }
    }
  }

  const groupedFailures = new Map<string, Failure[]>()
  if (supportedFailures) {
    for (const failure of supportedFailures) {
      const group = groupedFailures.get(failure.type)
      if (group) {
        group.push(failure)
      } else {
        groupedFailures.set(failure.type, [failure])
      }
    }
  }

  const randomizeSeed = (key: keyof Seeds) =>
    dispatch(
      setSeeds({
        ...seeds,
        [key]: Math.floor(Math.random() * 1_000_000),
      }),
    )

  const onSeedChanged = (e: ChangeEvent, key: keyof Seeds) => {
    const value = (e.target as HTMLInputElement).value
    dispatch(
      setSeeds({
        ...seeds,
        [key]: value.match(/[0-9]+/) ? parseInt(value) : 0,
      }),
    )
  }

  const onStageCountChanged = (e: ChangeEvent, key: keyof Stages) => {
    const value = (e.target as HTMLInputElement).value
    dispatch(
      setStages({
        ...stages,
        [key]: value.match(/[0-9]+/)
          ? clamp(parseInt(value), stagesRange.min, stagesRange.max)
          : 0,
      }),
    )
  }

  const onFailureToggled = (failure: Failure, value: boolean) =>
    dispatch(value ? addFailureById(failure.id) : removeFailureById(failure.id))

  const onTargetToggled = (target: Target, value: boolean) =>
    dispatch(value ? addTargetById(target.id) : removeTargetById(target.id))

  const onFailureGroupToggled = (group: string, failures: Failure[]) => {
    for (const failure of failures) {
      onFailureToggled(
        failure,
        !failures.every((f) => enabledFailures.some((_) => _ === f.id)),
      )
    }
  }

  const onTargetGroupToggled = (group: string, targets: Target[]) => {
    for (const target of targets) {
      onTargetToggled(
        target,
        !targets.every((t) => enabledTargets.some((_) => _ === t.id)),
      )
    }
  }

  const history = useHistory()
  const createWorkflowForm = useAppSelector(selectCreateWorkflowForm)
  const onRun = () => {
    axios(`${SCHEDULER_URL}/api/v1/workflows`, {
      method: 'POST',
      data: createWorkflowForm,
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
        <PageName>Chaos Framework / Create a new workflow</PageName>
      </Header>

      <Main>
        <ActionsRow>
          <ActionsRowGroup>
            <BackLink href='/'>
              <i className='fas fa-arrow-left' /> Back
            </BackLink>
          </ActionsRowGroup>
          <PreviewLink href='/preview'>
            Preview <i className='fas fa-search' />
          </PreviewLink>
          <RunButton onClick={onRun}>
            Run <i className='fas fa-caret-right' />
          </RunButton>
        </ActionsRow>

        <form>
          <Card>
            <CardTitle>Settings</CardTitle>

            <FormField>
              <FormLabelFixed htmlFor='namespace-input'>
                Namespace
              </FormLabelFixed>
              <Input
                id='namespace-input'
                type='text'
                required
                list='namespaces'
                value={namespace}
                placeholder='select namespace...'
                onChange={(e) =>
                  dispatch(setNamespace((e.target as HTMLInputElement).value))
                }
              />
            </FormField>

            <FormField>
              <FormLabelFixed htmlFor='random-seed-input'>
                Random seed for targets
              </FormLabelFixed>
              <Input
                id='random-seed-input'
                type='number'
                value={seeds.targets}
                min={0}
                onChange={(e) => onSeedChanged(e, 'targets')}
              />

              <RefreshButton onClick={() => randomizeSeed('targets')}>
                Random <i className='fas fa-sync' />
              </RefreshButton>
            </FormField>

            <FormField>
              <FormLabelFixed htmlFor='random-seed-input'>
                Random seed for failures
              </FormLabelFixed>
              <Input
                id='random-seed-input'
                type='number'
                value={seeds.failures}
                min={0}
                onChange={(e) => onSeedChanged(e, 'failures')}
              />

              <RefreshButton onClick={() => randomizeSeed('failures')}>
                Random <i className='fas fa-sync' />
              </RefreshButton>
            </FormField>

            <FormField>
              <FormLabelFixed>Number of stages</FormLabelFixed>

              <FormVerticalBlock>
                <StagesNumberField
                  id='stages-with-single-failure-input'
                  value={stages.single}
                  min={0}
                  onChange={(e) => onStageCountChanged(e, 'single')}
                />
                <FormLabelMuted htmlFor='stages-with-single-failure-input'>
                  stages with single failure
                </FormLabelMuted>
              </FormVerticalBlock>

              <FormVerticalBlock>
                <StagesNumberField
                  id='stages-with-similar-failures-input'
                  value={stages.similar}
                  min={0}
                  onChange={(e) => onStageCountChanged(e, 'similar')}
                />
                <FormLabelMuted htmlFor='stages-with-similar-failures-input'>
                  stages with similar failures
                </FormLabelMuted>
              </FormVerticalBlock>

              <FormVerticalBlock>
                <StagesNumberField
                  id='stages-with-mixed-failures-input'
                  value={stages.mixed}
                  min={0}
                  onChange={(e) => onStageCountChanged(e, 'mixed')}
                />
                <FormLabelMuted htmlFor='stages-with-mixed-failures-input'>
                  stages with mixed failures
                </FormLabelMuted>
              </FormVerticalBlock>
            </FormField>
          </Card>

          {!supportedFailures ? (
            <LoadingInline text='Loading failures...' />
          ) : (
            <Card>
              <CardTitle>Failures</CardTitle>

              {Array.from(groupedFailures.entries()).map(
                ([group, failures]) => (
                  <Section key={group}>
                    <FormField>
                      <Checkbox
                        checked={failures.every((f) =>
                          enabledFailures.some((_) => _ === f.id),
                        )}
                        onToggled={() => onFailureGroupToggled(group, failures)}
                        indeterminate={
                          !failures.every((f) =>
                            enabledFailures.some((_) => _ === f.id),
                          ) &&
                          failures.some((f) =>
                            enabledFailures.some((_) => _ === f.id),
                          )
                        }
                      />
                      <FormLabel>{group}</FormLabel>
                    </FormField>

                    <Grid>
                      {failures.map((f) => (
                        <CheckboxCard
                          key={f.id}
                          checked={enabledFailures.some((_) => _ === f.id)}
                          title={
                            f.name + ' (' + f.scale + ' / ' + f.severity + ')'
                          }
                          onToggled={(value) => onFailureToggled(f, value)}
                        />
                      ))}
                    </Grid>
                  </Section>
                ),
              )}
            </Card>
          )}

          {!supportedTargets ? (
            <LoadingInline text='Loading targets...' />
          ) : (
            <Card>
              <CardTitle>Targets</CardTitle>

              {Array.from(groupedTargets.entries()).map(([group, targets]) => (
                <Section key={group}>
                  <FormField>
                    <Checkbox
                      checked={targets.every((t) =>
                        enabledTargets.some((_) => _ === t.id),
                      )}
                      onToggled={() => onTargetGroupToggled(group, targets)}
                      indeterminate={
                        !targets.every((t) =>
                          enabledTargets.some((_) => _ === t.id),
                        ) &&
                        targets.some((t) =>
                          enabledTargets.some((_) => _ === t.id),
                        )
                      }
                    />
                    <FormLabel>{group}</FormLabel>
                  </FormField>

                  <Grid>
                    {targets.map((t) => (
                      <CheckboxCard
                        key={t.id}
                        checked={enabledTargets.some((_) => _ === t.id)}
                        title={t.name + ' (' + t.count + ')'}
                        onToggled={(value) => onTargetToggled(t, value)}
                      />
                    ))}
                  </Grid>
                </Section>
              ))}
            </Card>
          )}
        </form>
      </Main>

      {supportedNamespaces && (
        <datalist id='namespaces'>
          {supportedNamespaces.map((ns) => (
            <option key={ns.name}>{ns.name}</option>
          ))}
        </datalist>
      )}
    </Page>
  )
}
