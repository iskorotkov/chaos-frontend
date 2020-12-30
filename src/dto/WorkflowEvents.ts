import { Stage, Step, WorkflowEvent } from '../model/WorkflowEvents'

export interface StepDTO {
  name?: string,
  type?: string,
  phase?: string,
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
  phase?: string,
  startedAt?: string,
  finishedAt?: string,
  stages?: StageDTO[]
}

export function toWorkflowEvent (dto: WorkflowEventDTO): WorkflowEvent {
  if (dto.type === undefined ||
    dto.startedAt === undefined ||
    dto.namespace === undefined ||
    dto.name === undefined ||
    dto.labels === undefined ||
    dto.finishedAt === undefined) {
    throw new Error('one of the event properties was undefined')
  }

  return {
    name: dto.name,
    namespace: dto.namespace,
    phase: dto.phase ?? 'Created',
    startedAt: new Date(dto.startedAt),
    finishedAt: new Date(dto.finishedAt),
    labels: new Map<string, string>(Object.entries(dto.labels)),
    type: dto.type,
    stages: dto.stages?.map((stage): Stage => {
      if (stage.startedAt === undefined ||
        stage.finishedAt === undefined ||
        stage.phase === undefined ||
        stage.steps === undefined) {
        throw new Error('one of the stage properties was undefined')
      }

      return {
        startedAt: new Date(stage.startedAt),
        finishedAt: new Date(stage.finishedAt),
        phase: stage.phase,
        steps: stage.steps.map((step): Step => {
          if (step.name === undefined ||
            step.type === undefined ||
            step.phase === undefined ||
            step.startedAt === undefined ||
            step.finishedAt === undefined) {
            throw new Error('one of the step properties was undefined')
          }

          return {
            name: step.name,
            type: step.type,
            phase: step.phase,
            startedAt: new Date(step.startedAt),
            finishedAt: new Date(step.finishedAt)
          }
        })
      }
    }) ?? []
  }
}
