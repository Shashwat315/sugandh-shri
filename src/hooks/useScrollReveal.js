// ============================================================
// useScrollReveal.js
// Custom hook: returns ref + isVisible for scroll-triggered
// entrance animations (wraps IntersectionObserver).
// Usage: const [ref, visible] = useScrollReveal(0.15)
// ============================================================
import { useRef, useState, useEffect } from 'react'

export default function useScrollReveal(threshold = 0.1, once = true) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, visible]
}
