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
  lethal: boolean
  target: Target
  parameters: Parameter[]
}

export interface Target {
  namespace: string
  label: string
  kind: string
}

export interface Parameter {
  name: string
  value: string
}
