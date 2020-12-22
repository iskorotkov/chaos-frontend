import React from 'react'
import './ParameterComponent.scss'

class EnvProps {
  name!: string
  value!: string
}

export default class ParameterComponent extends React.Component<EnvProps> {
  render () {
    return (
            <span className="parameter">{this.props.name}={this.props.value}</span>
    )
  }
}
