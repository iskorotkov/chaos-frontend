import styled from 'styled-components'
import React from 'react'
import { ChangeIndicatorIcon, DangerIndicatorIcon, PrimaryIndicatorIcon, SuccessIndicatorIcon } from './IndicatorIcon'
import { Status } from '../../workflows/types/workflows'

const IndicatorWrapper = styled.div`
  position: absolute;
  top: 0.5em;
  right: 1.5em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: end;
  align-items: center;
  gap: 0.3em;
`

export const Indicator = (props: { children: React.ReactNode, text: string }) => (
  <IndicatorWrapper>
    {props.children}
    <div>{props.text}</div>
  </IndicatorWrapper>
)

export const StatusIndicatorIcon = ({ status }: { status: Status }) => {
  switch (status) {
    case 'running':
      return <PrimaryIndicatorIcon/>
    case 'pending':
      return <ChangeIndicatorIcon/>
    case 'succeeded':
      return <SuccessIndicatorIcon/>
    case 'failed':
      return <DangerIndicatorIcon/>
    case 'error':
      return <DangerIndicatorIcon/>
    case 'cancelled':
      return <DangerIndicatorIcon/>
    default:
      console.error(`unknown status: ${status}`)
      return <PrimaryIndicatorIcon/>
  }
}
