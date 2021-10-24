import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import CreateWorkflowPage from './workflows/components/CreateWorkflowPage'
import WatchWorkflowPage from './workflows/components/WatchWorkflowPage'

export default function App () {
  const server = document.location.host
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <p>Dashboard</p>
        </Route>
        <Route exact path="/create">
          <p>Create workflow</p>
          <CreateWorkflowPage server={server}/>
        </Route>
        <Route exact path="/:namespace/:name">
          <p>View workflow</p>
          <WatchWorkflowPage server={server}/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
