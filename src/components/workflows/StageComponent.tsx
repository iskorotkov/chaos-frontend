import React from 'react'
import './StageComponent.scss'
import StepComponent from './StepComponent'
import { Step } from '../../model/Workflows'
import moment from 'moment/moment'
import 'moment-duration-format'

export class StageProps {
  steps!: Step[]
  duration!: moment.Duration
}

export default class StageComponent extends React.Component<StageProps> {
  render () {
    const steps = this.props.steps.map((s, i) => (
            <li key={i} className="stage__steps-item">
                <StepComponent name={s.name} namespace={s.namespace} target={s.target}
                               parameters={s.parameters}/>
            </li>))
    return (
            <div className="stage">
                <span className="stage__duration">Duration: {this.props.duration.seconds()}s</span>
                <ul className="stage__steps-list">
                    {steps}
                </ul>
            </div>
    )
  }
}
