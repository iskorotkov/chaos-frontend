import * as http from 'http'
import { WorkflowStatus } from '../workflows/types/workflows'
import { Failure } from '../workflows/types/failures'
import { Target } from '../workflows/types/targets'
import { Namespace } from '../workflows/types/namespaces'

const port = 8080

const endpoint = (method: string, path: string) => `${method} ${path}`

const workflows = <WorkflowStatus[]>[
  {
    name: 'wf-1',
    namespace: 'ns-1',
    startedAt: new Date(),
    finishedAt: null,
    status: 'running'
  },
  {
    name: 'wf-23',
    namespace: 'ns-1',
    startedAt: new Date(2020, 11, 12, 14, 33),
    finishedAt: new Date(2020, 11, 12, 14, 36),
    status: 'succeeded'
  },
  {
    name: 'wf-2323',
    namespace: 'ns-1',
    startedAt: new Date(2020, 11, 12, 12, 22),
    finishedAt: new Date(2020, 11, 12, 13, 14),
    status: 'failed'
  }
]

const targets = <Target[]>[
  { type: 'deployment', name: 'nginx', count: 3 },
  { type: 'deployment', name: 'my-cool-service', count: 5 }
]

const failures = <Failure[]>[
  { type: 'network', name: 'network delay', severity: 'low', scale: 'deployment' },
  { type: 'crash', name: 'pod delete', severity: 'critical', scale: 'deployment part' }
]

const namespaces = <Namespace[]>[
  { name: 'ns1' },
  { name: 'ns2' }
]

const server = http.createServer((req, res) => {
  if (!req.method || !req.url) {
    console.error('request method or url is undefined')
    return
  }

  console.log(endpoint(req.method, req.url))

  res.setHeader('Access-Control-Allow-Origin', '*')

  switch (endpoint(req.method, req.url)) {
    case endpoint('GET', '/api/v1/workflows'):
      return res.end(JSON.stringify(workflows, null, 2))
    case endpoint('GET', '/api/v1/failures'):
      return res.end(JSON.stringify(failures, null, 2))
    case endpoint('GET', '/api/v1/targets'):
      return res.end(JSON.stringify(targets, null, 2))
    case endpoint('GET', '/api/v1/namespaces'):
      return res.end(JSON.stringify(namespaces, null, 2))
    default:
      res.statusCode = 404
      return res.end()
  }
})

server.listen(port, () => {
  console.log(`server started listening at :${port}`)
})
