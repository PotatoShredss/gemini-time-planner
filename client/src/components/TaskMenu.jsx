import React from 'react'

export default function TaskMenu({ task, onClose, onFinishEarly, onPriorityUp, onPriorityDown }) {
  return (
    <div className="task-menu" role="dialog" aria-label={`Menu for ${task.title}`}>
      <div><strong>{task.title}</strong></div>
      <div>{task.notes}</div>
      <button onClick={onFinishEarly}>Finish early</button>
      <button onClick={onPriorityUp}>Priority +</button>
      <button onClick={onPriorityDown}>Priority -</button>
      <button onClick={onClose}>Close</button>
    </div>
  )
}