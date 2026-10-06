const KEY = 'jacobiglenn_readable'

export function readReadable() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function writeReadable(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? '1' : '0')
  } catch {
    /* ignore */
  }
  document.documentElement.dataset.readable = on ? 'on' : 'off'
}
