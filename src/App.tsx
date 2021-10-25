import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { WorkflowsDashboard } from './workflows/components/WorkflowsDashboard'

export function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WorkflowsDashboard/>
        </Route>
        <Route exact path="/create">
          <p>Create workflow</p>
        </Route>
        <Route exact path="/:namespace/:name">
          <p>View workflow</p>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
