import { Link, useParams } from 'react-router-dom'
import React from 'react'

export default function WatchWorkflowPage () {
  const { namespace, name } = useParams<{ namespace: string, name: string }>()

  return (
    <>
      <h1>Success</h1>
      <p>Generated workflow was successfully submitted.</p>

      <p>Workflow: {name}</p>
      <p>Namespace: {namespace}</p>

      <div><Link to="/workflows">Go back to workflows page</Link></div>
      <div><Link to="/">Go back to home page</Link></div>
    </>
  )
}
