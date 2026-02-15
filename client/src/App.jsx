import React, { useState, useEffect } from 'react'
import SetupPage from './pages/SetupPage'
import WorkflowPage from './pages/WorkflowPage'

export default function App() {
  const [session, setSession] = useState(null) // { tasks: [...], totalMinutes }
  const [view, setView] = useState('setup')
  const [theme, setTheme] = useState('light')

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <div className="app">
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      
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