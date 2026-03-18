// HeroSection — sandalwood luxury, mobile-first responsive
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function GoldParticles() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; if(!c) return
    const create = () => {
      const p = document.createElement('div')
      const s = Math.random()*3+1, d = Math.random()*16+10, delay = Math.random()*5
      Object.assign(p.style,{ position:'absolute', width:s+'px', height:s+'px',
        borderRadius:'50%', left:Math.random()*100+'%', bottom:'-8px',
        background:`rgba(198,167,90,${(Math.random()*0.2+0.06).toFixed(2)})`,
        animation:`particleRise ${d}s ${delay}s linear forwards`, pointerEvents:'none' })
      c.appendChild(p); setTimeout(()=>p.remove(),(d+delay)*1000)
    }
    for(let i=0;i<8;i++) setTimeout(create,i*400)
    const iv = setInterval(create,1600); return ()=>clearInterval(iv)
  },[])
  return <div ref={ref} style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',zIndex:1}}/>
}

const lines = [
  {text:'The Essence of'},
  {text:'Tradition', italic:true, gold:true},
]

export default function HeroSection() {
  return (
    <section id="home" style={{
      minHeight:'100vh', position:'relative', display:'flex', alignItems:'center', overflow:'hidden',
      background:'linear-gradient(150deg,#F5F1E9 0%,#EDE6D8 45%,#E8D9C5 100%)',
    }}>
      {/* Ambient glow */}
      <div style={{ position:'absolute',inset:0,pointerEvents:'none',
        background:'radial-gradient(ellipse 65% 55% at 68% 50%, rgba(198,167,90,0.09) 0%, transparent 65%)' }}/>

      {/* Grain texture */}
      <div style={{ position:'absolute',inset:0,pointerEvents:'none',opacity:0.025,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:'180px' }}/>

      <GoldParticles/>

      {/* Text content */}
      <div style={{ position:'relative', zIndex:2, width:'100%', padding:'clamp(24px,6vw,80px)', maxWidth:'clamp(320px,55%,600px)' }}>
        {/* Tag line */}
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.9}}
          style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <div style={{ width:'clamp(20px,3vw,32px)', height:1, background:'var(--gold)' }}/>
          <span style={{ fontSize:'clamp(7px,0.9vw,9px)', letterSpacing:'clamp(3px,0.5vw,6px)', color:'var(--gold)', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif', fontWeight:500 }}>
            Est. 1887 · Kannauj, India
          </span>
        </motion.div>

        {/* Main heading */}
        <div style={{ overflow:'hidden' }}>
          {lines.map((line,i) => (
            <motion.div key={i} initial={{y:'100%',opacity:0}} animate={{y:0,opacity:1}}
              transition={{delay:0.5+i*0.2,duration:1,ease:[0.25,0.46,0.45,0.94]}}>
              <span style={{
                display:'block', fontFamily:'Cinzel,serif',
                fontSize:'clamp(32px,6.5vw,72px)', lineHeight:1.08, fontWeight:600,
                color: line.gold?'var(--brown)':'var(--brown-deeper)',
                fontStyle: line.italic?'italic':'normal',
              }}>{line.text}</span>
            </motion.div>
          ))}
          <motion.div initial={{y:'100%',opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.9,duration:1,ease:[0.25,0.46,0.45,0.94]}}>
            <span style={{ display:'block', fontFamily:'Cinzel,serif', fontSize:'clamp(32px,6.5vw,72px)', lineHeight:1.08, fontWeight:600, color:'var(--gold)', fontStyle:'italic' }}>
              Sugandh Shri
            </span>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:1.3,duration:0.9}}
          style={{ fontSize:'clamp(13px,1.2vw,15px)', color:'var(--text-muted)', lineHeight:1.9, marginTop:20, marginBottom:36, fontFamily:'Lora,serif', maxWidth:460 }}>
          Pure attars, luxury perfumes and sacred oils — crafted by master distillers in Kannauj using methods unchanged since the Mughal era.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.55,duration:0.8}}
          style={{ display:'flex', gap:'clamp(10px,2vw,16px)', flexWrap:'wrap' }}>
          <Link to="/shop">
            <motion.button className="btn-primary" style={{ borderRadius:4, padding:'clamp(11px,1.5vw,14px) clamp(22px,3vw,40px)' }}
              whileHover={{ scale:1.02, boxShadow:'0 8px 32px rgba(106,78,66,0.28)' }} whileTap={{ scale:0.97 }}>
              Explore Collection
            </motion.button>
          </Link>
          <Link to="/attars">
            <motion.button className="btn-outline" style={{ borderRadius:4, padding:'clamp(11px,1.5vw,14px) clamp(22px,3vw,36px)' }}
              whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>
              Our Attars
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.9,duration:0.8}}
          style={{ display:'flex', gap:'clamp(20px,4vw,40px)', marginTop:'clamp(32px,5vw,52px)', paddingTop:'clamp(20px,3vw,32px)', borderTop:'1px solid rgba(106,78,66,0.12)', flexWrap:'wrap' }}>
          {[{n:'137+',l:'Years'},{n:'40+',l:'Botanicals'},{n:'18',l:'Products'},{n:'40+',l:'Countries'}].map(s=>(
            <div key={s.l}>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(18px,2.5vw,26px)', color:'var(--brown)', fontWeight:600, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:'clamp(7px,0.7vw,9px)', letterSpacing:'clamp(1px,0.3vw,3px)', color:'var(--text-light)', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif', marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero image — hidden on small mobile */}
      <motion.div initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} transition={{delay:0.4,duration:1.2,ease:[0.25,0.46,0.45,0.94]}}
        style={{ position:'absolute', right:0, top:0, bottom:0, width:'44%', overflow:'hidden', zIndex:0 }}
        className="hero-image-panel">
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(to right,rgba(245,241,233,1) 0%,rgba(245,241,233,0) 28%)' }}/>
        <motion.img src="https://images.unsplash.com/photo-1601295402285-ab65d5b82e1b?w=900&q=85"
          alt="Luxury attar bottles"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
          animate={{ scale:[1,1.04,1] }} transition={{ duration:16, repeat:Infinity, ease:'easeInOut' }}/>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:240, zIndex:2, background:'linear-gradient(to top,rgba(232,217,197,0.5),transparent)' }}/>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.1,duration:0.8}}
        style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', textAlign:'center', zIndex:3 }}>
        <span style={{ fontSize:'clamp(7px,0.7vw,8px)', letterSpacing:4, color:'var(--text-light)', display:'block', marginBottom:8, fontFamily:'Montserrat,sans-serif' }}>SCROLL</span>
        <motion.div animate={{ scaleY:[1,0.4,1], opacity:[0.7,0.2,0.7] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ width:1, height:44, background:'linear-gradient(to bottom,var(--brown),transparent)', margin:'0 auto', borderRadius:1 }}/>
      </motion.div>

      <style>{`
        @media (max-width: 768px) { .hero-image-panel { display: none !important; } }
      `}</style>
    </section>
  )
}
