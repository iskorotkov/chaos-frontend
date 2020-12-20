import Env from './Env'
import Target from './Target'

export default class Step {
  constructor (public name: string, public namespace: string, public target: Target, public env: Env[]) {
  }
}
