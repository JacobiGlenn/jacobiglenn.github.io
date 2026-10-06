const COMMANDS = [
  'help',
  'guide',
  'commands',
  '?',
  'about',
  'bio',
  'projects',
  'portfolio',
  'exp',
  'experience',
  'experiences',
  'spin',
  'faster',
  'time',
  'date',
  'wisdom',
  'fun',
  'joke',
  'roll',
  'd20',
  '8ball',
  'eightball',
  'magic8',
  'magic8ball',
  'cls',
  'clear',
  'initialize',
  'init',
  'next',
  'nxt',
  'prev',
  'previous',
  'quit',
  'exit',
  'n',
  'p',
  'q',
]

const INIT_VARIANTS = [
  'initialize',
  'i',
  'init',
  'initilize',
  'intialize',
  'initailize',
  'initalize',
  'initilaize',
  'intialise',
  'initalise',
  'initailise',
  'initilise',
  'initlize',
  'initailze',
  'initaize',
  'inizialize',
  'initialise',
]

const ENTER_SITE = ['go', 'open', 'continue']

function levenshtein(a: string, b: string) {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
  }
  return dp[m][n]
}

export function isInitCommand(cmd: string) {
  return INIT_VARIANTS.includes(cmd)
}

export function parseEnterSite(raw: string) {
  const parts = raw.trim().split(/\s+/)
  const first = (parts[0] || '').toLowerCase()
  if (!ENTER_SITE.includes(first)) return null
  const rest = parts.slice(1).join(' ').trim()
  return { name: rest || 'Guest' }
}

export function looksLikeCommandTypo(cmd: string) {
  if (!cmd) return false
  if (COMMANDS.includes(cmd) || INIT_VARIANTS.includes(cmd) || ENTER_SITE.includes(cmd)) return true
  return COMMANDS.some((c) => c.length > 1 && levenshtein(cmd, c) <= 1)
}

const NAME_RE = /^[A-Za-z][A-Za-z '\-]{0,38}[A-Za-z]$|^[A-Za-z]{2,40}$/

export function validateName(raw: string): { ok: true; name: string } | { ok: false; reason: string } {
  const name = raw.trim()
  if (!name) return { ok: false, reason: 'Type HELP for commands, or enter your name to continue.' }
  const cmd = name.toLowerCase()
  if (looksLikeCommandTypo(cmd) && cmd !== 'cgg') {
    return {
      ok: false,
      reason: `"${name}" looks like a command. Type HELP, GO, OPEN, or CONTINUE — or type a real name (letters only).`,
    }
  }
  if (!NAME_RE.test(name)) {
    return {
      ok: false,
      reason: 'Names should be 2–40 letters (spaces, hyphen, apostrophe ok). Or type GO to enter as Guest.',
    }
  }
  return { ok: true, name }
}

export const HELP_TEXT = `COMMANDS (not case-sensitive)
  HELP       This list
  ABOUT      Origins + what this site is (also BIO)
  PROJECTS   Dev + design projects with blurbs (also PORTFOLIO)
  EXP        Browse work experience (then type N, P, or Q)
  SPIN       Speed up the ASCII portrait for ~10 seconds
  TIME       Local date and time
  WISDOM     Random one-liner
  ROLL       Roll a d20
  8BALL      Magic 8-Ball
  CLS        Clear the transcript
  GO / OPEN / CONTINUE   Enter the site (optional name after)

When you are ready, type your NAME and press Enter.
If your name matches a command, use GO YourName or a nickname.`
