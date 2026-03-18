// ============================================================
// ScentQuiz.jsx — Interactive "Find Your Fragrance" quiz
// 5 questions → personalised product recommendations.
// Framer Motion: slide transitions between questions,
//   result card entrance, progress bar fill animation.
// ============================================================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const QUESTIONS = [
  {
    id: 1,
    q: 'What time of day do you most often wear fragrance?',
    options: [
      { label:'Morning freshness', value:'morning', icon:'🌅' },
      { label:'Through the working day', value:'day', icon:'☀️' },
      { label:'Evening and occasions', value:'evening', icon:'🌙' },
      { label:'Special moments only', value:'special', icon:'✨' },
    ],
  },
  {
    id: 2,
    q: 'Which landscape speaks to you most?',
    options: [
      { label:'Rose garden at dawn', value:'floral', icon:'🌹' },
      { label:'Ancient forest after rain', value:'earthy', icon:'🌿' },
      { label:'Desert oasis at dusk', value:'oriental', icon:'🏺' },
      { label:'Sandalwood temple', value:'woody', icon:'🪵' },
    ],
  },
  {
    id: 3,
    q: 'How long do you want your fragrance to last?',
    options: [
      { label:'2–4 hours, light trail', value:'light', icon:'💨' },
      { label:'6–8 hours, moderate', value:'medium', icon:'🍃' },
      { label:'All day, strong presence', value:'strong', icon:'🔥' },
      { label:'Days, a true signature', value:'extreme', icon:'♾️' },
    ],
  },
  {
    id: 4,
    q: 'Which word best describes your personality?',
    options: [
      { label:'Romantic & soft', value:'romantic', icon:'🌸' },
      { label:'Grounded & serene', value:'grounded', icon:'🧘' },
      { label:'Bold & magnetic', value:'bold', icon:'⚡' },
      { label:'Sophisticated & rare', value:'rare', icon:'💎' },
    ],
  },
  {
    id: 5,
    q: 'Which note family excites you most?',
    options: [
      { label:'Fresh florals — rose, jasmine', value:'floral', icon:'🌺' },
      { label:'Earthy & green — vetiver, moss', value:'green', icon:'🌱' },
      { label:'Warm & spicy — oud, amber', value:'warm', icon:'🕯️' },
      { label:'Creamy & smooth — sandalwood', value:'creamy', icon:'🤍' },
    ],
  },
]

// Recommendation logic
function getRecommendations(answers) {
  const scores = {}
  products.forEach(p => { scores[p.id] = 0 })

  const { time, landscape, longevity, personality, notes } = answers

  // Rose → Gulab
  if (landscape === 'floral' || notes === 'floral') { scores[2] = (scores[2]||0) + 3 }
  // Earthy → Mitti
  if (landscape === 'earthy' || notes === 'green')  { scores[3] = (scores[3]||0) + 3 }
  // Oud → Royal Oudh or Shamama
  if (landscape === 'oriental' || notes === 'warm') { scores[1] = (scores[1]||0) + 3; scores[8] = (scores[8]||0) + 2 }
  // Sandalwood
  if (landscape === 'woody' || notes === 'creamy')  { scores[5] = (scores[5]||0) + 3; scores[7] = (scores[7]||0) + 1 }
  // Evening → Amber Night
  if (time === 'evening' || time === 'special')      { scores[4] = (scores[4]||0) + 2 }
  // Strong longevity → Shamama, Royal Oudh
  if (longevity === 'strong' || longevity === 'extreme') { scores[1] = (scores[1]||0) + 2; scores[8] = (scores[8]||0) + 2 }
  // Bold/rare → Shamama, Amber Night
  if (personality === 'bold' || personality === 'rare') { scores[4] = (scores[4]||0) + 2; scores[8] = (scores[8]||0) + 1 }
  // Romantic → Gulab, Jasmine Mogra
  if (personality === 'romantic')                    { scores[2] = (scores[2]||0) + 2; scores[6] = (scores[6]||0) + 2 }
  // Grounded → Sandalwood, Mitti
  if (personality === 'grounded')                   { scores[5] = (scores[5]||0) + 2; scores[3] = (scores[3]||0) + 1 }

  return products
    .filter(p => p.inStock)
    .map(p => ({ ...p, score: scores[p.id] || 0 }))
    .sort((a,b) => b.score - a.score)
    .slice(0, 3)
}

const slideVariants = {
  enter: dir => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25,0.46,0.45,0.94] } },
  exit: dir => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.3 } }),
}

