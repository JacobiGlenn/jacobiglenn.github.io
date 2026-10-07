import { AwardRail } from '@/components/site/AwardRail'
import { Lightbox } from '@/components/site/Lightbox'
import { PhotoStack } from '@/components/site/PhotoStack'
import { experience } from '@/lib/content'
import type { ExpJob } from '@/lib/types'
import { useMemo, useState } from 'react'

const PREVIEW = 2

const SKILLS = [
  { id: 'teaching', label: 'Teaching' },
  { id: 'ux', label: 'UI / UX' },
  { id: 'js', label: 'JavaScript' },
  { id: 'ai', label: 'AI' },
  { id: 'design', label: 'Graphic Design' },
  { id: 'service', label: 'US Army' },
  { id: 'it', label: 'IT Support' },
  { id: 'broadcast', label: 'Broadcast' },
] as const

function matchesSkill(job: ExpJob, skill: string) {
  const blob = `${job.title} ${job.company} ${job.tags.join(' ')} ${job.category}`.toLowerCase()
  if (skill === 'teaching') return /teach|sensei|robotics|code ninjas/.test(blob)
  if (skill === 'ux') return /figma|ux|prototyp|chakra|commit the change/.test(blob)
  if (skill === 'js') return /javascript|unity|impact/.test(blob)
  if (skill === 'ai') return /ai |llm|prompt|handshake/.test(blob)
  if (skill === 'design') return /graphic|adobe|brand|social media designer/.test(blob)
  if (skill === 'service') return /army|15h|pneudraul/.test(blob)
  if (skill === 'it') return /it support|computing assistant|geek squad|merage/.test(blob)
  if (skill === 'broadcast') return /broadcast|nfhs|crew lead/.test(blob)
  return true
}

function yearOf(s: string) {
  const m = s.match(/(\d{4})/)
  return m ? Number(m[1]) : null
}

function jobSpan(job: ExpJob) {
  const a = yearOf(job.start) ?? 2020
  const b = job.end.toLowerCase() === 'present' ? new Date().getFullYear() : (yearOf(job.end) ?? a)
  return [a, b] as const
}

function isCurrentRole(job: ExpJob) {
  if (job.end.toLowerCase() !== 'present') return false
  if (job.id === 'social') return false
  if (/freelance/i.test(job.company) && /social/i.test(`${job.title} ${job.tags.join(' ')}`)) return false
  return true
}

function previewBullets(job: ExpJob) {
  if (job.subroles?.length) return job.subroles.flatMap((s) => s.bullets).slice(0, PREVIEW)
  return job.bullets.slice(0, PREVIEW)
}

function fullBulletCount(job: ExpJob) {
  if (job.subroles?.length) return job.subroles.reduce((n, s) => n + s.bullets.length, 0)
  return job.bullets.length
}

