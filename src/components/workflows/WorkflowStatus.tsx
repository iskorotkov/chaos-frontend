import { WorkflowEvent } from '../../model/WorkflowEvents'
import React from 'react'
import styles from './WorkflowStatus.module.scss'

export default function WorkflowStatus (props: {
  workflow: WorkflowEvent
}) {
  const { workflow } = props

  const formatDate = (date: Date) => date.toLocaleString()

  return (
    <>
      <p>{workflow.namespace}/{workflow.name} - {workflow.phase}</p>
      <p>{formatDate(workflow.startedAt)} - {formatDate(workflow.finishedAt)}</p>

      <ul>
        {Array.from(workflow.labels.entries()).map(([key, value]) => {
          return (
            <li key={key} className={styles.label}>{key}: {value}</li>
          )
        })}
      </ul>

      <ul>
        {workflow.stages.map((stage, index) => {
          return (
            <li key={index} className={styles.stage}>
              <p className={styles.stageName}>Stage #{index} - {stage.phase}</p>
              <p className={styles.stageTime}>{formatDate(stage.startedAt)} - {formatDate(stage.finishedAt)}</p>

              <ul className={styles.stepsList}>
                {stage.steps.map(step => {
                  return (
                    <li key={step.name} className={styles.step}>
                      <p className={styles.stepName}>{step.name} - {step.phase}</p>
                      <p className={styles.stepTime}>{formatDate(step.startedAt)} - {formatDate(step.finishedAt)}</p>
                      <p className={styles.stepType}>{step.type}</p>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </>
  )
}
