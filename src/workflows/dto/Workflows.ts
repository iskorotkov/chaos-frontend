import { Workflow } from '../model/Workflows'
import moment from 'moment/moment'
import YAML from 'yaml'

/* eslint-disable no-unused-vars */
export interface PreviewWorkflowDTO {
  scenario?: WorkflowDTO
}

export interface CreateWorkflowDTO {
  name?: string
  namespace?: string
}

export interface WorkflowDTO {
  stages?: StageDTO[]
}

export interface StageDTO {
  actions?: ActionDTO[]
  duration?: number
}

export interface ActionDTO {
  name?: string
  severity?: string
  scale?: string
  target?: TargetDTO
  engine?: object
}

export interface TargetDTO {
  pod?: string
  node?: string
  mainContainer?: string
  containers?: string[]
  appLabel?: string
  labels?: Map<string, string>
  annotations?: Map<string, string>
}

/* eslint-enable no-unused-vars */

export function toWorkflow (dto: WorkflowDTO): Workflow {
  return {
    stages: dto.stages?.map(stage => {
      return {
        duration: moment.duration((stage.duration ?? 0) / 1e6, 'milliseconds'),
        steps: stage.actions?.map(action => {
          return {
            name: action.name ?? '-',
            severity: action.severity ?? '-',
            scale: action.scale ?? '-',
            manifest: YAML.stringify(action.engine ?? ''),
            target: {
              label: action.target?.appLabel ?? '-'
            },
            parameters: []
          }
        }) ?? []
      }
    }) ?? []
  }
}
