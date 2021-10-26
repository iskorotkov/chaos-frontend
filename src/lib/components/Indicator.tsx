import styled from 'styled-components'
import React from 'react'

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

export const Indicator = (props: { children: React.Component, text: string }) => (
  <IndicatorWrapper>
    {props.children}
    <div>{props.text}</div>
  </IndicatorWrapper>
)
