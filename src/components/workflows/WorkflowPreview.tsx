import { Workflow } from '../../model/Workflows'
import React from 'react'
import './WorkflowPreview.scss'

export default function WorkflowPreview (props: {
  workflow: Workflow
}) {
  return (<>
    <ol className="stages-list">
      {props.workflow.stages.map((stage, i) => (
        <li key={i} className="stage">
          <span className="stage-duration">Duration: {stage.duration.seconds()}s</span>

          <ul className="steps-list">
            {stage.steps.map((step, i) => (
              <li key={i} className="step">
                <p className="step-name">{step.name}</p>

                <div className="step-target">
                  <p className="step-target-name">{step.target.label}</p>
                  <p className="step-target-namespace">{step.target.namespace}</p>
                  <p className="step-target-kind">{step.target.kind}</p>
                </div>

                <ul className="step-parameters-list">
                  {step.parameters.map((parameter, i) => (
                    <li key={i} className="step-parameter">{parameter.name}={parameter.value}</li>
                  ))}
                </ul>
              </li>))}
          </ul>
        </li>
      ))}
    </ol>
  </>)
}
