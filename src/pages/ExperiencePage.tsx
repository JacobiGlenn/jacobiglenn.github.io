import { AwardRail } from '@/components/site/AwardRail'
import { PhotoStack } from '@/components/site/PhotoStack'
import { experience } from '@/lib/content'
import type { ExpJob } from '@/lib/types'

function JobCard({ job, index }: { job: ExpJob; index: number }) {
  return (
    <article id={job.id} className="exp-card hud-frame relative scroll-mt-28 p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row">
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
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {job.companyHref ? (
              <a href={job.companyHref} target="_blank" rel="noopener noreferrer">
                {job.company}
              </a>
            ) : (
              job.company
            )}
          </p>
          {job.subroles?.length ? (
            <div className="mt-4 space-y-4">
              {job.subroles.map((s) => (
                <div key={s.role} className="border-l border-[var(--color-line)] pl-3">
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
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-1">
            {job.tags.map((t) => (
              <span key={t} className="exp-tag border border-[var(--color-line)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink)]">
                {t}
              </span>
            ))}
          </div>
        </div>
        <PhotoStack galleryId={job.galleryId} photos={job.photos} />
      </div>
    </article>
  )
}

export function ExperiencePage() {
  return (
    <div className="space-y-8 py-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">Service record</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] md:text-6xl">Work Experience</h1>
      </div>
      <div id="summary" className="hud-frame scroll-mt-28 p-5 leading-relaxed text-[var(--color-muted)]">
        {experience.summary}
      </div>
      <div className="relative space-y-5 before:absolute before:bottom-8 before:left-[11px] before:top-8 before:w-px before:bg-[var(--color-line)] md:before:left-[13px]">
        {experience.jobs.map((j, i) => (
          <div key={j.id} className="relative pl-8">
            <span className="absolute left-0 top-8 h-3 w-3 border border-[var(--color-accent)] bg-[var(--color-ground)]" />
            <JobCard job={j} index={i} />
          </div>
        ))}
      </div>
      <div id="education" className="scroll-mt-28">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">Education</p>
        <div className="grid gap-4 md:grid-cols-2">
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
    </div>
  )
}
