import { Stage, Step, Target, Workflow } from '../model/Workflows'
import moment from 'moment'

export interface WorkflowDTO {
  scenario?: ScenarioDTO
  workflow?: string
}

export interface ScenarioDTO {
  stages?: StageDTO[]
}

export interface StageDTO {
  actions?: ActionDTO[]
  duration?: number
}

export interface ActionDTO {
  info?: InfoDTO
  target?: TargetDTO
}

export interface InfoDTO {
  name?: string
  lethal?: boolean
  affectingNode?: boolean
}

export interface TargetDTO {
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
    stages: workflow.scenario?.stages?.map(stage => {
      const duration = stage.duration
        ? moment.duration(stage.duration / 1e6, 'milliseconds')
        : moment.duration(0, 'milliseconds')

      return <Stage>{
        duration: duration,
        steps: stage.actions?.map(action => <Step>{
          name: action.info?.name,
          lethal: action.info?.lethal,
          target: <Target>{
            label: action.target?.appLabel,
            kind: action.info?.affectingNode ? 'node' : 'deployment/pod/container',
            namespace: 'unknown'
          },
          parameters: []
        })
      }
    })
  }
}
