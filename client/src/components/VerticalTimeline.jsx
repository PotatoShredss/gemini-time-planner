// src/components/VerticalTimeline.jsx
import React, { useState } from 'react'

export default function VerticalTimeline({ tasks = [], onAdjust, onShift, onFinish }) {
  const [active, setActive] = useState(null)
  const totalMinutes = tasks.reduce((s, t) => s + (t.minutes || 0), 0) || 1

  return (
    <div style={{ borderLeft: '2px solid #ddd', paddingLeft: 12 }}>
      {tasks.map((t) => {
        const heightPct = ((t.minutes || 0) / totalMinutes) * 100
        return (
          <div key={t.id} style={{ marginBottom: 8 }}>
            <div
              onClick={() => setActive(t.id === active ? null : t.id)}
              role="button"
              tabIndex={0}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 8px',
                background: t.completed ? '#f0f6f0' : '#fff',
                border: '1px solid #eee',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{t.minutes} min — pos {t.position}</div>
              </div>
              <div style={{ width: 48, textAlign: 'right' }}>{Math.round(heightPct)}%</div>
            </div>

            {active === t.id && (
              <div style={{ padding: 8, border: '1px solid #f0f0f0', background: '#fafafa', marginTop: 6 }}>
                <div style={{ marginBottom: 6 }}>
                  <button onClick={() => onAdjust(t.id, -5)}>-5 min</button>
                  <button onClick={() => onAdjust(t.id, 5)} style={{ marginLeft: 6 }}>
                    +5 min
                  </button>
                </div>
                <div style={{ marginBottom: 6 }}>
                  <button onClick={() => onShift(t.id, -1)}>Move up</button>
                  <button onClick={() => onShift(t.id, 1)} style={{ marginLeft: 6 }}>
                    Move down
                  </button>
                </div>
                <div>
                  <button onClick={() => onFinish(t.id)}>Finish</button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}