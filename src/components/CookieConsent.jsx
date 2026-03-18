// CookieConsent — warm sandalwood theme
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const KEY = 'ss_cookie_v2'
export default function CookieConsent() {
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => { if (!localStorage.getItem(KEY)) setShow(true) }, 3500); return () => clearTimeout(t) }, [])
  const accept = (all) => { localStorage.setItem(KEY, all?'all':'essential'); setShow(false) }
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:16}} transition={{duration:0.4}}
          style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:2500, background:'var(--ivory)', borderRadius:10, boxShadow:'var(--shadow-xl)', border:'1px solid rgba(106,78,66,0.12)', padding:'clamp(16px,2.5vw,24px) clamp(18px,3vw,28px)', maxWidth:'clamp(300px,90vw,520px)', width:'90vw' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:13, color:'var(--brown)', marginBottom:6 }}>We use cookies</div>
              <p style={{ fontSize:11, color:'var(--text-muted)', lineHeight:1.7, fontFamily:'Lora,serif' }}>We use cookies to enhance your experience and analyse site performance. By accepting, you agree to our use of cookies.</p>
            </div>
            <div style={{ display:'flex', gap:8, flexShrink:0, alignItems:'center', flexWrap:'wrap' }}>
              <button onClick={() => accept(false)} style={{ background:'transparent', border:'1.5px solid rgba(106,78,66,0.25)', color:'var(--text-muted)', padding:'8px 16px', fontSize:9, letterSpacing:2, fontFamily:'Montserrat,sans-serif', borderRadius:4, transition:'all 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='var(--brown)'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(106,78,66,0.25)'}>
                ESSENTIAL ONLY
              </button>
              <button onClick={() => accept(true)} className="btn-primary" style={{ borderRadius:4, padding:'8px 18px', fontSize:9 }}>
                ACCEPT ALL
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
