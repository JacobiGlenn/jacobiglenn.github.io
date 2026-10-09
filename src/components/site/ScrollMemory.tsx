import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const keyFor = (pathname: string) => `scroll:${pathname}`

function readScroll(pathname: string) {
  try {
    return Number(sessionStorage.getItem(keyFor(pathname)) || 0)
  } catch {
    return 0
  }
}

function writeScroll(pathname: string, y: number) {
  try {
    sessionStorage.setItem(keyFor(pathname), String(y))
  } catch {
    /* private mode */
  }
}

export function ScrollMemory() {
  const location = useLocation()
  const navType = useNavigationType()
  const { pathname, hash } = location
  const pathRef = useRef(pathname)
  const detachScroll = useRef<(() => void) | null>(null)

  useEffect(() => {
    const prev = history.scrollRestoration
    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = prev
    }
  }, [])

  useLayoutEffect(() => {
    detachScroll.current?.()
    detachScroll.current = null
    if (pathRef.current !== pathname) {
      writeScroll(pathRef.current, window.scrollY)
      pathRef.current = pathname
    }
    if (navType === 'POP') {
      window.scrollTo(0, readScroll(pathname))
    } else if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView()
      else window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, navType])

  useEffect(() => {
    const save = () => writeScroll(pathname, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    detachScroll.current = () => window.removeEventListener('scroll', save)
    return () => {
      window.removeEventListener('scroll', save)
      detachScroll.current = null
    }
  }, [pathname])

  return null
}
