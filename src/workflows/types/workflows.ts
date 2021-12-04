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
