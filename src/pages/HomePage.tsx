import { SiteCard } from '@/components/site/SiteCard'
import { FontCycleName } from '@/components/site/FontCycleName'
import { featuredProjects } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function HomePage() {
  const featured = featuredProjects()
  const [copied, setCopied] = useState(false)
  return (
    <div className="space-y-12 py-6">
      <section id="pitch" className="hero-plate scroll-mt-28">
        <div className="hero-meta">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">ctOS // identity</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-steel)]">Irvine · Pacific</span>
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Soph @ UC Irvine | Coding Tutor | US Army
        </p>
        <FontCycleName text="Jacobi Glenn" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-muted)]">
          I build full-stack products, work on UI/UX for a healthcare project with <strong className="text-[var(--color-ink)]">Commit the Change</strong>, and
          teach kids <strong className="text-[var(--color-ink)]">JavaScript</strong> and <strong className="text-[var(--color-ink)]">Unity</strong> at{' '}
          <strong className="text-[var(--color-ink)]">Code Ninjas</strong>. This is the long-form portfolio: case studies, code, writing, and a build log when
          the messy parts are worth documenting.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="border border-[var(--color-line)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]">SWE // CS</span>
          <span className="border border-[var(--color-line)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]">UCI</span>
          <span className="border border-[var(--color-accent)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">Live</span>
        </div>
      </section>

      <section id="objective" className="hud-frame scroll-mt-28 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">Objective</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl uppercase">What I am aiming for</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[var(--color-muted)]">
          My top goal is to be a software engineer in Redmond, Washington, working for Microsoft. I would also be thrilled at Apple or Amazon someday. I plan
          to earn an associate degree in cybersecurity through a community college while I finish my bachelor&apos;s. I am studying Spanish and want to be
          bilingual by graduation, with a longer-term goal of four languages: Spanish, Mandarin, Japanese, and French. I love learning and I do not plan to
          stop.
        </p>
      </section>

      <section id="featured" className="scroll-mt-28">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">Active files // featured</p>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((p) => (
            <SiteCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section id="contact" className="hud-frame scroll-mt-28 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">Uplink</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl uppercase">Contact</h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
          Irvine, California (Pacific time). Email is the most reliable. I will be away on military orders from April through September 2026 and largely
          unreachable during that window.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild>
            <a href="mailto:jacobiglenn@gmail.com">jacobiglenn@gmail.com</a>
          </Button>
          <Button asChild>
            <a href="https://linkedin.com/in/jacobiglenn" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button asChild>
            <a href="https://github.com/JacobiGlenn" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <Button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText('971-300-5659')
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1600)
            }}
          >
            {copied ? 'Copied' : '971-300-5659'}
          </Button>
        </div>
      </section>
    </div>
  )
}
