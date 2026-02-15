// src/components/TaskBar.jsx
import React from 'react'

export default function TaskBar({ tasks = [], compact = true, scale = 1 }) {
  const totalFraction = tasks.reduce((s, t) => s + (t.fraction || 0), 0) || 1

  const outerStyle = {
    border: '1px solid #ccc',
    overflow: 'hidden',
    width: 480,
    height: compact ? 24 : 64,
    background: '#f8f8f8'
  }

  const clipWidthPercent = Math.max(0, Math.min(1, scale)) * 100

  return (
    <div style={outerStyle}>
      <div style={{ width: `${clipWidthPercent}%`, height: '100%', overflow: 'hidden', transition: 'width 0.3s linear' }}>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          {tasks.map((t) => {
            const w = ((t.fraction || 0) / totalFraction) * 100
            const color = t.isExtra ? '#eee' : `hsl(${((t.position || 1) * 40) % 360} 70% 60%)`
            return (
              <div key={t.id} title={`${t.title} — ${Math.round((t.fraction || 0) * 100)}%`} style={{ width: `${w}%`, background: color }} />
            )
          })}
        </div>
      </div>
    </div>
  )
}