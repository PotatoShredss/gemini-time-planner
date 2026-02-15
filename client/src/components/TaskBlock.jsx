import React from 'react'

export default function TaskBlock({ task, onClick }) {
  const color = task.isExtra ? '#ddd' : `hsl(${(task.priority || 1) * 40 % 360} 70% 60%)`
  const label = task.title || (task.isExtra ? 'Extra time' : 'Untitled')

  return (
    <div
      className="task-block"
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{
        background: color,
        padding: '8px',
        minHeight: '48px',
        borderRight: '1px solid rgba(0,0,0,0.1)'
      }}
    >
      <div className="task-label">{label}</div>
      <div className="task-mini">{task.minutes} min</div>
    </div>
  )
}