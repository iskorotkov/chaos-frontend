export type Status = 'running' | 'pending' | 'succeeded' | 'failed' | 'error' | 'cancelled'

export type Workflow = {
  name: string
  namespace: string
  startedAt: string
  finishedAt: string
  type?: string
  status: Status
  stages: Stage[]
}

export type Stage = {
  status: Status
  startedAt: string
  finishedAt: string
  steps: Step[]
}

export type Step = {
  name: string
  type: string
  severity: string
  scale: string
  status: Status
  version: string
  startedAt: string
  finishedAt: string
}

export type WorkflowPreview = {
  namespace: string
  stages: StagePreview[]
}

export type StagePreview = {
  steps: StepPreview[]
}

export type StepPreview = {
  name: string
  type: string
  severity: string
  scale: string
  engine: Engine
  target: Target
}

export type Engine = {
  apiVersion: string
  kind: string
}

export type Target = {
  pod: string
  node: string
  mainContainer: string
  containers: string[]
  appLabel: string
  appLabelValue: string
  labels: string[]
  annotations: string[]
}
