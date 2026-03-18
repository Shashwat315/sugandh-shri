// ============================================================
// useMediaQuery.js
// Reactive media query hook — re-renders when breakpoint changes.
// Usage:
//   const isMobile  = useMediaQuery('(max-width: 768px)')
//   const isDesktop = useMediaQuery('(min-width: 1024px)')
//   const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
// ============================================================
import { useState, useEffect } from 'react'

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(query)
    const handler = e => setMatches(e.matches)

    // Modern API
    if (mql.addEventListener) {
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }
    // Legacy fallback
    mql.addListener(handler)
    return () => mql.removeListener(handler)
  }, [query])

  return matches
}

// Pre-built breakpoint hooks
export const useIsMobile  = () => useMediaQuery('(max-width: 768px)')
export const useIsTablet  = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const usePrefersDark = () => useMediaQuery('(prefers-color-scheme: dark)')
