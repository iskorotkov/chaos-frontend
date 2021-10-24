export interface WorkflowCreateResponse {
  name?: string
  namespace?: string
}

export interface WorkflowPreviewResponse {
  workflow?: WorkflowDTO
}

export interface WorkflowDTO {
  stages?: StageDto[]
}

export interface StageDto {
  actions?: ActionDto[]
  duration?: number
}

export interface ActionDto {
  name?: string
  severity?: string
  scale?: string
  target?: TargetDto
  engine?: object
}

export interface TargetDto {
  pod?: string
  node?: string
  mainContainer?: string
  containers?: string[]
  appLabel?: string
  labels?: Map<string, string>
  annotations?: Map<string, string>
}
