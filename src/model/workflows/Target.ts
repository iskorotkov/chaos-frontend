export default class Target {
    namespace: string
    label: string
    kind: string

    constructor(namespace: string, label: string, kind: string) {
        this.namespace = namespace
        this.label = label
        this.kind = kind
    }
}
