import Env from './Env'
import Target from './Target'

export default class Step {
    name: string
    namespace: string
    target: Target
    env: Env[]

    constructor(name: string, namespace: string, target: Target, env: Env[]) {
        this.name = name
        this.namespace = namespace
        this.target = target
        this.env = env
    }
}