export default function ScentQuiz({ onClose }) {
  const [step, setStep]       = useState(0) // 0..4 = questions, 5 = results
  const [answers, setAnswers] = useState({})
  const [dir, setDir]         = useState(1)
  const { addItem }           = useCart()

  const KEYS = ['time','landscape','longevity','personality','notes']

  const choose = value => {
    const key = KEYS[step]
    setAnswers(a => ({ ...a, [key]: value }))
    setDir(1)
    setTimeout(() => setStep(s => s + 1), 180)
  }

  const back = () => {
    if (step === 0) { onClose?.(); return }
    setDir(-1)
    setStep(s => s - 1)
  }

  const recs = step === 5 ? getRecommendations(answers) : []
  const progress = Math.min((step / 5) * 100, 100)

  return (
    <div style={{ background:'var(--beige)', border:'1px solid rgba(198,167,90,0.15)', maxWidth:640, width:'100%', margin:'0 auto', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'28px 36px 20px', borderBottom:'1px solid rgba(198,167,90,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:9, letterSpacing:4, color:'var(--gold)', textTransform:'uppercase', marginBottom:4 }}>✦ Scent Discovery</div>
          <div style={{ fontFamily:'Cinzel,serif', fontSize:18, color:'var(--text-main)' }}>Find Your Fragrance</div>
        </div>
        {onClose && <button onClick={onClose} style={{ background:'transparent', border:'none', color:'var(--text-light)', fontSize:20 }}>×</button>}
      </div>

      {/* Progress bar */}
      <div style={{ height:2, background:'rgba(198,167,90,0.1)', position:'relative' }}>
        <motion.div animate={{ width:`${progress}%` }} transition={{ duration:0.5 }}
          style={{ position:'absolute', inset:'0 auto 0 0', background:'linear-gradient(90deg,var(--gold-dark,#8B6914),#C6A75A)' }} />
      </div>

      <div style={{ padding:'32px 36px 36px', minHeight:360 }}>
        <AnimatePresence custom={dir} mode="wait">

          {/* Question steps */}
          {step < 5 && (
            <motion.div key={`q${step}`} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
              <div style={{ fontSize:9, letterSpacing:3, color:'var(--text-light)', marginBottom:16 }}>
                QUESTION {step+1} OF 5
              </div>
              <div style={{ fontFamily:'Playfair Display,serif', fontSize:20, color:'var(--text-main)', lineHeight:1.4, marginBottom:32 }}>
                {QUESTIONS[step].q}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {QUESTIONS[step].options.map(opt => (
                  <motion.button key={opt.value} onClick={() => choose(opt.value)}
                    style={{ background:'rgba(198,167,90,0.04)', border:'1px solid rgba(198,167,90,0.12)', padding:'18px 16px', textAlign:'left', display:'flex', alignItems:'center', gap:12 }}
                    whileHover={{ background:'rgba(198,167,90,0.1)', borderColor:'rgba(198,167,90,0.35)', x:2 }}
                    whileTap={{ scale:0.98 }}>
                    <span style={{ fontSize:20, flexShrink:0 }}>{opt.icon}</span>
                    <span style={{ fontSize:12, color:'#A09070', lineHeight:1.4 }}>{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results */}
          {step === 5 && (
            <motion.div key="results" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
              <div style={{ fontSize:9, letterSpacing:4, color:'var(--gold)', textTransform:'uppercase', marginBottom:8 }}>✦ Your Matches</div>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:18, color:'var(--text-main)', marginBottom:28 }}>We found your perfect fragrances</div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {recs.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.12 }}
                    style={{ display:'flex', gap:16, padding:'18px', border:'1px solid rgba(198,167,90,0.1)', background: i===0 ? 'rgba(198,167,90,0.05)' : 'transparent', position:'relative' }}>
                    {i===0 && <div style={{ position:'absolute', top:-1, left:-1, background:'#C6A75A', color:'#0B0B0B', fontSize:7, letterSpacing:2, padding:'3px 10px', fontWeight:700 }}>BEST MATCH</div>}
                    <div style={{ width:48, height:60, background:`linear-gradient(135deg,${p.gradColors?.[0]||'#1a1208'},${p.gradColors?.[1]||'#0d0b06'})`, border:'1px solid rgba(198,167,90,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop: i===0 ? 10 : 0 }}>
                      <span style={{ fontSize:7, color:'rgba(198,167,90,0.5)', fontFamily:'Cinzel,serif', letterSpacing:1 }}>SS</span>
                    </div>
                    <div style={{ flex:1, marginTop: i===0 ? 10 : 0 }}>
                      <div style={{ fontFamily:'Playfair Display,serif', fontSize:15, color:'var(--text-main)', marginBottom:3 }}>{p.name}</div>
                      <div style={{ fontSize:9, color:'var(--text-muted)', letterSpacing:1, marginBottom:10 }}>{p.category} · ₹{p.price.toLocaleString()}</div>
                      <div style={{ display:'flex', gap:6 }}>
                        <motion.button onClick={() => addItem(p)}
                          style={{ background:'#C6A75A', border:'none', color:'#0B0B0B', padding:'6px 16px', fontSize:8, letterSpacing:2, fontFamily:'Montserrat,sans-serif', fontWeight:700 }}
                          whileHover={{ background:'#E8D5A3' }}>ADD TO BAG</motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button onClick={() => { setStep(0); setAnswers({}) }}
                style={{ marginTop:20, background:'transparent', border:'1px solid rgba(198,167,90,0.2)', color:'var(--text-muted)', padding:'10px 24px', fontSize:9, letterSpacing:2, fontFamily:'Montserrat,sans-serif', width:'100%' }}
                whileHover={{ borderColor:'rgba(198,167,90,0.4)', color:'var(--gold)' }}>
                ↺ RETAKE QUIZ
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Back nav */}
      {step > 0 && step < 5 && (
        <div style={{ padding:'0 36px 28px' }}>
          <button onClick={back} style={{ background:'transparent', border:'none', color:'var(--text-light)', fontSize:11, letterSpacing:2, fontFamily:'Montserrat,sans-serif' }}>← BACK</button>
        </div>
      )}
    </div>
  )
}
