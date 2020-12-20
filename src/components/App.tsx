import React from 'react'
import './App.css'
import WorkflowComponent from './workflows/WorkflowComponent'
import Stage from '../model/workflows/Stage'
import Step from '../model/workflows/Step'
import Target from '../model/workflows/Target'
import Env from '../model/workflows/Env'

export default class App extends React.Component {
  render () {
    const ns = 'default'

    const targets = [
      new Target(ns, 'app=postgres', 'deployment'),
      new Target(ns, 'app=backend', 'deployment'),
      new Target(ns, 'app=frontend', 'deployment')
    ]

    const env = [
      new Env('DURATION', '60'),
      new Env('PERCENTAGE', '90'),
      new Env('LATENCY', '300')
    ]

    const duration = new Date(0, 0, 0, 0, 1)

    const stages = [
      new Stage([
        new Step('1-1', ns, targets[0], []),
        new Step('1-2', ns, targets[1], [env[0], env[1]]),
        new Step('1-3', ns, targets[0], [])
      ], duration),
      new Stage([
        new Step('2-1', ns, targets[0], [env[1], env[2]]),
        new Step('2-2', ns, targets[1], [env[0], env[2]]),
        new Step('2-3', ns, targets[0], [env[1], env[2]])
      ], duration),
      new Stage([
        new Step('3-1', ns, targets[0], [env[1], env[2]]),
        new Step('3-2', ns, targets[1], [env[0], env[1], env[2]]),
        new Step('3-3', ns, targets[0], [])
      ], duration)
    ]

    return <WorkflowComponent stages={stages}/>
  }
}
