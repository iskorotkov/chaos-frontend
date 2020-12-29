import { Link } from 'react-router-dom'
import React, { useState } from 'react'

export default function WatchWorkflowPage () {
  const [status] = useState('')
  const [link] = useState('')

  return (
    <>
      <h1>Success</h1>
      <p>Generated workflow was successfully submitted.</p>
      <ul>{status}</ul>

      <div><Link to={link}>See workflow progress</Link></div>
      <div><Link to="/workflows">Go back to workflows page</Link></div>
      <div><Link to="/">Go back to home page</Link></div>
    </>
  )
}
