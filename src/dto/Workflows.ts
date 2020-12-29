import { Workflow } from '../model/Workflows'
import moment from 'moment/moment'

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

/* eslint-enable no-unused-vars */

export function toWorkflow (dto?: WorkflowDTO): Workflow {
  if (!dto?.stages) {
    throw new Error('scenario stages were not provided')
  }

  return {
    stages: dto.stages.map(stage => {
      if (stage.actions === undefined || stage.duration === undefined) {
        throw new Error('stage actions and/or duration was/were not provided')
      }

      return {
        duration: moment.duration(stage.duration / 1e6, 'milliseconds'),
        steps: stage.actions.map(action => {
          if (action.info?.name === undefined || action.info.lethal === undefined) {
            throw new Error('action info was not provided')
          }

          if (action.target?.appLabel === undefined) {
            throw new Error('action target was not provided')
          }

          return {
            name: action.info.name,
            lethal: action.info.lethal,
            target: {
              label: action.target.appLabel,
              kind: action.info.affectingNode ? 'node' : 'deployment/pod/container',
              namespace: 'unknown'
            },
            parameters: []
          }
        })
      }
    })
  }
}
