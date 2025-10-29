import { useEffect, useMemo, useState } from 'react'
import questionsData from './data/questions.json'
import type { Question } from './types/question'
import QuestionCard from './components/QuestionCard'
import ScoreBar from './components/ScoreBar'

const topicsFromData = Array.from(new Set((questionsData as Question[]).map(q => q.topic)))
const allTopics = ['All', ...topicsFromData]

export default function App() {
  const [topic, setTopic] = useState<string>('All')
  const [query, setQuery] = useState<string>('')
  const [_, setBump] = useState(0) // trigger re-render on storage changes

  useEffect(() => {
    const handler = () => setBump(b => b + 1)
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const questions = useMemo(() => {
    const base = (questionsData as Question[])
    const filteredTopic = topic === 'All' ? base : base.filter(q => q.topic === topic)
    const filteredQuery = query.trim().length
      ? filteredTopic.filter(q => (q.stem + ' ' + q.options.join(' ') + ' ' + (q.tags || []).join(' '))
          .toLowerCase().includes(query.toLowerCase()))
      : filteredTopic
    return filteredQuery
  }, [topic, query])

  const onAttempt = (_correct: boolean) => {
    // scorebar listens to localStorage changes; no-op here other than forcing rerender
    setBump(b => b + 1)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Structural CHD QBank — Step 1</h1>
          <p className="text-sm text-gray-600">Local-first practice app for MS2 students</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <ScoreBar />

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <select
            className="border rounded px-3 py-2 bg-white"
            value={topic}
            onChange={e => setTopic(e.target.value)}
          >
            {allTopics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="Search stem, options, tags…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div>
          {questions.map(q => (
            <QuestionCard key={q.id} q={q} onAttempt={onAttempt} />
          ))}
          {!questions.length && (
            <div className="text-gray-600 text-sm">No questions match your filters.</div>
          )}
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        <div>© {new Date().getFullYear()} CHD QBank (local). Installable PWA.</div>
      </footer>
    </div>
  )
}