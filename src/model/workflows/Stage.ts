import Step from './Step'

export default class Stage {
  constructor (public steps: Step[], public duration: Date) {
  }
}
