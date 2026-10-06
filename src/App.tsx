import { Layout } from '@/pages/Layout'
import { HomePage } from '@/pages/HomePage'
import { PortfolioPage } from '@/pages/PortfolioPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ExperiencePage } from '@/pages/ExperiencePage'
import { BlogPage } from '@/pages/BlogPage'
import { BootForm } from '@/components/site/BootForm'
import { useCallback, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function App() {
  const [booting, setBooting] = useState(true)
  const finishBoot = useCallback(() => setBooting(false), [])

  return (
    <>
      {booting ? <BootForm onDone={finishBoot} /> : null}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio/design" element={<PortfolioPage />} />
          <Route path="/portfolio/dev" element={<PortfolioPage />} />
          <Route path="/portfolio/design/:id" element={<ProjectDetailPage />} />
          <Route path="/portfolio/dev/:id" element={<ProjectDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
