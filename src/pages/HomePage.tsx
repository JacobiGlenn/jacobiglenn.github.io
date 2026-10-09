import { SiteCard } from '@/components/site/SiteCard'
import { MiniGridCard } from '@/components/site/MiniGridCard'
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
          UC Irine | US Army | Code Ninjas | Merage Tech
        </p>
        <FontCycleName text="Jacobi Glenn" />
        <p className="mt-6 max-w-8xl text-lg leading-relaxed text-[var(--color-muted)]">
          I'm an aspiring full-stack developer studying Software Engineering and Computer Science at UC Irvine,
          with a Cybersecurity degree on the side at American Military University. When I'm not coding,
          I'm in the Army National Guard fixing aircraft hydraulics and training in UCI's ROTC program.
          At UCI I'm in Commit the Change, a club that builds software for local nonprofits, and AI @ UCI, a club that explores the latest in AI and machine learning.
          I love learning and fill my free time up with reading, writing, language learning, and going to workshops. My hobbies
          are a little more outdoorsy, like hiking, camping, and night runs, but I also enjoy gaming and music production!
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="border border-[var(--color-line)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]">SWE // CS // Cyber</span>
          <span className="border border-[var(--color-line)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]">UCI // AMU</span>
        </div>
      </section>

      <section id="objective" className="hud-frame scroll-mt-28 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">Objective</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl uppercase">Personal Goals</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[var(--color-muted)]">
          My goal when I graduate is to be a full time software engineer and hopefully work at the
          likes of Microsoft, Apple, or Meta. I am aiming to comission as an Army Signal Corps Officer
          through the Army National Guard with a long term goal of reaching Captain rank. I am currently
          studying Spanish and hope to be bilingual by graduation, with a longer-term goal of four
          languages: Spanish, Mandarin, Japanese, and French. I love learning and I do not plan to stop.
        </p>
      </section>

      <section id="featured" className="scroll-mt-28">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">Active files // featured projects</p>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((p) => (
            <SiteCard key={p.id} project={p} />
          ))}
          <MiniGridCard />
        </div>
      </section>

      <section id="contact" className="hud-frame scroll-mt-28 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">Uplink</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl uppercase">Contact</h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
          Irvine, California (Pacific time). Email is the most reliable.{`\n`} I am available to take
          calls between 10am - 2pm on Tuesdays and Thursdays.
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
