import React from 'react'
import './EnvComponent.scss'

class EnvProps {
  constructor (public name: string, public value: string) {
  }
}

export default class EnvComponent extends React.Component<EnvProps> {
  render () {
    return (
            <span className="env">{this.props.name}={this.props.value}</span>
    )
  }
}
