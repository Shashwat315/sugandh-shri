// ============================================================
// useGSAPScrollAnimations.js
// Drop this hook into any page/section to wire up GSAP
// ScrollTrigger animations.  Call inside a useGSAP() callback
// so cleanup is automatic.
//
// Usage:
//   import { useGSAP }   from '@gsap/react'
//   import { gsap }      from 'gsap'
//   import { ScrollTrigger } from 'gsap/ScrollTrigger'
//   import { SplitText }     from 'gsap/SplitText'  // Club GreenSock
//   import setupScrollAnimations from '../hooks/useGSAPScrollAnimations'
//
//   gsap.registerPlugin(ScrollTrigger)
//
//   export default function MySection() {
//     const containerRef = useRef(null)
//     useGSAP(() => setupScrollAnimations(containerRef.current), { scope: containerRef })
//     return <section ref={containerRef} data-gsap-section>...</section>
//   }
//
// Recognised data-attributes on child elements:
//   data-gsap="fadeUp"       opacity 0→1, y 60→0
//   data-gsap="fadeLeft"     opacity 0→1, x -60→0
//   data-gsap="fadeRight"    opacity 0→1, x  60→0
//   data-gsap="scaleIn"      scale 0.85→1, opacity 0→1
//   data-gsap="parallax"     scrolls at 40% speed (use on bg images)
//   data-gsap="textReveal"   clip-path wipe (requires SplitText for chars)
//   data-gsap="counterUp"    animates data-target number from 0 to value
//   data-gsap="stagger"      children stagger fadeUp
//
// All animations respect prefers-reduced-motion.
// ============================================================
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const DUR  = REDUCED ? 0 : 0.9
const EASE = 'power3.out'
const STAGGER = 0.1

export default function setupScrollAnimations(container) {
  if (!container || REDUCED) return

  const defaults = {
    scrollTrigger: {
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
    duration: DUR,
    ease: EASE,
  }

  // ── fadeUp ───────────────────────────────────────────────
  container.querySelectorAll('[data-gsap="fadeUp"]').forEach(el => {
    gsap.from(el, {
      ...defaults,
      y: 60,
      opacity: 0,
      scrollTrigger: { ...defaults.scrollTrigger, trigger: el },
    })
  })

  // ── fadeLeft ─────────────────────────────────────────────
  container.querySelectorAll('[data-gsap="fadeLeft"]').forEach(el => {
    gsap.from(el, {
      ...defaults,
      x: -60,
      opacity: 0,
      scrollTrigger: { ...defaults.scrollTrigger, trigger: el },
    })
  })

  // ── fadeRight ────────────────────────────────────────────
  container.querySelectorAll('[data-gsap="fadeRight"]').forEach(el => {
    gsap.from(el, {
      ...defaults,
      x: 60,
      opacity: 0,
      scrollTrigger: { ...defaults.scrollTrigger, trigger: el },
    })
  })

  // ── scaleIn ──────────────────────────────────────────────
  container.querySelectorAll('[data-gsap="scaleIn"]').forEach(el => {
    gsap.from(el, {
      ...defaults,
      scale: 0.85,
      opacity: 0,
      scrollTrigger: { ...defaults.scrollTrigger, trigger: el },
    })
  })

  // ── parallax (background layers) ─────────────────────────
  container.querySelectorAll('[data-gsap="parallax"]').forEach(el => {
    const speed = parseFloat(el.dataset.speed || '0.4')
    gsap.to(el, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,   // ties directly to scroll position
      },
    })
  })

  // ── textReveal (clip-path wipe per line) ─────────────────
  container.querySelectorAll('[data-gsap="textReveal"]').forEach(el => {
    gsap.from(el, {
      clipPath: 'inset(100% 0 0 0)',
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { ...defaults.scrollTrigger, trigger: el },
    })
  })

  // ── counterUp (animates a number from 0 to data-target) ──
  container.querySelectorAll('[data-gsap="counterUp"]').forEach(el => {
    const target  = parseFloat(el.dataset.target || el.textContent)
    const suffix  = el.dataset.suffix  || ''
    const prefix  = el.dataset.prefix  || ''
    const decimals = (target % 1 !== 0) ? 1 : 0

    gsap.from({ val: 0 }, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate() { el.textContent = prefix + this.targets()[0].val.toFixed(decimals) + suffix },
      scrollTrigger: { ...defaults.scrollTrigger, trigger: el },
    })
  })

  // ── stagger (children stagger in) ────────────────────────
  container.querySelectorAll('[data-gsap="stagger"]').forEach(el => {
    gsap.from(el.children, {
      y: 50,
      opacity: 0,
      duration: DUR,
      ease: EASE,
      stagger: STAGGER,
      scrollTrigger: { ...defaults.scrollTrigger, trigger: el },
    })
  })

  // ── goldLine (width 0 → 100%) ─────────────────────────────
  container.querySelectorAll('[data-gsap="goldLine"]').forEach(el => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { ...defaults.scrollTrigger, trigger: el },
    })
  })
}

// ── Pinned horizontal scroll section ─────────────────────────
// Call this directly when you need a horizontal scrolling panel.
// containerRef: the outer wrapper that acts as the scroll pin point
// trackRef:     the inner flex row of cards to scroll sideways
export function setupHorizontalScroll(containerRef, trackRef) {
  if (!containerRef || !trackRef || REDUCED) return

  const tl = gsap.to(trackRef, {
    xPercent: -100 * (trackRef.children.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef,
      pin: true,
      scrub: 1,
      snap: 1 / (trackRef.children.length - 1),
      end: () => `+=${containerRef.offsetWidth * (trackRef.children.length - 1)}`,
    },
  })

  return () => tl.scrollTrigger?.kill()
}

// ── Magnetic button effect ────────────────────────────────────
// Attach to a button DOM element for a gentle magnet pull on hover.
export function magneticButton(el) {
  if (!el || REDUCED) return
  const strength = 25

  const onMove = (e) => {
    const rect  = el.getBoundingClientRect()
    const cx    = rect.left + rect.width  / 2
    const cy    = rect.top  + rect.height / 2
    const dx    = (e.clientX - cx) / (rect.width  / 2) * strength
    const dy    = (e.clientY - cy) / (rect.height / 2) * strength
    gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
  }
  const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}

// ── Smooth reveal timeline for a hero section ─────────────────
// Returns a GSAP timeline. Call .play() or let ScrollTrigger drive it.
export function heroRevealTimeline(selectors) {
  const tl = gsap.timeline({ paused: true })

  if (selectors.tag)   tl.from(selectors.tag,   { opacity:0, y:20, duration:0.6, ease:EASE }, 0.3)
  if (selectors.title) tl.from(selectors.title,  { opacity:0, y:60, clipPath:'inset(100% 0 0 0)', duration:1, ease:'expo.out', stagger:0.15 }, 0.5)
  if (selectors.sub)   tl.from(selectors.sub,    { opacity:0, y:20, duration:0.6, ease:EASE }, 1.1)
  if (selectors.btns)  tl.from(selectors.btns,   { opacity:0, y:20, duration:0.5, ease:EASE }, 1.3)

  return tl
}
