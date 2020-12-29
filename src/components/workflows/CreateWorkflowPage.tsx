import React, { useState } from 'react'
import { CreateWorkflowDTO, PreviewWorkflowDTO, toWorkflow } from '../../dto/Workflows'
import { Workflow } from '../../model/Workflows'
import WorkflowPreview from './WorkflowPreview'
import { useHistory } from 'react-router'

export default function CreateWorkflowPage (props: {
  serverURL: string
}) {
  const [seed, setSeed] = useState(0)
  const [stages, setStages] = useState(3)
  const [workflow, setWorkflow] = useState(null as Workflow | null)
  const history = useHistory()

  const handleSeedChanged = (e: React.ChangeEvent<HTMLInputElement>) => setSeed(parseInt(e.target.value))
  const handleStagesChanged = (e: React.ChangeEvent<HTMLInputElement>) => setStages(parseInt(e.target.value))

  function createForm () {
    const params = new URLSearchParams()
    params.append('seed', seed.toString())
    params.append('stages', stages.toString())
    return params
  }

  const serverAddress = () => `http://${props.serverURL}/api/v1/workflows`

  async function handlePreview (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    try {
      const params = createForm()
      const response = await fetch(`${serverAddress()}?${params}`)

      if (!response.ok) {
        console.log(response.statusText)
        return
      }

      const dto = JSON.parse(await response.text()) as PreviewWorkflowDTO
      const model = toWorkflow(dto?.scenario)

      setWorkflow(model)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function handleRun (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    try {
      const params = createForm()
      const response = await fetch(serverAddress(), {
        method: 'POST',
        body: params
      })

      if (!response.ok) {
        console.log(response.statusText)
        return
      }

      const dto = JSON.parse(await response.text()) as CreateWorkflowDTO

      history.push(`/workflows/${dto.namespace}/${dto.name}`)
    } catch (error: any) {
      console.log(error)
    }
  }

  const preview = workflow ? <WorkflowPreview workflow={workflow}/> : null

  return (
    <>
      <h1>Create workflow</h1>

      <form>
        <div>
          <label>Seed: <input name="seed" type="number" value={seed} onChange={handleSeedChanged}/></label>
        </div>

        <div>
          <label>Number of stages: <input name="stages" type="number" value={stages}
                                          onChange={handleStagesChanged}/></label>
        </div>

        <div>
          <button onClick={handlePreview}>Preview</button>
          <button onClick={handleRun}>Run</button>
        </div>

      </form>

      {preview}
    </>
  )
}
