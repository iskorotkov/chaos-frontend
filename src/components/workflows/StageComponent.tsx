import Step from '../../model/workflows/Step'
import React from 'react'
import './StageComponent.scss'
import StepComponent from './StepComponent'

export class StageProps {
    constructor(public steps: Step[], public duration: Date) {
    }
}

export default class StageComponent extends React.Component<StageProps> {
    render() {
        let steps = this.props.steps.map(s => (
            <li key={s.name} className="stage__steps-item">
                <StepComponent name={s.name} namespace={s.namespace} target={s.target}
                               env={s.env}/>
            </li>))
        return (
            <div className="stage">
                <span className="stage__duration">Duration: {this.props.duration.toTimeString()}</span>
                <ul className="stage__steps-list">
                    {steps}
                </ul>
            </div>
        )
    }
}
