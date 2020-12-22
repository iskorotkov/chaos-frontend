import React from 'react'
import TargetComponent from './TargetComponent'
import ParameterComponent from './ParameterComponent'
import './StepComponent.scss'
import { Parameter, Target } from '../../model/Workflows'

export class StepProps {
  name!: string
  namespace!: string
  target!: Target
  parameters!: Parameter[]
}

export default class StepComponent extends React.Component<StepProps> {
  render () {
    const parameters = this.props.parameters.map((e, i) => (
            <li key={i} className="step__env-item">
                <ParameterComponent name={e.name} value={e.value}/>
            </li>
    ))
    return (
            <div className="step">
                <p className="step__name">{this.props.name}</p>
                <p className="step__namespace">{this.props.namespace}</p>
                <TargetComponent namespace={this.props.target.namespace} kind={this.props.target.kind}
                                 label={this.props.target.label}/>
                <ul className="step__env-list">{parameters}</ul>
            </div>
    )
  }
}
