import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import CreateWorkflowPage from './workflows/CreateWorkflowPage'
import WatchWorkflowPage from './workflows/WatchWorkflowPage'

export default function App () {
  const server = document.location.host
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <CreateWorkflowPage server={server}/>
        </Route>
        <Route exact path="/:namespace/:name">
          <WatchWorkflowPage server={server}/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
