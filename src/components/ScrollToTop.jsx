// ScrollToTop — warm theme
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function ScrollToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => { const h = () => setShow(window.scrollY > 600); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h) }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}
          onClick={() => window.scrollTo({top:0,behavior:'smooth'})}
          style={{ position:'fixed', bottom:32, left:24, zIndex:700, width:42, height:42, borderRadius:'50%', background:'var(--brown)', color:'var(--ivory)', border:'none', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'var(--shadow-md)' }}
          whileHover={{ scale:1.1, background:'var(--brown-dark)', boxShadow:'var(--shadow-lg)' }} whileTap={{ scale:0.92 }}>
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
