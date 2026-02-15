import React, { useState } from 'react'
import SetupPage from './pages/SetupPage'
import WorkflowPage from './pages/WorkflowPage'

export default function App() {
  const [session, setSession] = useState(null) // { tasks: [...], totalMinutes }
  const [view, setView] = useState('setup')

  return (
    <div className="app">
      {view === 'setup' && (
        <SetupPage
          onStart={(sessionData) => {
            setSession(sessionData)
            setView('workflow')
          }}
        />
      )}
      {view === 'workflow' && session && (
        <WorkflowPage
          session={session}
          onEnd={() => {
            setSession(null)
            setView('setup')
          }}
        />
      )}
    </div>
  )
}