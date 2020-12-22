import React from 'react'
import WorkflowComponent from './WorkflowComponent'
import { Workflow } from '../../model/Workflows'
import { toModel, WorkflowDTO } from '../../dto/Workflows'

export class Props {
  serverURL!: string
}

export class State {
  seed!: number
  stages!: number
  workflow?: Workflow
}

export default class WorkflowCreator extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.handlePreview = this.handlePreview.bind(this)
    this.handleRun = this.handleRun.bind(this)
    this.handleSeed = this.handleSeed.bind(this)
    this.handleStages = this.handleStages.bind(this)

    this.state = {
      seed: 0,
      stages: 3,
      workflow: undefined
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

  private async handlePreview (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    try {
      const params = new URLSearchParams()
      params.append('seed', this.state.seed.toString())
      params.append('stages', this.state.stages.toString())

      const response = await fetch(`http://${this.props.serverURL}/api/v1/workflows?${params}`)

      if (!response.ok) {
        console.log(response.statusText)
        return
      }

      const dto = JSON.parse(await response.text()) as WorkflowDTO
      const model = toModel(dto)

      this.setState({
        workflow: model
      })
    } catch (error: any) {
      console.log(error)
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
    } catch (error: any) {
      console.log(error)
    }
  }

  render () {
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

        {this.state.workflow
          ? (<WorkflowComponent stages={this.state.workflow.stages}/>)
          : (<></>)}
      </>
    )
  }
}
