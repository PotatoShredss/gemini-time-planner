// src/utils/api.js
// Provides functions to call your backend (which will proxy to Gemini).
// If backend isn't ready this falls back to a simple heuristic.

export async function queryAiPriorities(tasks, totalHours) {
  // tasks: [{ id, title, description, minutes, ... }]
  // totalHours: number
  try {
    const resp = await fetch('/api/assign_priorities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tasks, totalHours })
    })
    if (!resp.ok) throw new Error('bad response')
    const data = await resp.json()
    // Expect data: { ordering: [{ id, rank }] } or array of ids
    if (Array.isArray(data)) return data
    if (data.ordering) return data.ordering
    return fallbackPriorities(tasks)
  } catch (err) {
    console.warn('AI priority call failed, falling back:', err)
    return fallbackPriorities(tasks)
  }
}

function fallbackPriorities(tasks) {
  // simple fallback: sort by (minutes asc, title) to produce deterministic order
  const sorted = tasks.slice().sort((a, b) => {
    if ((a.minutes || 0) !== (b.minutes || 0)) return (a.minutes || 0) - (b.minutes || 0)
    return (a.title || '').localeCompare(b.title || '')
  })
  // return array of ids (position 1..N)
  return sorted.map((t) => t.id)
}

// placeholder for AI progress query used later
export async function queryAiProgress(task) {
  return { progress: 'unknown', recommended_extra_minutes: 0 }
}