function JobCard({ job, index, onOpen }: { job: ExpJob; index: number; onOpen: () => void }) {
  const preview = previewBullets(job)
  const extra = fullBulletCount(job) - preview.length
  return (
    <article id={job.id} className="exp-card hud-frame relative scroll-mt-28 p-5 md:p-6">
      <button type="button" className="absolute inset-0 z-[1] cursor-pointer" aria-label={`More info: ${job.title}`} onClick={onOpen} />
      <div className="pointer-events-none relative z-[2] flex flex-col gap-4 md:flex-row">
        <div className="flex shrink-0 items-start gap-3 md:w-44 md:flex-col">
          <div
            className="grid h-12 w-12 place-items-center font-[family-name:var(--font-display)]"
            style={{ background: job.logo.bg, color: job.logo.color, fontSize: job.logo.size || '1rem' }}
          >
            {job.logo.letter}
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {String(index + 1).padStart(2, '0')}
            </p>
            <p className="mt-1 font-mono text-[11px] text-[var(--color-muted)]">{job.dateLabel}</p>
            <p className="font-mono text-[11px] text-[var(--color-muted)]">{job.location}</p>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-display)] text-2xl uppercase leading-none">{job.title}</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{job.company}</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
            {preview.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
            {extra > 0 ? `More info · ${extra} more` : 'More info'}
          </p>
          <div className="mt-4 flex flex-wrap gap-1">
            {job.tags.slice(0, 5).map((t) => (
              <span key={t} className="exp-tag border border-[var(--color-line)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink)]">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="pointer-events-auto relative z-[3]">
          <PhotoStack galleryId={job.galleryId} photos={job.photos} />
        </div>
      </div>
    </article>
  )
}

export function ExperiencePage() {
  const [open, setOpen] = useState<ExpJob | null>(null)
  const [skill, setSkill] = useState<string | null>(null)
  const [currentOnly, setCurrentOnly] = useState(false)
  const [year, setYear] = useState<number | null>(null)

  const all = useMemo(() => [...experience.jobs].sort((a, b) => b.dateSort - a.dateSort), [])
  const years = useMemo(() => {
    const set = new Set<number>()
    for (const j of all) {
      const [a, b] = jobSpan(j)
      for (let y = a; y <= b; y++) set.add(y)
    }
    return [...set].sort((a, b) => a - b)
  }, [all])

  const jobs = all.filter((j) => {
    if (skill && !matchesSkill(j, skill)) return false
    if (currentOnly && !isCurrentRole(j)) return false
    if (year) {
      const [a, b] = jobSpan(j)
      if (year < a || year > b) return false
    }
    return true
  })

  const chip = (on: boolean) =>
    `border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
      on ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[#111]' : 'border-[var(--color-line)] text-[var(--color-muted)]'
    }`

  return (
    <div className="space-y-8 py-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">Service record</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] md:text-6xl">Work Experience</h1>
      </div>

      <div className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">Key skills</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={chip(!skill)} onClick={() => setSkill(null)}>
            All
          </button>
          {SKILLS.map((s) => (
            <button key={s.id} type="button" className={chip(skill === s.id)} onClick={() => setSkill(skill === s.id ? null : s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={chip(currentOnly)} onClick={() => setCurrentOnly((v) => !v)}>
            Current roles
          </button>
          <span className="mx-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-line)]">/</span>
          {years.map((y) => (
            <button key={y} type="button" className={chip(year === y)} onClick={() => setYear(year === y ? null : y)}>
              {y}
            </button>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Showing {jobs.length} of {all.length}
        </p>
      </div>

      <div id="summary" className="hud-frame scroll-mt-28 p-5 leading-relaxed text-[var(--color-muted)]">
        {experience.summary}
      </div>
      <div className="relative space-y-5 before:absolute before:bottom-8 before:left-[11px] before:top-8 before:w-px before:bg-[var(--color-line)] md:before:left-[13px]">
        {jobs.map((j, i) => (
          <div key={j.id} className="relative pl-8">
            <span className="absolute left-0 top-8 h-3 w-3 border border-[var(--color-accent)] bg-[var(--color-ground)]" />
            <JobCard job={j} index={i} onOpen={() => setOpen(j)} />
          </div>
        ))}
        {!jobs.length ? (
          <p className="pl-8 font-mono text-sm text-[var(--color-muted)]">No roles match that filter.</p>
        ) : null}
      </div>
      <div id="education" className="scroll-mt-28">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">Education</p>
        <div className="grid gap-4 md:grid-cols-3">
          {experience.education.map((e) => (
            <article key={e.school} className="exp-card hud-frame flex items-start gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-[family-name:var(--font-display)] text-2xl uppercase">{e.school}</p>
                <p className="mt-1 text-sm">{e.degree}</p>
                <p className="text-sm text-[var(--color-muted)]">{e.minor}</p>
                <p className="mt-2 font-mono text-[11px] text-[var(--color-accent)]">{e.date}</p>
              </div>
              <PhotoStack galleryId={e.galleryId} />
            </article>
          ))}
        </div>
      </div>
      <div id="honors" className="scroll-mt-28">
        <AwardRail honors={experience.honors} />
      </div>
      <p className="font-mono text-xs text-[var(--color-muted)]">
        Full profile:{' '}
        <a href="https://linkedin.com/in/jacobiglenn" target="_blank" rel="noopener noreferrer">
          linkedin.com/in/jacobiglenn
        </a>
      </p>

      <Lightbox open={!!open} onClose={() => setOpen(null)} title={open?.title || 'Role'}>
        {open ? (
          <>
            {open.companyHref ? (
              <a href={open.companyHref} target="_blank" rel="noopener noreferrer">
                {open.company}
              </a>
            ) : (
              <p className="text-sm text-[var(--color-muted)]">{open.company}</p>
            )}
            <p className="mt-1 font-mono text-[11px] text-[var(--color-accent)]">
              {open.dateLabel} · {open.location}
            </p>
            {open.subroles?.length ? (
              <div className="mt-4 space-y-4">
                {open.subroles.map((s) => (
                  <div key={s.role}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
                      {s.role} · {s.date}
                    </p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
                {open.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex flex-wrap gap-1">
              {open.tags.map((t) => (
                <span key={t} className="border border-[var(--color-line)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]">
                  {t}
                </span>
              ))}
            </div>
          </>
        ) : null}
      </Lightbox>
    </div>
  )
}
