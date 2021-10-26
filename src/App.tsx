import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { WorkflowsDashboard } from './workflows/components/WorkflowsDashboard'
import { WorkflowsCreationForm } from './workflows/components/WorkflowsCreationForm'

export function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WorkflowsDashboard/>
        </Route>
        <Route exact path="/create">
          <WorkflowsCreationForm/>
        </Route>
        <Route exact path="/preview">
          <p>Preview workflow</p>
        </Route>
        <Route exact path="/view/:namespace/:name">
          <p>View workflow</p>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
