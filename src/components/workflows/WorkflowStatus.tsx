import { WorkflowEvent } from '../../model/WorkflowEvents'
import React from 'react'
import styles from './WorkflowStatus.module.scss'
import classNames from 'classnames'
import MetadataList from './MetadataList'

export default function WorkflowStatus (props: {
  workflow: WorkflowEvent
}) {
  const { workflow } = props

  const formatDate = (date: Date) => date.toLocaleString()

  return (
    <>
      <p>{workflow.namespace}/{workflow.name} - {workflow.phase}</p>
      <p>{formatDate(workflow.startedAt)} - {formatDate(workflow.finishedAt)}</p>

      <MetadataList title={'Labels'} data={workflow.labels}/>
      <MetadataList title={'Annotations'} data={workflow.annotations}/>

      <ol>
        {workflow.stages.map((stage, index) => {
          return (
            <li key={index} className={classNames(styles.stage, {
              [styles.stageSucceeded]: stage.phase === 'Succeeded',
              [styles.stageFailed]: stage.phase === 'Failed'
            })}>
              <p className={styles.stageName}>Stage #{index + 1} - {stage.phase}</p>
              <p className={styles.stageTime}>{formatDate(stage.startedAt)} - {formatDate(stage.finishedAt)}</p>

              <ul className={styles.stepsList}>
                {stage.steps.map(step => {
                  return (
                    <li key={step.name} className={classNames(styles.step, {
                      [styles.stepSucceeded]: step.phase === 'Succeeded',
                      [styles.stepFailed]: step.phase === 'Failed'
                    })}>
                      <p className={styles.stepName}>{step.name} - {step.phase}</p>
                      <p className={styles.stepTime}>{formatDate(step.startedAt)} - {formatDate(step.finishedAt)}</p>
                      <p className={styles.stepType}>{step.type}</p>

                      <MetadataList title={'Labels'} data={step.labels}/>
                      <MetadataList title={'Annotations'} data={step.annotations}/>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ol>
    </>
  )
}
