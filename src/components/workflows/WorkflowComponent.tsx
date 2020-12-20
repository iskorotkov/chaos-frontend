import Stage from '../../model/workflows/Stage'
import React from 'react'
import StageComponent from './StageComponent'
import './WorkflowComponent.scss'

export class WorkflowProps {
    constructor(public stages: Stage[]) {
    }
}

export default class WorkflowComponent extends React.Component<WorkflowProps> {
    render() {
        let stages = this.props.stages.map((s, i) => (
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
