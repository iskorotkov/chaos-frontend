import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import CreateWorkflowPage from './workflows/CreateWorkflowPage'
import WatchWorkflowPage from './workflows/WatchWorkflowPage'

export default function App () {
  const server = process.env.HOSTNAME ?? 'localhost'

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/workflows/create">
          <CreateWorkflowPage serverURL={server}/>
        </Route>
        <Route exact path="/workflows/:namespace/:name">
          <WatchWorkflowPage serverURL={server}/>
        </Route>
        <Route exact path="/workflows">
          <h1>Workflows</h1>
          <Link to="/workflows/create">Create new</Link>
        </Route>
        <Route exact path="/">
          <h1>Home page</h1>
          <Link to="/workflows">
            Workflows
          </Link>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
