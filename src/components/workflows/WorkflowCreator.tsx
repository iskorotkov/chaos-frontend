import React from 'react'

export class Props {
  serverURL!: string
}

export class State {
  seed!: number
  stages!: number
  preview!: string
}

class Request {
  seed!: number
  stages!: number
}

export default class WorkflowCreator extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.handlePreview = this.handlePreview.bind(this)
    this.handleRun = this.handleRun.bind(this)
    this.handleSeed = this.handleSeed.bind(this)
    this.handleStages = this.handleStages.bind(this)
    this.createRequest = this.createRequest.bind(this)
    this.encodeRequest = this.encodeRequest.bind(this)

    this.state = {
      seed: 0,
      stages: 3,
      preview: ''
    }
  }

  private handleSeed (e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      seed: parseInt(e.target.value)
    })
  }

  private handleStages (e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      stages: parseInt(e.target.value)
    })
  }

  // noinspection JSMethodCanBeStatic
  private encodeRequest (request: Request) {
    return `seed=${request.seed}&stages=${request.stages}`
  }

  private async handlePreview (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    try {
      const response = await fetch(`http://${this.props.serverURL}/api/v1/workflows?${this.encodeRequest(this.createRequest())}`)

      if (!response.ok) {
        console.log(response.statusText)
        return
      }

      this.setState({
        preview: await response.text()
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  private createRequest (): Request {
    return {
      seed: this.state.seed,
      stages: this.state.stages
    }
  }

  private async handleRun (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    try {
      const form = new FormData()
      form.append('seed', this.state.seed.toString())
      form.append('stages', this.state.stages.toString())

      const response = await fetch(`http://${this.props.serverURL}/api/v1/workflows`, {
        method: 'POST',
        body: form
      })

      if (!response.ok) {
        console.log(response.statusText)
        return
      }

      this.setState({
        preview: await response.text()
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  render () {
    const preview = this.state.preview !== ''
      ? (<div>
        <pre>{this.state.preview}</pre>
      </div>)
      : (<div>No preview available</div>)

    return (
      <>
        <h1>Create workflow</h1>

        <form>
          <div>
            <label>
              Seed:
              <input name="seed" type="number" value={this.state.seed} onChange={this.handleSeed}/>
            </label>
          </div>

          <div>
            <label>
              Number of stages:
              <input name="stages" type="number" value={this.state.stages} onChange={this.handleStages}/>
            </label>
          </div>

          <div>
            <button onClick={this.handlePreview}>Preview</button>
            <button onClick={this.handleRun}>Run</button>
          </div>

        </form>

        {preview}
      </>
    )
  }
}
