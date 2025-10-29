import { useEffect, useState } from 'react'

export default function ScoreBar() {
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const s = Number(localStorage.getItem('score') || '0')
    const t = Number(localStorage.getItem('attempts') || '0')
    setScore(s)
    setTotal(t)
    const handler = () => {
      setScore(Number(localStorage.getItem('score') || '0'))
      setTotal(Number(localStorage.getItem('attempts') || '0'))
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const reset = () => {
    localStorage.removeItem('score')
    localStorage.removeItem('attempts')
    setScore(0)
    setTotal(0)
  }

  const pct = total ? Math.round((score / total) * 100) : 0

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white shadow px-4 py-3 mb-4">
      <div className="font-semibold">Score: {score} / {total} ({pct}%)</div>
      <button className="text-sm border px-3 py-1 rounded hover:bg-gray-50" onClick={reset}>
        Reset
      </button>
    </div>
  )
}