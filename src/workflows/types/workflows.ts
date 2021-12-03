export type Workflow = {
  name: string
  namespace: string
  startedAt: string
  finishedAt: string
  type?: string
  status: string
  stages: Stage[]
}

export type Stage = {
  status: string
  startedAt: string
  finishedAt: string
  steps: Step[]
}

export type Step = {
  name: string
  type: string
  severity: string
  scale: string
  status: string
  version: string
  startedAt: string
  finishedAt: string
}
