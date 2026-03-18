// ============================================================
// BottleViewer.jsx
// Interactive CSS 3D bottle viewer — drag to rotate.
// No WebGL needed; uses CSS perspective + transform3d.
// Shows on ProductDetailPage for immersive product experience.
// ============================================================
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function BottleSVGFace({ colors, name, opacity = 1 }) {
  const [c1, c2, c3] = colors || ['#1a1208','#251c0e','#0d0b06']
  const uid = `bv_${(name||'x').replace(/\s+/g,'')}`
  return (
    <svg width="160" height="320" viewBox="0 0 160 320" fill="none" style={{ opacity }}>
      <defs>
        <linearGradient id={`${uid}body`} x1="30" y1="0" x2="130" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={c1}/>
          <stop offset="40%"  stopColor={c2}/>
          <stop offset="100%" stopColor={c3}/>
        </linearGradient>
        <linearGradient id={`${uid}cap`} x1="52" y1="28" x2="108" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#8B6914"/>
          <stop offset="50%"  stopColor="#C6A75A"/>
          <stop offset="100%" stopColor="#6B4E10"/>
        </linearGradient>
        <linearGradient id={`${uid}hi`} x1="30" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="rgba(255,255,255,0.08)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      {/* Shadow base */}
      <ellipse cx="80" cy="312" rx="52" ry="7" fill="rgba(198,167,90,0.08)"/>
      {/* Body */}
      <path d="M42 106 Q34 130 32 162 L30 268 Q30 290 44 298 L116 298 Q130 290 130 268 L128 162 Q126 130 118 106 Z"
        fill={`url(#${uid}body)`} stroke="rgba(198,167,90,0.3)" strokeWidth="0.5"/>
      {/* Neck */}
      <rect x="66" y="60" width="28" height="52" rx="4"
        fill={c1} stroke="rgba(198,167,90,0.25)" strokeWidth="0.5"/>
      {/* Cap */}
      <rect x="52" y="28" width="56" height="38" rx="7"
        fill={`url(#${uid}cap)`}/>
      <line x1="52" y1="44" x2="108" y2="44" stroke="rgba(245,241,233,0.2)" strokeWidth="0.6"/>
      {/* Label */}
      <rect x="38" y="158" width="84" height="88" rx="2"
        fill="rgba(0,0,0,0.32)" stroke="rgba(198,167,90,0.18)" strokeWidth="0.5"/>
      <line x1="46" y1="170" x2="114" y2="170" stroke="rgba(198,167,90,0.35)" strokeWidth="0.5"/>
      <line x1="46" y1="238" x2="114" y2="238" stroke="rgba(198,167,90,0.35)" strokeWidth="0.5"/>
      {/* Label ornaments */}
      <path d="M44 168 L52 168 L52 170 L44 170 Z" fill="rgba(198,167,90,0.4)"/>
      <path d="M44 168 L44 176 L46 176 L46 168 Z" fill="rgba(198,167,90,0.4)"/>
      <path d="M116 168 L108 168 L108 170 L116 170 Z" fill="rgba(198,167,90,0.4)"/>
      <path d="M116 168 L116 176 L114 176 L114 168 Z" fill="rgba(198,167,90,0.4)"/>
      <text x="80" y="194" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="8" fill="rgba(198,167,90,0.85)" letterSpacing="2">SUGANDH</text>
      <text x="80" y="207" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="8" fill="rgba(198,167,90,0.85)" letterSpacing="2">SHRI</text>
      <text x="80" y="224" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontSize="6.5" fill="rgba(198,167,90,0.45)" letterSpacing="3">
        {(name||'').toUpperCase().slice(0,14)}
      </text>
      {/* Highlight streak */}
      <path d="M44 120 Q40 148 38 182 L42 182 Q44 148 48 120 Z"
        fill={`url(#${uid}hi)`}/>
    </svg>
  )
}

export default function BottleViewer({ product }) {
  const { name, gradColors } = product || {}
  const rotateY = useMotionValue(15)
  const rotateX = useMotionValue(-5)
  const smoothY = useSpring(rotateY, { stiffness: 120, damping: 20 })
  const smoothX = useSpring(rotateX, { stiffness: 120, damping: 20 })

  const dragging  = useRef(false)
  const lastPos   = useRef({ x:0, y:0 })
  const autoTimer = useRef(null)
  const autoAngle = useRef(15)

  // Auto-rotation when idle
  const startAuto = useCallback(() => {
    clearInterval(autoTimer.current)
    autoTimer.current = setInterval(() => {
      autoAngle.current = (autoAngle.current + 0.4) % 360
      if (!dragging.current) rotateY.set(autoAngle.current)
    }, 16)
  }, [rotateY])

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoTimer.current)
  }, [startAuto])

  const onDragStart = e => {
    dragging.current = true
    clearInterval(autoTimer.current)
    lastPos.current = { x: e.clientX || e.touches?.[0]?.clientX, y: e.clientY || e.touches?.[0]?.clientY }
  }
  const onDragMove = e => {
    if (!dragging.current) return
    const cx = e.clientX || e.touches?.[0]?.clientX
    const cy = e.clientY || e.touches?.[0]?.clientY
    const dx = cx - lastPos.current.x
    const dy = cy - lastPos.current.y
    rotateY.set(rotateY.get() + dx * 0.6)
    rotateX.set(Math.max(-25, Math.min(25, rotateX.get() - dy * 0.4)))
    lastPos.current = { x: cx, y: cy }
    autoAngle.current = rotateY.get()
  }
  const onDragEnd = () => {
    dragging.current = false
    setTimeout(startAuto, 2000)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:24, userSelect:'none' }}>
      <div
        onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
        onTouchStart={onDragStart} onTouchMove={onDragMove} onTouchEnd={onDragEnd}
        style={{ perspective:'600px', perspectiveOrigin:'50% 60%', cursor:'grab' }}
      >
        <motion.div
          style={{
            rotateY: smoothY, rotateX: smoothX,
            transformStyle: 'preserve-3d',
            width: 160, height: 320,
            position: 'relative',
          }}
        >
          {/* Front face */}
          <div style={{ position:'absolute', backfaceVisibility:'hidden' }}>
            <BottleSVGFace colors={gradColors} name={name} />
          </div>
          {/* Back face (flipped) */}
          <div style={{ position:'absolute', transform:'rotateY(180deg)', backfaceVisibility:'hidden' }}>
            <BottleSVGFace colors={gradColors} name={name} opacity={0.7} />
          </div>
          {/* Side glow */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, rgba(198,167,90,0.03) 0%, transparent 50%)', pointerEvents:'none' }} />
        </motion.div>
      </div>

      {/* Drag hint */}
      <div style={{ fontSize:9, letterSpacing:3, color:'rgba(198,167,90,0.35)', textTransform:'uppercase', display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:14 }}>⟵</span>
        DRAG TO ROTATE
        <span style={{ fontSize:14 }}>⟶</span>
      </div>
    </div>
  )
}
