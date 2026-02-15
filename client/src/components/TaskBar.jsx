// src/components/TaskBar.jsx
import React from 'react'

export default function TaskBar({ tasks = [], compact = true, secondsLeft = 0 }) {
  const totalFraction = tasks.reduce((s, t) => s + (t.fraction || 0), 0) || 1
  return (
    <div style={{ display: 'flex', width: 480, height: compact ? 24 : 64, border: '1px solid #ccc', overflow: 'hidden' }}>
      {tasks.map((t) => {
        const w = ((t.fraction || 0) / totalFraction) * 100
        const color = t.isExtra ? '#eee' : `hsl(${((t.position || 1) * 40) % 360} 70% 60%)`
        return (
          <div key={t.id} title={`${t.title} — ${Math.round((t.fraction||0)*100)}%`} style={{ width: `${w}%`, background: color }} />
        )
      })}
    </div>
  )
}