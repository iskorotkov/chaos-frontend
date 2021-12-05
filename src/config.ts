export const SCHEDULER_URL = process.env.REACT_APP_SCHEDULER_URL ?? `${document.location.origin}/scheduler`
export const WORKFLOWS_URL = process.env.REACT_APP_WORKFLOWS_URL ?? `${document.location.origin}/workflows`
export const WORKFLOWS_WS_URL = WORKFLOWS_URL.replace('http', 'ws')
