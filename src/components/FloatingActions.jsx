// FloatingActions — warm sandalwood theme
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const [chat,    setChat]    = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const WA_NUM = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'

  const btnStyle = {
    width:46, height:46, borderRadius:'50%',
    border:'none', display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:18, boxShadow:'var(--shadow-md)', cursor:'none',
    background:'var(--brown)', color:'var(--ivory)',
    transition:'all 0.3s',
  }

  return (
    <div style={{ position:'fixed', bottom:32, right:24, zIndex:800, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:10 }}>
      {/* Chat widget */}
      <AnimatePresence>
        {chat && (
          <motion.div initial={{opacity:0,scale:0.9,y:8}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.9,y:8}}
            style={{ background:'var(--ivory)', borderRadius:10, boxShadow:'var(--shadow-xl)', padding:20, width:260, marginBottom:4, border:'1px solid rgba(106,78,66,0.12)' }}>
            <div style={{ fontFamily:'Cinzel,serif', fontSize:13, color:'var(--brown)', marginBottom:6 }}>Sugandh Shri</div>
            <p style={{ fontSize:12, color:'var(--text-muted)', fontFamily:'Lora,serif', lineHeight:1.6, marginBottom:14 }}>Namaste 🙏 How can we help you find your perfect fragrance today?</p>
            {['I need help choosing','Where is my order?','Custom gift enquiry'].map(msg => (
              <button key={msg} onClick={() => { window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`, '_blank'); setChat(false) }}
                style={{ display:'block', width:'100%', background:'var(--beige)', border:'none', color:'var(--text-muted)', padding:'9px 14px', fontSize:11, textAlign:'left', marginBottom:6, borderRadius:5, fontFamily:'Lora,serif', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='var(--brown)';e.currentTarget.style.color='var(--ivory)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='var(--beige)';e.currentTarget.style.color='var(--text-muted)'}}>
                {msg}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {/* WhatsApp */}
        <motion.button onClick={() => setChat(c => !c)} style={btnStyle}
          whileHover={{ scale:1.1, background:'var(--brown-dark)', boxShadow:'var(--shadow-lg)' }} whileTap={{ scale:0.93 }}
          title="WhatsApp Chat">
          💬
        </motion.button>

        {/* Back to top */}
        <AnimatePresence>
          {showTop && (
            <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}
              onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
              style={{ ...btnStyle, background:'var(--beige)', color:'var(--brown)', border:'1.5px solid rgba(106,78,66,0.2)' }}
              whileHover={{ scale:1.1, background:'var(--brown)', color:'var(--ivory)', boxShadow:'var(--shadow-lg)' }}
              title="Back to top">
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
