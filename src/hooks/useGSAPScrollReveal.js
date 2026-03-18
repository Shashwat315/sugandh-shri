// ============================================================
// useGSAPScrollReveal.js
// GSAP ScrollTrigger-based reveal for text lines and images.
// Usage:
//   const containerRef = useGSAPScrollReveal()
//   <div ref={containerRef}>...</div>
// All direct children with class "gsap-reveal" will animate.
// ============================================================
import { useRef, useEffect } from 'react'

export default function useGSAPScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    // Lazy-load GSAP + ScrollTrigger only when needed
    let ctx
    const load = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const el = ref.current
      if (!el) return

      const targets = el.querySelectorAll('.gsap-reveal')
      ctx = gsap.context(() => {
        targets.forEach((target, i) => {
          gsap.fromTo(target,
            { opacity: 0, y: options.y ?? 40 },
            {
              opacity: 1, y: 0,
              duration: options.duration ?? 1,
              ease: options.ease ?? 'power3.out',
              delay: i * (options.stagger ?? 0.1),
              scrollTrigger: {
                trigger: target,
                start: options.start ?? 'top 85%',
                once: true,
              }
            }
          )
        })
      }, el)
    }
    load()
    return () => ctx?.revert()
  }, [])

  return ref
}
