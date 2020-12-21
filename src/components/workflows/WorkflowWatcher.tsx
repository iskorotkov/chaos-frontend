import React from 'react'
import { Link } from 'react-router-dom'

export class Props {
  serverURL!: string
}

export class State {
  status!: string
  link!: string
}

export default class WorkflowWatcher extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      link: '',
      status: ''
    }
  }

  private openWS () {
    const values = window.location.href.split('/')

    const host = values[2]
    const namespace = values[values.length - 2]
    const name = values[values.length - 1]

    const ws = new WebSocket(`ws://${host}/api/v1/workflows/${namespace}/${name}`)

    window.addEventListener('beforeunload', () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close()
      }
    })

    ws.addEventListener('message', e => {
      console.log(e.data)
    })
  }

  render () {
    return (
      <>
        <h1>Success</h1>

        <p>Generated workflow was successfully submitted.</p>

        <ul>
          {this.state.status}
        </ul>

        <div>
          <Link to={this.state.link}>See workflow progress</Link>
        </div>

        <div>
          <Link to="/workflows">Go back to workflows page</Link>
        </div>

        <div>
          <Link to="/">Go back to home page</Link>
        </div>
      </>
    )
  }
}
