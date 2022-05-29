import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'
import { SCHEDULER_URL } from '../../config'
import { AddButton, CancelButton, RunButton } from '../../lib/components/Button'
import { Card, CardTitle } from '../../lib/components/Card'
import { FormField, FormLabelFixed } from '../../lib/components/Form'
import { Grid, GridCard } from '../../lib/components/Grid'
import { Input } from '../../lib/components/Input'
import { BackLink } from '../../lib/components/Link'
import { Header, Main, Page, PageName } from '../../lib/components/Page'
import { Section } from '../../lib/components/Section'
import { SelectExpanded } from '../../lib/components/Select'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  addStage,
  addStep,
  removeStage,
  removeStep,
  selectNamespace,
  selectStages,
  setNamespace,
} from '../reducers/editWorkflowForm'
import { Failure } from '../types/failures'
import { Namespace } from '../types/namespaces'
import { Target } from '../types/targets'

const CardContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`

const ActionsRowForPreview = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: space-between;
`

const AddStageButton = styled(AddButton)`
  margin: auto;
  margin-top: 1em;
  width: auto;
  display: block;
`

const RemoveStageButton = styled(CancelButton)`
  width: auto;
  margin: auto;
  margin-bottom: 1em;
  display: block;
`

const AddStepButton = styled(AddButton)`
  width: auto;
`

const RemoveStepButton = styled(CancelButton)`
  width: auto;
`

const StepsGrid = styled(Grid)`
  padding-left: 0;
`

const Select = styled(SelectExpanded)`
  width: 100%;
  margin-bottom: 0.5em;
  text-overflow: ellipsis;
`

export const EditWorkflow = () => {
  const [supportedNamespaces, setSupportedNamespaces] = useState<Namespace[]>()
  const [supportedTargets, setSupportedTargets] = useState<Target[]>()
  const [supportedFailures, setSupportedFailures] = useState<Failure[]>()

  const namespace = useAppSelector(selectNamespace)
  const stages = useAppSelector(selectStages)
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios(`${SCHEDULER_URL}/api/v1/targets`)
      .then((res) => res.data as Target[])
      .then((targets) => {
        setSupportedTargets(targets)
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

  const handleAddStage = useCallback(
    () =>
      dispatch(
        addStage({
          id: v4(),
          steps: [],
        }),
      ),
    [dispatch],
  )

  const handleRemoveStage = useCallback(
    (id: string) => () => dispatch(removeStage(id)),
    [dispatch],
  )

  const handleAddStep = useCallback(
    (stageId: string) => () =>
      dispatch(
        addStep([
          stageId,
          {
            id: Math.random().toString(),
            failure: {} as Failure,
            target: {} as Target,
          },
        ]),
      ),
    [dispatch],
  )

  const handleRemoveStep = useCallback(
    (stageId: string) => () => dispatch(removeStep(stageId)),
    [dispatch],
  )

  const handleSubmit = useCallback(() => {
    throw new Error('Not implemented')
  }, [])

  return (
    <Page>
      {supportedNamespaces && (
        <datalist id='namespaces'>
          {supportedNamespaces.map((namespace) => (
            <option key={namespace.id} value={namespace.id}>
              {namespace.name}
            </option>
          ))}
        </datalist>
      )}

      <Header>
        <PageName>Chaos Framework / Edit workflow</PageName>
      </Header>

      <Main>
        <ActionsRowForPreview>
          <BackLink href='/create'>
            <i className='fas fa-arrow-left' /> Back
          </BackLink>
          <RunButton onClick={handleSubmit}>
            Run <i className='fas fa-caret-right' />
          </RunButton>
        </ActionsRowForPreview>

        <Card>
          <CardTitle>Stages</CardTitle>

          <FormField>
            <FormLabelFixed htmlFor='namespace-input'>Namespace</FormLabelFixed>
            <Input
              id='namespace-input'
              type='text'
              required
              list='namespaces'
              value={namespace}
              placeholder='select namespace...'
              onChange={(e) => console.log(e)}
            />
          </FormField>

          {stages.map((stage) => (
            <Section key={stage.id}>
              <StepsGrid>
                {stage.steps.map((step) => (
                  <GridCard key={step.id}>
                    <CardContent>
                      {supportedTargets && (
                        <Select>
                          {supportedTargets.map((target) => (
                            <option key={target.id} value={target.id}>
                              {target.name} ({target.count})
                            </option>
                          ))}
                        </Select>
                      )}

                      {supportedFailures && (
                        <Select>
                          {supportedFailures.map((failure) => (
                            <option key={failure.id} value={failure.id}>
                              {failure.name} ({failure.scale} /{' '}
                              {failure.severity})
                            </option>
                          ))}
                        </Select>
                      )}

                      <RemoveStepButton onClick={handleRemoveStep(step.id)}>
                        Remove step
                      </RemoveStepButton>
                    </CardContent>
                  </GridCard>
                ))}

                <AddStepButton onClick={handleAddStep(stage.id)}>
                  + Add a step
                </AddStepButton>
              </StepsGrid>

              <RemoveStageButton onClick={handleRemoveStage(stage.id)}>
                Remove stage
              </RemoveStageButton>
            </Section>
          ))}

          <Section>
            <AddStageButton onClick={handleAddStage}>
              + Add a stage
            </AddStageButton>
          </Section>
        </Card>
      </Main>
    </Page>
  )
}
