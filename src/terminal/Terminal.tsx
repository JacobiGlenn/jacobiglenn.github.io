import { useEffect, useRef, useState } from 'react'
import { AsciiHead } from '@/components/site/AsciiHead'
import {
  HELP_TEXT,
  isInitCommand,
  parseEnterSite,
  validateName,
} from '@/lib/commands'
import { experience, expSnippets, sortPortfolio, projects } from '@/lib/content'
import { CGG_BYPASS, markVisited } from '@/lib/visit'
import { Button } from '@/components/ui/button'

const PROMPT = 'PS C://Users/Unknown $'
const WISDOM = [
  'Your code compiled first try. (In an alternate universe.)',
  'git commit -m "fixed it" // nobody knows what "it" is',
  'Remember: every senior engineer was once paste-from-Stack-Overflow years old.',
  'The bug is in production. The bug is always in production.',
  'Hydrate. Stretch. Then blame caching.',
  'If it works on your machine, ship your machine.',
  'Semicolons are optional. Regret is not.',
  'This terminal approves of your curiosity. The rest of the internet is on its own.',
]
const BALL = [
  'It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Yes, definitely.',
  'You may rely on it.',
  'As I see it, yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Very doubtful.',
]
const LOG_MSGS = [
  '[SYS] Protocol initialized',
  '[NET] Connection: LOCAL',
  '[AUTH] Awaiting input',
  '[BOOT] Kernel loaded',
  '[SEC] Firewall active',
  '[CORE] Scheduler online',
  '[SYS] Signal stable',
]

function projectsText() {
  let out = 'PORTFOLIO\n'
  for (const kind of ['dev', 'design'] as const) {
    out += `\n--- ${kind.toUpperCase()} ---\n`
    const list = sortPortfolio(projects[kind])
    if (!list.length) out += '(no projects yet)\n'
    list.forEach((c, i) => {
      out += `${i + 1}. ${c.title}\n`
      if (c.description) out += `   ${c.description.slice(0, 150)}\n`
    })
  }
  return out
}

