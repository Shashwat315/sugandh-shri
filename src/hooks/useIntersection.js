// ============================================================
// useIntersection.js
// Tracks whether an element is in the viewport.
// Returns [ref, entry] — entry is the full IntersectionObserverEntry.
// Usage:
//   const [ref, entry] = useIntersection({ threshold: 0.2 })
//   const isVisible = entry?.isIntersecting ?? false
// ============================================================
import { useRef, useState, useEffect } from 'react'

export default function useIntersection(options = {}) {
  const ref     = useRef(null)
  const [entry, setEntry] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => setEntry(e),
      { threshold: 0.1, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.root, options.rootMargin])

  return [ref, entry]
}
