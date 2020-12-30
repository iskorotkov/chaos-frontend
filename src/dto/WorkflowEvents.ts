import { WorkflowEvent, Stage, Step } from '../model/WorkflowEvents'

export interface StepDTO {
  name?: string,
  type?: string,
  phase?: string,
  startedAt?: Date,
  finishedAt?: Date
}

export interface StageDTO {
  phase?: string,
  startedAt?: Date,
  finishedAt?: Date,
  steps?: StepDTO[]
}

export interface WorkflowEventDTO {
  name?: string,
  namespace?: string,
  type?: string,
  labels?: Map<string, string>,
  phase?: string,
  startedAt?: Date,
  finishedAt?: Date,
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
    finishedAt: dto.finishedAt,
    labels: dto.labels,
    name: dto.name,
    namespace: dto.namespace,
    phase: dto.phase ?? 'Created',
    stages: dto.stages?.map((stage): Stage => {
      if (stage.startedAt === undefined ||
        stage.finishedAt === undefined ||
        stage.phase === undefined ||
        stage.steps === undefined) {
        throw new Error('one of the stage properties was undefined')
      }

      return {
        startedAt: stage.startedAt,
        finishedAt: stage.finishedAt,
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
            startedAt: step.startedAt,
            finishedAt: step.finishedAt
          }
        })
      }
    }) ?? [],
    startedAt: dto.startedAt,
    type: dto.type
  }
}
