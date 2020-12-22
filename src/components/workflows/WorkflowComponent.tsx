import React from 'react'
import StageComponent from './StageComponent'
import './WorkflowComponent.scss'
import { Stage } from '../../model/Workflows'

export class WorkflowProps {
  stages!: Stage[]
}

export default class WorkflowComponent extends React.Component<WorkflowProps> {
  render () {
    const stages = this.props.stages.map((s, i) => (
            <li key={i} className="workflow__item">
                <StageComponent duration={s.duration} steps={s.steps}/>
            </li>
    ))
    return (
            <ol className="workflow">
                {stages}
            </ol>
    )
  }
}
