import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import CreateWorkflowPage from './workflows/CreateWorkflowPage'
import WatchWorkflowPage from './workflows/WatchWorkflowPage'

export default function App () {
  const server = process.env.REACT_APP_BACKEND ?? document.location.host
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:namespace/:name" element={<WatchWorkflowPage server={server} />} />
        <Route path="/" element={<CreateWorkflowPage server={server} />} />
      </Routes>
    </BrowserRouter>
  )
}
