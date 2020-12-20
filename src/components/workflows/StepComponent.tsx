import React from 'react'
import TargetComponent from './TargetComponent'
import EnvComponent from './EnvComponent'
import Target from '../../model/workflows/Target'
import Env from '../../model/workflows/Env'
import './StepComponent.scss'

export class StepProps {
  constructor (public name: string, public namespace: string, public target: Target, public env: Env[]) {
  }
}

export default class StepComponent extends React.Component<StepProps> {
  render () {
    const envVariables = this.props.env.map((e, i) => (
            <li key={i} className="step__env-item">
                <EnvComponent name={e.name} value={e.value}/>
            </li>
    ))
    return (
            <div className="step">
                <p className="step__name">{this.props.name}</p>
                <p className="step__namespace">{this.props.namespace}</p>
                <TargetComponent namespace={this.props.target.namespace} kind={this.props.target.kind}
                                 label={this.props.target.label}/>
                <ul className="step__env-list">{envVariables}</ul>
            </div>
    )
  }
}
