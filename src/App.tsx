import { Layout } from '@/pages/Layout'
import { HomePage } from '@/pages/HomePage'
import { PortfolioPage } from '@/pages/PortfolioPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ExperiencePage } from '@/pages/ExperiencePage'
import { BlogPage } from '@/pages/BlogPage'
import { Terminal } from '@/terminal/Terminal'
import { markVisited, shouldSkipTerminal } from '@/lib/visit'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()
  const [ready, setReady] = useState(() => shouldSkipTerminal())
  const [hello, setHello] = useState('')

  useEffect(() => {
    if (new URLSearchParams(location.search).get('direct') === '1') {
      markVisited('Guest')
      setReady(true)
    }
  }, [location.search])

  useEffect(() => {
    if (!hello) return
    const id = window.setTimeout(() => setHello(''), 280)
    return () => window.clearTimeout(id)
  }, [hello])

  if (!ready) {
    return (
      <Terminal
        onEnter={(name) => {
          setHello(name)
          setReady(true)
        }}
      />
    )
  }

  return (
    <>
      {hello ? (
        <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-black/70 font-[family-name:var(--font-display)] text-4xl uppercase tracking-[0.12em]">
          {hello}
        </div>
      ) : null}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio/:kind" element={<PortfolioPage />} />
          <Route path="/portfolio/:kind/:id" element={<ProjectDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
