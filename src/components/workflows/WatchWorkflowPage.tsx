import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import { toWorkflowEvent, WorkflowEventDTO } from '../../dto/WorkflowEvents'
import WorkflowStatus from './WorkflowStatus'

export default function WatchWorkflowPage (props: {
  serverURL: string
}) {
  const { namespace, name } = useParams<{ namespace: string, name: string }>()
  const didUnmount = useRef(false)

  const {
    lastJsonMessage
  } = useWebSocket(`ws://${props.serverURL}/api/v1/workflows/${namespace}/${name}`, {
    retryOnError: true,
    reconnectAttempts: 5,
    reconnectInterval: 5000,
    onOpen: () => console.log('Websocket connection opened'),
    onClose: () => console.log('Websocket connection closed'),
    shouldReconnect: event => !didUnmount.current && !event.wasClean
  })

  useEffect(() => {
    return () => {
      didUnmount.current = true
    }
  }, [])

  const workflowStatus = () => {
    if (lastJsonMessage !== null) {
      const dto = lastJsonMessage as WorkflowEventDTO
      const workflow = toWorkflowEvent(dto)
      return (<WorkflowStatus workflow={workflow}/>)
    } else {
      return (<p>Workflow status is not available</p>)
    }
  }

  return (
    <>
      <h1>Success</h1>
      <p>Generated workflow was successfully submitted.</p>

      {workflowStatus()}

      <div><Link to="/workflows/create">Create another workflow</Link></div>
      <div><Link to="/workflows">Go back to workflows page</Link></div>
      <div><Link to="/">Go back to home page</Link></div>
    </>
  )
}
