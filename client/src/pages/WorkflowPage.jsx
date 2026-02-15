// src/pages/WorkflowPage.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import TaskBar from '../components/TaskBar'
import VerticalTimeline from '../components/VerticalTimeline'
import { getFutureTime, minutesToSeconds, secondsToDuration } from '../utils/timeHelpers'
import { queryAiProgress } from '../utils/api'

export default function WorkflowPage({ session, onEnd }) {
  // session: { totalHours, tasks: ordered array }
  const totalSecondsInitial = useMemo(() => minutesToSeconds(session.totalHours * 60 / 60), [session.totalHours])
  //note: user passed hours, convert to minutes*60:
  const [totalSeconds, setTotalSeconds] = useState(session.totalHours * 3600)
  const [secondsLeft, setSecondsLeft] = useState(session.totalHours * 3600)
  const [tasks, setTasks] = useState(() =>
    session.tasks.map((t, i) => ({ ...t, completed: false, position: i + 1 }))
  )
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  // If total estimated minutes for tasks exceed allotted time, show error and go back
  useEffect(() => {
    const totalTaskMinutes = (session.tasks || []).reduce((s, t) => s + (t.minutes || 0), 0)
    const totalAllottedMinutes = (session.totalHours || 0) * 60
    if (totalTaskMinutes > totalAllottedMinutes) {
      alert('Total task time exceeds allotted session time. Please adjust tasks or increase total time.')
      onEnd()
    }
  }, [session, onEnd])


useEffect(() => {
  if (tasks.length > 0) {
    const currentTask = tasks[0];
    const totalAllocatedSeconds = tasks.reduce((acc, t) => acc + (t.minutes * 60), 0);
    
    // If the time left in the session is less than the time required 
    // for all tasks MINUS the current task, it means the current task's time is up.
    const remainingTasksTime = (totalAllocatedSeconds - (currentTask.minutes * 60));
    
    if (secondsLeft < remainingTasksTime) {
      // Small delay or notification can be added here
      finishTask(currentTask.id);
    }
  }
}, [secondsLeft, tasks, finishTask]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      clearInterval(timerRef.current)
      if (confirm('Time is up. End session?')) onEnd()
    }
  }, [secondsLeft, onEnd])

  function updateTaskById(id, patch) {
    setTasks((cur) => cur.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  function finishTask(id) {
  setTasks((cur) => {
    const remaining = cur.filter((t) => t.id !== id)

    // If no tasks left then end session
    if (remaining.length === 0) {
      clearInterval(timerRef.current)
      onEnd()
      return []
    }

    // Recalculate positions
    return remaining.map((t, i) => ({
      ...t,
      position: i + 1
    }))
  })
}


  function shiftPosition(id, delta) {
    setTasks((cur) => {
      const idx = cur.findIndex((t) => t.id === id)
      if (idx < 0) return cur
      const copy = cur.slice()
      const target = idx + delta
      if (target < 0 || target >= copy.length) return copy
      const [item] = copy.splice(idx, 1)
      copy.splice(target, 0, item)
      // refresh position numbers
      return copy.map((t, i) => ({ ...t, position: i + 1 }))
    })
  }

  // compute proportional visual mapping for the progress bar top-left:
  const tasksWithLiveTimes = useMemo(() => {
    const elapsedSeconds = (totalSeconds || 0) - (secondsLeft || 0)

    // compute remaining seconds per task after accounting for elapsed time
    let accumulatedSeconds = 0
    const perTask = tasks.map((t) => {
      const durationSeconds = (t.minutes || 0) * 60
      const start = accumulatedSeconds
      const end = start + durationSeconds
      const consumed = Math.max(0, Math.min(durationSeconds, elapsedSeconds - start))
      const remaining = Math.max(0, durationSeconds - consumed)
      accumulatedSeconds += durationSeconds
      return { t, start, end, durationSeconds, remaining }
    })

    const totalRemainingSeconds = perTask.reduce((s, p) => s + p.remaining, 0) || 1

    return perTask.map((p) => ({
      ...p.t,
      fraction: p.remaining / totalRemainingSeconds,
      // show start/end relative to now (0 = now)
      startTimeStr: getFutureTime(Math.max(0, p.start - elapsedSeconds)),
      endTimeStr: getFutureTime(Math.max(0, p.end - elapsedSeconds))
    }))
  }, [tasks, secondsLeft, totalSeconds])


  return (
    <div className="workflow-page" style={{ display: 'flex', gap: 20 }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div>Total left: {secondsToDuration(secondsLeft)}</div>
            <div className="progress-row" style={{ marginTop: 8 }}>
              <TaskBar compact tasks={tasksWithLiveTimes} secondsLeft={secondsLeft} />
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                if (confirm('End session?')) onEnd()
              }}
            >
              End session
            </button>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <h3>Tasks</h3>
          {tasks.map((t) => (
            <div key={t.id} style={{ marginBottom: 8, padding: 8, border: '1px solid #ddd' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{t.title}</strong> <small>({t.minutes} min)</small>
                  <div>{t.description}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div>Position: {t.position}</div>
                  <button onClick={() => updateTaskById(t.id, { minutes: Math.max(1, (t.minutes || 0) - 5) })}>
                    Need less
                  </button>
                  <button onClick={() => updateTaskById(t.id, { minutes: (t.minutes || 0) + 5 })} style={{ marginLeft: 6 }}>
                    Need more
                  </button>
                  <div style={{ marginTop: 6 }}>
                    <button onClick={() => shiftPosition(t.id, -1)}>Move up</button>
                    <button onClick={() => shiftPosition(t.id, 1)} style={{ marginLeft: 6 }}>
                      Move down
                    </button>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <button onClick={() => finishTask(t.id)}>Mark finished</button>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside style={{ width: 260 }}>
        <h4>Timeline</h4>
        <VerticalTimeline tasks={tasks} onAdjust={(id, deltaMinutes) => updateTaskById(id, { minutes: Math.max(1, (tasks.find(t=>t.id===id).minutes||0) + deltaMinutes) })} onShift={shiftPosition} onFinish={finishTask} />
      </aside>
    </div>
  )
}