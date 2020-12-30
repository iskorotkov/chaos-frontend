export interface Step {
  name: string,
  type: string,
  phase: string,
  startedAt: Date,
  finishedAt: Date
}

export interface Stage {
  phase: string,
  startedAt: Date,
  finishedAt: Date,
  steps: Step[]
}

export interface WorkflowEvent {
  name: string,
  namespace: string,
  type: string,
  labels: Map<string, string>,
  phase: string,
  startedAt: Date,
  finishedAt: Date,
  stages: Stage[]
}