export function Terminal({ onEnter }: { onEnter: (name: string) => void }) {
  const [started, setStarted] = useState(false)
  const [mode, setMode] = useState<'idle' | 'postinit' | 'exp'>('idle')
  const [out, setOut] = useState('Type "Initialize" to activate.')
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState<string[]>([])
  const [boostUntil, setBoostUntil] = useState(0)
  const [headOn, setHeadOn] = useState(false)
  const [logOn, setLogOn] = useState(false)
  const [guideOn, setGuideOn] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outRef = useRef<HTMLDivElement>(null)
  const expIdx = useRef(0)
  const snippets = expSnippets(experience.jobs)

  useEffect(() => {
    inputRef.current?.focus()
  }, [mode, started])

  useEffect(() => {
    outRef.current?.scrollTo(0, outRef.current.scrollHeight)
  }, [out])

  useEffect(() => {
    if (!logOn) return
    const id = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, `${LOG_MSGS[prev.length % LOG_MSGS.length]} [${new Date().toLocaleTimeString()}]`]
        return next.slice(-8)
      })
    }, 1600)
    return () => clearInterval(id)
  }, [logOn])

  function append(text: string) {
    setOut((o) => o + (o ? '\n' : '') + text)
  }

  function boot() {
    setStarted(true)
    window.setTimeout(() => setHeadOn(true), 200)
    window.setTimeout(() => setLogOn(true), 450)
    window.setTimeout(() => setGuideOn(true), 700)
    window.setTimeout(() => {
      append('\n(Welcome Protocol....)\n(Ready.)\nType HELP for commands, GO to enter, or type your name.')
      setMode('postinit')
    }, 800)
  }

  function enterSite(name: string) {
    markVisited(name)
    onEnter(name)
  }

  function handleLine(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!started) {
      if (cmd === CGG_BYPASS) {
        enterSite('cgg')
        return
      }
      if (isInitCommand(cmd)) {
        boot()
        return
      }
      if (raw.trim()) append('Unknown command. Type Initialize.')
      return
    }

    if (mode === 'exp') {
      if (cmd === 'n' || cmd === 'next') {
        expIdx.current = (expIdx.current + 1) % snippets.length
        const e = snippets[expIdx.current]
        append(`--- ${expIdx.current + 1} / ${snippets.length} ---\n${e.title}\n${e.lines.join('\n')}\n\n[N]ext · [P]revious · [Q]uit`)
        return
      }
      if (cmd === 'p' || cmd === 'prev' || cmd === 'previous') {
        expIdx.current = (expIdx.current - 1 + snippets.length) % snippets.length
        const e = snippets[expIdx.current]
        append(`--- ${expIdx.current + 1} / ${snippets.length} ---\n${e.title}\n${e.lines.join('\n')}\n\n[N]ext · [P]revious · [Q]uit`)
        return
      }
      if (cmd === 'q' || cmd === 'quit' || cmd === 'exit') {
        setMode('postinit')
        append('EXP closed. Type HELP, or enter your name.')
        return
      }
      append('In EXP mode: N (next), P (previous), Q (quit).')
      return
    }

    if (cmd === CGG_BYPASS) {
      enterSite('cgg')
      return
    }
    const go = parseEnterSite(raw)
    if (go) {
      enterSite(go.name)
      return
    }
    if (!raw.trim()) {
      append('Type HELP for commands, GO to enter as Guest, or type your name.')
      return
    }
    if (['help', 'guide', 'commands', '?'].includes(cmd)) {
      append(HELP_TEXT)
      return
    }
    if (cmd === 'exp' || cmd === 'experience' || cmd === 'experiences') {
      if (!snippets.length) {
        append('No experience records loaded.')
        return
      }
      setMode('exp')
      expIdx.current = 0
      const e = snippets[0]
      append(`--- 1 / ${snippets.length} ---\n${e.title}\n${e.lines.join('\n')}\n\n[N]ext · [P]revious · [Q]uit`)
      return
    }
    if (cmd === 'spin' || cmd === 'faster') {
      setBoostUntil(Date.now() + 10000)
      append('SPIN: faster rotation for ~10 seconds.')
      return
    }
    if (cmd === 'time' || cmd === 'date') {
      append(new Date().toString())
      return
    }
    if (cmd === 'about' || cmd === 'bio') {
      append(
        '=== ABOUT ===\n\nJacobi Glenn — Software Engineering + Computer Science at UC Irvine.\nBorn in California; Oregon for middle/high school; back in California at UCI.\nThis site: dev portfolio, design portfolio, blog, boot terminal.\nGoals and contact are on Home after you enter.',
      )
      return
    }
    if (cmd === 'projects' || cmd === 'portfolio') {
      append(projectsText())
      return
    }
    if (cmd === 'wisdom' || cmd === 'fun' || cmd === 'joke') {
      append(WISDOM[Math.floor(Math.random() * WISDOM.length)])
      return
    }
    if (cmd === 'roll' || cmd === 'd20') {
      const n = 1 + Math.floor(Math.random() * 20)
      append('d20 rolled: ' + n + (n === 20 ? '  (nat 20!)' : n === 1 ? '  (critical oof)' : ''))
      return
    }
    if (['8ball', 'eightball', 'magic8', 'magic8ball'].includes(cmd)) {
      append('The Magic 8-Ball says:\n  ' + BALL[Math.floor(Math.random() * BALL.length)])
      return
    }
    if (cmd === 'cls' || cmd === 'clear') {
      setOut('(cleared)\nTranscript cleared. Type HELP or enter your name.')
      return
    }

    const check = validateName(raw)
    if (!check.ok) {
      append(check.reason)
      return
    }
    enterSite(check.name)
  }

  return (
    <div className="relative grid h-dvh grid-cols-1 grid-rows-[1fr_auto] gap-0 bg-black p-3 text-[#efe8d6] md:grid-cols-[2fr_1fr] md:grid-rows-[1fr_0.45fr_1.1fr]">
      <div className="scanlines z-10" />
      <section className="relative z-20 flex min-h-0 flex-col border border-[#555] bg-[#050505] md:row-span-3">
        <div ref={outRef} className="flex-1 overflow-y-auto whitespace-pre-wrap p-4 font-mono text-[13px]">
          {out}
        </div>
        <form
          className="flex items-center gap-2 border-t border-[#333] px-4 py-3 font-mono text-[13px]"
          onSubmit={(e) => {
            e.preventDefault()
            const raw = input
            setInput('')
            setOut((o) => o + `\n${PROMPT} ${raw}`)
            handleLine(raw)
          }}
        >
          <span className="shrink-0 text-[var(--color-accent)]">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-w-0 flex-1 bg-transparent outline-none"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </form>
      </section>
      <section className={`relative z-20 hidden overflow-hidden border border-[#555] md:block ${headOn ? 'opacity-100' : 'opacity-40'}`}>
        {headOn ? <AsciiHead boostUntil={boostUntil} /> : null}
      </section>
      <section className={`relative z-20 hidden overflow-hidden border border-[#555] p-3 font-mono text-[10px] leading-relaxed md:block ${logOn ? 'opacity-100' : 'opacity-40'}`}>
        {logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </section>
      <section className={`relative z-20 hidden overflow-auto border border-[#555] p-3 font-mono text-[10px] leading-relaxed md:block ${guideOn ? 'opacity-100' : 'opacity-40'}`}>
        <p className="mb-2 tracking-[0.2em]">GUIDEBOOK</p>
        <p>1. Type Initialize to boot.</p>
        <p>2. HELP, ABOUT, PROJECTS, EXP, then N/P/Q.</p>
        <p>3. Type your name, or GO / OPEN / CONTINUE.</p>
        <p className="mt-2">Return visits skip this screen for 24h. Add ?direct=1 to skip now.</p>
      </section>
      <div className="relative z-30 col-span-full mt-2 flex justify-end md:absolute md:right-4 md:top-4 md:mt-0">
        <Button
          type="button"
          onClick={() => {
            markVisited('Guest')
            onEnter('Guest')
          }}
        >
          Skip to site
        </Button>
      </div>
    </div>
  )
}
