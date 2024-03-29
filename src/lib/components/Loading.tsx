import styled from 'styled-components'
import { theme } from '../../theme'
import React from 'react'

const CenterText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${theme.colors.text.dark};
`

const CenterTextInline = styled.p`
  margin-left: auto;
  margin-right: auto;
  color: ${theme.colors.text.dark};
`

export const Loading = ({ text }: { text: string }) => (
  <CenterText>{text}</CenterText>
)

export const LoadingInline = ({ text }: { text: string }) => (
  <CenterTextInline>{text}</CenterTextInline>
)
