// Toast — warm theme
import { motion, AnimatePresence } from 'framer-motion'
export default function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div initial={{opacity:0,y:20,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12,scale:0.97}}
          style={{ position:'fixed', bottom:80, left:'50%', transform:'translateX(-50%)', zIndex:5000, background:'var(--brown)', color:'var(--ivory)', padding:'12px 28px', borderRadius:50, fontSize:12, fontFamily:'Montserrat,sans-serif', letterSpacing:2, boxShadow:'var(--shadow-lg)', whiteSpace:'nowrap' }}>
          ✓ {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
