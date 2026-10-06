import { AwardRail } from '@/components/site/AwardRail'
import { PhotoStack } from '@/components/site/PhotoStack'
import { experience } from '@/lib/content'
import type { ExpJob } from '@/lib/types'

function JobCard({ job }: { job: ExpJob }) {
  return (
    <article className="hud-frame relative p-5 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-[var(--color-accent)]">
      <div className="flex gap-4">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center font-[family-name:var(--font-display)]"
          style={{ background: job.logo.bg, color: job.logo.color, fontSize: job.logo.size || '1rem' }}
        >
          {job.logo.letter}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl uppercase">{job.title}</p>
              <p className="text-sm text-[var(--color-muted)]">
                {job.companyHref ? (
                  <a href={job.companyHref} target="_blank" rel="noopener noreferrer">
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </p>
            </div>
            <div className="text-right font-mono text-[11px] text-[var(--color-muted)]">
              <p>{job.dateLabel}</p>
              <p>{job.location}</p>
            </div>
          </div>
          {job.subroles?.length ? (
            <div className="mt-3 space-y-3">
              {job.subroles.map((s) => (
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
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          <div className="mt-3 flex flex-wrap gap-1">
            {job.tags.map((t) => (
              <span key={t} className="border border-[var(--color-line)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink)]">
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
    <div className="space-y-8 px-4 py-8 md:px-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">Employer view // service record</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl uppercase">Work Experience</h1>
      </div>
      <div className="hud-frame p-5 leading-relaxed text-[var(--color-muted)]">{experience.summary}</div>
      <div className="space-y-4">
        {experience.jobs.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">Education</p>
        <div className="grid gap-4 md:grid-cols-2">
          {experience.education.map((e) => (
            <article key={e.school} className="hud-frame flex items-start gap-3 p-4">
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
      <AwardRail honors={experience.honors} />
      <p className="font-mono text-xs text-[var(--color-muted)]">
        Full profile:{' '}
        <a href="https://linkedin.com/in/jacobiglenn" target="_blank" rel="noopener noreferrer">
          linkedin.com/in/jacobiglenn
        </a>
      </p>
    </div>
  )
}
