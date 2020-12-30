import { Workflow } from '../../model/Workflows'
import React from 'react'
import styles from './WorkflowPreview.module.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function WorkflowPreview (props: {
  workflow: Workflow
}) {
  return (<>
    <ol>
      {props.workflow.stages.map((stage, i) => (
        <li key={i} className={styles.stage}>
          <span>Duration: {stage.duration.seconds()}s</span>

          <ul className={styles.stepsList}>
            {stage.steps.map((step, i) => (
              <li key={i} className={styles.step}>
                <p className={styles.stepName}>{step.name}</p>

                <div>
                  <p className={styles.targetName}>{step.target.label}</p>
                  <p className={styles.targetNamespace}>{step.target.namespace}</p>
                  <p className={styles.targetKind}>{step.target.kind}</p>
                </div>

                <ul>
                  {step.parameters.map((parameter, i) => (
                    <li key={i}>{parameter.name}={parameter.value}</li>
                  ))}
                </ul>

                <CopyToClipboard text={step.manifest}>
                  <button className={styles.copyButton}>Copy as YAML</button>
                </CopyToClipboard>
              </li>))}
          </ul>
        </li>
      ))}
    </ol>
  </>)
}
