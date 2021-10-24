export interface WorkflowUpdateWatchResponse {
  workflow?: WorkflowUpdateDto
}

export interface WorkflowUpdateDto {
  name?: string,
  namespace?: string,
  type?: string,
  labels?: object,
  annotations?: object,
  phase?: string,
  startedAt?: string,
  finishedAt?: string,
  stages?: StageDto[]
}

export interface StageDto {
  phase?: string,
  startedAt?: string,
  finishedAt?: string,
  steps?: StepDto[]
}

export interface StepDto {
  name?: string,
  type?: string,
  phase?: string,
  labels?: object,
  annotations?: object,
  startedAt?: string,
  finishedAt?: string
}
