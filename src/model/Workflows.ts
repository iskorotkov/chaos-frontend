import moment from 'moment/moment'

export interface Workflow {
  stages: Stage[]
}

export interface Stage {
  steps: Step[]
  duration: moment.Duration
}

export interface Step {
  name: string
  severity: string
  scale: string
  target: Target
  parameters: Parameter[]
  manifest: string
}

export interface Target {
  label: string
}

export interface Parameter {
  name: string
  value: string
}
