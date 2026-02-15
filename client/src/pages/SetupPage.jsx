// src/pages/SetupPage.jsx
import React, { useState } from 'react'
import { queryAiPriorities } from '../utils/api'

function emptyTask() {
  return {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    title: '',
    description: '',
    minutes: 30
  }
}

const formInputStyle = {
  width: '100%',
  marginBottom: '8px',
  padding: '8px',
  boxSizing: 'border-box',
  display: 'block'
};

export default function SetupPage({ onStart }) {
  const [tasks, setTasks] = useState([emptyTask()])
  const [totalHours, setTotalHours] = useState(4)
  const [loading, setLoading] = useState(false)

  function updateTask(idx, patch) {
    setTasks((t) => t.map((task, i) => (i === idx ? { ...task, ...patch } : task)))
  }
  function addTask() {
    setTasks((t) => [...t, emptyTask()])
  }
  function removeTask(idx) {
    setTasks((t) => t.filter((_, i) => i !== idx))
  }

  async function startSession() {
    // basic validation
    const finalHours = totalHours === '' ? 0 : Number(totalHours);
    const filtered = tasks.filter((t) => t.title.trim());
    if (filtered.length === 0) {
      alert('Add at least one task with a name.')
      return
    }
    if (finalHours <= 0) {
      alert('Please enter a valid amount of time.');
      return;
    }
    setLoading(true)
    const ordering = await queryAiPriorities(filtered, Number(totalHours))
    const byId = Object.fromEntries(filtered.map((t) => [t.id, t]))
    let orderedTasks
    if (Array.isArray(ordering) && ordering.length > 0 && ordering[0] && typeof ordering[0] === 'string') {
      orderedTasks = ordering.map((id) => byId[id]).filter(Boolean)
    } else if (Array.isArray(ordering) && ordering.length > 0 && typeof ordering[0] === 'object') {
      // maybe returned objects with id/rank
      orderedTasks = ordering
        .map((o) => byId[o.id] ? { ...byId[o.id], priorityRank: o.rank } : null)
        .filter(Boolean)
        .sort((a, b) => (a.priorityRank || 0) - (b.priorityRank || 0))
    } else {
      orderedTasks = filtered
    }
    setLoading(false)
    onStart({ totalHours: Number(totalHours), tasks: orderedTasks })
  }

  return (
    <div className="setup-page">
      <h1>Setup</h1>

      <label style={{ display: 'block', marginBottom: '20px' }}>
        Total available hours:
        <input
          type="number"
          step="0.25"
          value={totalHours} 
          onChange={(e) => {
            const val = e.target.value;
            setTotalHours(val === '' ? '' : val); 
          }}
          style={{ marginLeft: '0px', padding: '4px', maxWidth: '62vw' }}
        />
      </label>

      <div className="task-forms">
        {tasks.map((task, idx) => (
          <div key={task.id} className="task-form" style={{ 
            border: '1px solid #ddd', 
            padding: '12px', 
            marginBottom: '12px', 
            borderRadius: '4px',
            width: '100%',
            maxWidth: '61vw'
          }}>
            <input
              style={formInputStyle}
              placeholder="Task name"
              value={task.title}
              onChange={(e) => updateTask(idx, { title: e.target.value })}
            />
            <input
              style={formInputStyle}
              placeholder="Minutes (estimate)"
              type="number"
              value={task.minutes}
              onChange={(e) => updateTask(idx, { minutes: e.target.value === '' ? '' : Number(e.target.value) })}
            />
            <textarea
              style={{ ...formInputStyle, height: '60px', resize: 'vertical' }}
              placeholder="Description / notes"
              value={task.description}
              onChange={(e) => updateTask(idx, { description: e.target.value })}
            />
            <div>
              <button onClick={() => removeTask(idx)} disabled={tasks.length <= 1}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        <button onClick={addTask}>Add task</button>
        <button onClick={startSession} disabled={loading} style={{ marginLeft: 8 }}>
          {loading ? 'Analyzing...' : 'Proceed'}
        </button>
      </div>
    </div>
  )
}