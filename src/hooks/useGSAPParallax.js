// ============================================================
// useGSAPParallax.js
// GSAP ScrollTrigger scrubbed parallax.
// Usage: const ref = useGSAPParallax({ yStart:'-15%', yEnd:'15%' })
// ============================================================
import { useRef, useEffect } from 'react'

export default function useGSAPParallax({ yStart = '-10%', yEnd = '10%', scrub = 1.5 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    let ctx
    const load = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const el = ref.current
      if (!el) return

      ctx = gsap.context(() => {
        gsap.fromTo(el,
          { y: yStart },
          {
            y: yEnd,
            ease: 'none',
            scrollTrigger: { trigger: el, start:'top bottom', end:'bottom top', scrub }
          }
        )
      }, el)
    }
    load()
    return () => ctx?.revert()
  }, [])

  return ref
}
