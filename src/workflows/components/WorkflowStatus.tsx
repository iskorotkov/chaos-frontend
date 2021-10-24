import { WorkflowEvent } from '../model/WorkflowEvents'
import React from 'react'
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
            <li key={index}>
              <p>Stage #{index + 1} - {stage.phase}</p>
              <p>{formatDate(stage.startedAt)} - {formatDate(stage.finishedAt)}</p>

              <ul>
                {stage.steps.map(step => {
                  return (
                    <li key={step.name}>
                      <p>{step.name} - {step.phase}</p>
                      <p>{formatDate(step.startedAt)} - {formatDate(step.finishedAt)}</p>
                      <p>{step.type}</p>

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
