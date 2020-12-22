import { Stage, Step, Target, Workflow } from '../model/Workflows'
import moment from 'moment'

export class WorkflowDTO {
  scenario?: ScenarioDTO
  workflow?: string
}

export class ScenarioDTO {
  stages?: StageDTO[]
}

export class StageDTO {
  actions?: ActionDTO[]
  duration?: number
}

export class ActionDTO {
  info?: InfoDTO
  target?: TargetDTO
}

export class InfoDTO {
  name?: string
  lethal?: boolean
  affectingNode?: boolean
}

export class TargetDTO {
  pod?: string
  deployment?: string
  node?: string
  mainContainer?: string
  containers?: string[]
  appLabel?: string
  labels?: Map<string, string>
  annotations?: Map<string, string>
}

export function toModel (workflow: WorkflowDTO): Workflow {
  return <Workflow>{
    stages: workflow.scenario?.stages?.map(stage => <Stage>{
      duration: stage.duration ? moment.duration(stage.duration / 1e6, 'milliseconds') : moment.duration(0, 'milliseconds'),
      steps: stage.actions?.map(action => <Step>{
        name: action.info?.name,
        namespace: 'unknown',
        lethal: action.info?.lethal,
        target: <Target>{
          label: action.target?.appLabel,
          kind: action.info?.affectingNode ? 'node' : 'deployment/pod/container',
          namespace: 'unknown'
        },
        parameters: []
      })
    })
  }
}
