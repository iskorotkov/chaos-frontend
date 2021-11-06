// Preview.

import { Target } from './targets'
import { Failure } from './failures'

export interface WorkflowPreview {
  stages: StagePreview[]
}

export interface StagePreview {
  actions: ActionPreview[]
  duration: number
}

export interface ActionPreview extends Failure {
  target: Target
}

// Running.

export interface RunningWorkflow {
  name: string
  namespace: string
  status: string
  startedAt: Date
  finishedAt: Date
  stages: RunningStage[]
}

export interface RunningStage {
  status: string
  duration: number
  startedAt: Date
  finishedAt: Date
  actions: RunningAction[]
}

export interface RunningAction extends Failure {
  target: Target
  status: string
  startedAt: Date
  finishedAt: Date
}

// Status.

export interface WorkflowStatus {
  name: string
  namespace: string
  status: string
  startedAt: Date
  finishedAt: Date
}
