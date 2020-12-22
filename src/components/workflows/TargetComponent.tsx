import React from 'react'
import './TargetComponent.scss'

export class TargetProps {
  label!: string
  namespace!: string
  kind!: string
}

export default class TargetComponent extends React.Component<TargetProps> {
  render () {
    return (
            <div className="target">
                <p className="target__label">{this.props.label}</p>
                <p className="target__namespace">{this.props.namespace}</p>
                <p className="target__kind">{this.props.kind}</p>
            </div>
    )
  }
}
