import { Workflow } from '../model/Workflows'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function WorkflowPreview (props: {
  workflow: Workflow
}) {
  return (<>
    <ol>
      {props.workflow.stages.map((stage, i) => (
        <li key={i}>
          <span>Duration: {stage.duration.seconds()}s</span>

          <ul>
            {stage.steps.map((step, i) => (
              <li key={i}>
                <p>Name: {step.name}</p>
                <p>Scale: {step.scale}</p>
                <p>Severity: {step.severity}</p>
                <p>Label: {step.target.label}</p>

                <ul>
                  {step.parameters.map((parameter, i) => (
                    <li key={i}>{parameter.name}={parameter.value}</li>
                  ))}
                </ul>

                <CopyToClipboard text={step.manifest}>
                  <button>Copy as YAML</button>
                </CopyToClipboard>
              </li>))}
          </ul>
        </li>
      ))}
    </ol>
  </>)
}
