import { WorkflowCreateResponse, WorkflowPreviewResponse } from '../dto/workflows'
import { Mapper } from '@dynamic-mapper/mapper'
import { workflowDtoToModel } from '../../mapper'
import { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import { WorkflowUpdateDto } from '../dto/workflowUpdates'
import axios from 'axios'

export class WorkflowsClient {
  readonly serverHost: string
  readonly mapper: Mapper

  previewWorkflowEndpoint = () => `http://${this.serverHost}/api/v1/workflows/preview`
  createWorkflowEndpoint = () => `http://${this.serverHost}/api/v1/workflows/create`
  workflowsWebsocketEndpoint = (namespace: string, name: string) => `ws://${this.serverHost}/api/v1/workflows/watch/${namespace}/${name}`

  constructor (serverUrl: string, mapper: Mapper) {
    this.serverHost = serverUrl
    this.mapper = mapper
  }

  async preview (props: { seed: number, stages: number }) {
    try {
      const response = await axios(this.previewWorkflowEndpoint(), {
        method: 'POST',
        data: props
      })

      const dto = await response.data as WorkflowPreviewResponse
      return this.mapper.map(workflowDtoToModel, dto)
    } catch (error: any) {
      console.error(error)
    }
  }

  async create (props: { seed: number, stages: number }) {
    try {
      const response = await axios(this.createWorkflowEndpoint(), {
        method: 'POST',
        data: props
      })

      const dto = response.data as WorkflowCreateResponse
      return this.mapper.map(createdWorkflowDtoToModel, dto)
    } catch (error: any) {
      console.error(error)
    }
  }
}

export const useWorkflowsWebsocket = (props: { client: WorkflowsClient, namespace: string, name: string }) => {
  const didUnmount = useRef(false)

  const url = props.client.workflowsWebsocketEndpoint(props.namespace, props.name)
  const { lastJsonMessage } = useWebSocket(url, {
    retryOnError: true,
    reconnectAttempts: 3,
    reconnectInterval: 3000,
    onOpen: () => console.log('websocket connection opened'),
    onClose: () => console.log('websocket connection closed'),
    shouldReconnect: () => !didUnmount.current
  })

  useEffect(() => {
    return () => {
      didUnmount.current = true
    }
  }, [])

  if (lastJsonMessage === null) {
    return null
  }

  const dto = lastJsonMessage as WorkflowUpdateDto
  return props.client.mapper.map(workflowUpdateDtoToModel, dto)
}
