// ============================================================
// ScentQuizPage.jsx  /scent-quiz
// Standalone page wrapping the ScentQuiz widget
// ============================================================
import { motion } from 'framer-motion'
import ScentQuiz from '../components/ScentQuiz'

export default function ScentQuizPage() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
      style={{ paddingTop:100, minHeight:'100vh', background:'var(--ivory)' }}>
      <div style={{ padding:'60px 60px 30px' }}>
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
          <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:14 }}>✦ Personalised Discovery</span>
          <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(28px,4vw,52px)', color:'var(--text-main)', marginBottom:16 }}>Scent Discovery Quiz</h1>
          <p style={{ fontSize:13, color:'var(--text-muted)', fontWeight:300, maxWidth:500, marginBottom:48 }}>
            Answer five simple questions. We will recommend the fragrances that best match your personality, preferences, and occasions.
          </p>
        </motion.div>
      </div>
      <div style={{ padding:'0 60px 80px' }}>
        <ScentQuiz />
      </div>
    </motion.div>
  )
}
