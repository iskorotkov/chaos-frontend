import { Stage, Step, WorkflowEvent } from '../model/WorkflowEvents'

export interface StepDTO {
  name?: string,
  type?: string,
  phase?: string,
  labels?: object,
  annotations?: object,
  startedAt?: string,
  finishedAt?: string
}

export interface StageDTO {
  phase?: string,
  startedAt?: string,
  finishedAt?: string,
  steps?: StepDTO[]
}

export interface WorkflowEventDTO {
  name?: string,
  namespace?: string,
  type?: string,
  labels?: object,
  annotations?: object,
  phase?: string,
  startedAt?: string,
  finishedAt?: string,
  stages?: StageDTO[]
}

export function toWorkflowEvent (dto: WorkflowEventDTO): WorkflowEvent {
  return {
    name: dto.name ?? '-',
    namespace: dto.namespace ?? '-',
    phase: dto.phase ?? 'Created',
    startedAt: new Date(dto.startedAt ?? Date.now()),
    finishedAt: new Date(dto.finishedAt ?? Date.now()),
    labels: new Map<string, string>(Object.entries(dto.labels ?? {})),
    annotations: new Map<string, string>(Object.entries(dto.annotations ?? {})),
    type: dto.type ?? '-',
    stages: dto.stages?.map((stage): Stage => {
      return {
        startedAt: new Date(stage.startedAt ?? Date.now()),
        finishedAt: new Date(stage.finishedAt ?? Date.now()),
        phase: stage.phase ?? '-',
        steps: stage.steps?.map((step): Step => {
          return {
            name: step.name ?? '-',
            type: step.type ?? '-',
            phase: step.phase ?? '-',
            labels: new Map<string, string>(Object.entries(step.labels ?? {})),
            annotations: new Map<string, string>(Object.entries(step.annotations ?? {})),
            startedAt: new Date(step.startedAt ?? Date.now()),
            finishedAt: new Date(step.finishedAt ?? Date.now())
          }
        }) ?? []
      }
    }) ?? []
  }
}
