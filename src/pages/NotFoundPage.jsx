// ============================================================
// NotFoundPage.jsx  /* catch-all 404 */
// ============================================================
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
      style={{ paddingTop:160, textAlign:'center', minHeight:'80vh', background:'var(--ivory)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0 }}>
      <motion.div animate={{ rotate:[0,5,-5,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
        style={{ fontFamily:'Cinzel,serif', fontSize:120, color:'rgba(198,167,90,0.07)', lineHeight:1, marginBottom:0, userSelect:'none' }}>404</motion.div>
      <div style={{ fontFamily:'Cinzel,serif', fontSize:28, color:'var(--text-main)', marginBottom:16, marginTop:-20 }}>Fragrance Not Found</div>
      <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9, maxWidth:380, marginBottom:40, fontWeight:300 }}>
        The scent you are seeking has dissolved into the air. Let us guide you back to the collection.
      </p>
      <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' }}>
        <Link to="/" style={{ textDecoration:'none' }}>
          <motion.button style={{ border:'1px solid #C6A75A', color:'var(--gold)', padding:'14px 40px', fontSize:10, letterSpacing:3, background:'transparent', fontFamily:'Montserrat,sans-serif' }}
            whileHover={{ background:'rgba(198,167,90,0.08)' }}>← HOME</motion.button>
        </Link>
        <Link to="/shop" style={{ textDecoration:'none' }}>
          <motion.button style={{ background:'#C6A75A', border:'none', color:'#0B0B0B', padding:'14px 40px', fontSize:10, letterSpacing:3, fontFamily:'Montserrat,sans-serif', fontWeight:700 }}
            whileHover={{ background:'#E8D5A3' }}>EXPLORE SHOP</motion.button>
        </Link>
      </div>
    </motion.div>
  )
}
