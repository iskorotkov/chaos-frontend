import styled from 'styled-components'
import { theme } from '../../theme'

export const Page = styled.div`
  flex-flow: column nowrap;
  height: 100vh;
  color: ${theme.colors.text.dark};
`

export const Header = styled.header`
  height: 3em;
  padding: 0 2em;
  background-color: ${theme.colors.background.primary};
  color: ${theme.colors.text.light};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

export const PageName = styled.h1`
  padding: 0;
  margin: 0;
  font-weight: normal;
  font-size: 1.5em;
`

export const Main = styled.main`
  max-width: calc(800em / 16);
  margin: 0 auto;
`
