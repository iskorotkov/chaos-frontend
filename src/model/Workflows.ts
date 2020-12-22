import moment from 'moment/moment'

export class Workflow {
  stages!: Stage[]
}

export class Stage {
  steps!: Step[]
  duration!: moment.Duration
}

export class Step {
  name!: string
  namespace!: string
  lethal!: boolean
  target!: Target
  parameters!: Parameter[]
}

export class Target {
  namespace!: string
  label!: string
  kind!: string
}

export class Parameter {
  name!: string
  value!: string
}
