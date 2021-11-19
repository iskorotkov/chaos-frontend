import React, { useState } from 'react'
import { CreateWorkflowDTO, PreviewWorkflowDTO, toWorkflow } from '../../dto/Workflows'
import { Workflow } from '../../model/Workflows'
import WorkflowPreview from './WorkflowPreview'
import { useNavigate } from 'react-router'

export default function CreateWorkflowPage (props: {
  server: string
}) {
  const [seed, setSeed] = useState(0)
  const [stages, setStages] = useState(3)
  const [workflow, setWorkflow] = useState(null as Workflow | null)
  const navigate = useNavigate()

  const handleSeedChanged = (e: React.ChangeEvent<HTMLInputElement>) => setSeed(parseInt(e.target.value))
  const handleStagesChanged = (e: React.ChangeEvent<HTMLInputElement>) => setStages(parseInt(e.target.value))

  const url = `http://${props.server}/api/v1/workflows`

  const preview = workflow ? <WorkflowPreview workflow={workflow}/> : null

  function createForm () {
    const params = new URLSearchParams()
    params.append('seed', seed.toString())
    params.append('stages', stages.toString())
    return params
  }

  async function handlePreview (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    try {
      const params = createForm()
      const response = await fetch(`${url}/preview?${params}`)

      if (!response.ok) {
        console.error(`Server returned error: ${response.statusText}`)
        return
      }

      const dto = JSON.parse(await response.text()) as PreviewWorkflowDTO
      if (!dto?.scenario) {
        console.error(`Returned response is invalid: ${await response.text()}`)
        return
      }

      const model = toWorkflow(dto?.scenario)
      setWorkflow(model)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function handleRun (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    try {
      const params = createForm()
      const response = await fetch(`${url}/create`, {
        method: 'POST',
        body: params
      })

      if (!response.ok) {
        console.error(response.statusText)
        return
      }

      const dto = JSON.parse(await response.text()) as CreateWorkflowDTO
      if (!dto?.name || !dto?.namespace) {
        console.error(`Returned response is invalid: ${await response.text()}`)
        return
      }

      navigate(`/${dto.namespace}/${dto.name}`)
    } catch (error: any) {
      console.error(error)
    }
  }

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
