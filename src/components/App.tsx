import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import WorkflowCreator from './workflows/WorkflowCreator'
import WorkflowWatcher from './workflows/WorkflowWatcher'

export default class App extends React.Component {
  render () {
    const server = 'localhost:8811'
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/workflows/create">
            <WorkflowCreator serverURL={server}/>
          </Route>
          <Route exact path="/workflows/:namespace/:name">
            <WorkflowWatcher serverURL={server}/>
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
}
