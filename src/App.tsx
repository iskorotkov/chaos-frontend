import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { WorkflowsDashboard } from './workflows/components/WorkflowsDashboard'
import { WorkflowsCreationForm } from './workflows/components/WorkflowsCreationForm'
import { ViewWorkflow } from './workflows/components/ViewWorkflow'

export function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WorkflowsDashboard />
        </Route>
        <Route exact path="/create">
          <WorkflowsCreationForm />
        </Route>
        <Route exact path="/preview">
          <ViewWorkflow preview={true} />
        </Route>
        <Route exact path="/view/:namespace/:name">
          <ViewWorkflow preview={false} />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
