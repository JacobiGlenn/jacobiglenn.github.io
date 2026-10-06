const NORMAL_VISIT_KEY = 'jacobiglenn_normal_visit'
const LAST_USER_KEY = 'jacobiglenn_last_user'
const TYPED_CGG_KEY = 'jacobiglenn_typed_cgg'
const NORMAL_VISIT_TTL = 24 * 60 * 60 * 1000

export function shouldSkipTerminal() {
  try {
    const params = new URLSearchParams(window.location.search)
    if (params.get('direct') === '1') return true
    const lastUser = (localStorage.getItem(LAST_USER_KEY) || '').trim()
    if (lastUser.toLowerCase() === 'cgg') return false
    const raw = localStorage.getItem(NORMAL_VISIT_KEY)
    if (!raw) return false
    const ts = parseInt(raw, 10)
    return Date.now() - ts <= NORMAL_VISIT_TTL
  } catch {
    return false
  }
}

export function markVisited(name: string) {
  try {
    localStorage.setItem(NORMAL_VISIT_KEY, String(Date.now()))
    if (name.toLowerCase() === 'cgg') {
      localStorage.setItem(LAST_USER_KEY, 'cGG')
      localStorage.setItem(TYPED_CGG_KEY, '1')
    } else if (name) {
      localStorage.setItem(LAST_USER_KEY, name)
    }
  } catch {
    /* ignore */
  }
}

export const CGG_BYPASS = 'cgg'
