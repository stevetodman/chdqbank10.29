import { useState } from 'react'
import type { Question } from '../types/question'

export default function QuestionCard({ q, onAttempt }: { q: Question; onAttempt: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [show, setShow] = useState(false)

  const choose = (i: number) => {
    if (show) return
    setSelected(i)
    setShow(true)
    const attempts = Number(localStorage.getItem('attempts') || '0') + 1
    localStorage.setItem('attempts', attempts.toString())
    const correct = i === q.answer
    if (correct) {
      const s = Number(localStorage.getItem('score') || '0') + 1
      localStorage.setItem('score', s.toString())
    }
    // Let parent update live score display if needed
    onAttempt(i === q.answer)
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wide text-gray-500">{q.topic}</span>
        {q.difficulty && <span className="text-xs rounded-full px-2 py-0.5 bg-gray-100">{q.difficulty}</span>}
      </div>
      <p className="text-lg font-semibold mb-4">{q.stem}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const correct = show && i === q.answer
          const wrong   = show && i === selected && i !== q.answer
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`w-full text-left border rounded px-3 py-2 transition
                ${correct ? 'bg-green-100 border-green-500' : ''}
                ${wrong ? 'bg-red-100 border-red-500' : ''}
                ${!show ? 'hover:bg-gray-50' : ''}
              `}
            >
              <span className="font-mono mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
            </button>
          )
        })}
      </div>
      {show && (
        <div className="mt-3 text-sm text-gray-700">
          <div className="font-semibold mb-1">Explanation</div>
          <p>{q.explanation}</p>
          {q.tags?.length ? (
            <div className="mt-2 text-xs text-gray-500">Tags: {q.tags.join(', ')}</div>
          ) : null}
        </div>
      )}
    </div>
  )
}