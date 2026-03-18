import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/products'
export default function Testimonials() {
  const [cur,setCur] = useState(0)
  const total = testimonials.length
  useEffect(()=>{const t=setInterval(()=>setCur(c=>(c+1)%total),5500);return()=>clearInterval(t)},[])
  return (
    <section style={{padding:'clamp(56px,8vw,96px) clamp(16px,5vw,64px)',background:'var(--ivory)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'clamp(28px,4vw,48px)',flexWrap:'wrap',gap:16}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}>
          <span className="section-tag">✦ Voices of Devotion</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(20px,4vw,38px)',color:'var(--brown-deeper)'}}>What Our Patrons Say</h2>
          <div className="gold-rule" style={{marginTop:14}}/>
        </motion.div>
        <div style={{display:'flex',gap:8}}>
          {[{icon:'←',fn:()=>setCur(c=>(c-1+total)%total)},{icon:'→',fn:()=>setCur(c=>(c+1)%total)}].map((b,i)=>(
            <motion.button key={i} onClick={b.fn} style={{width:40,height:40,border:'1.5px solid rgba(106,78,66,0.25)',background:'transparent',color:'var(--brown)',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:4}} whileHover={{background:'var(--brown)',color:'var(--ivory)',borderColor:'var(--brown)'}}>{b.icon}</motion.button>
          ))}
        </div>
      </div>
      <div style={{overflow:'hidden'}}>
        <motion.div style={{display:'flex',gap:20}} animate={{x:-(cur*(Math.min(window.innerWidth*0.38,400)+20))}} transition={{duration:0.6,ease:[0.25,0.46,0.45,0.94]}}>
          {testimonials.map((t,i)=>(
            <div key={t.id} style={{minWidth:'clamp(260px,35vw,390px)',background:'var(--beige)',borderRadius:8,padding:'clamp(22px,3vw,36px)',flexShrink:0,boxShadow:i===cur?'var(--shadow-lg)':'var(--shadow-sm)',border:i===cur?'1px solid rgba(198,167,90,0.3)':'1px solid transparent',transition:'box-shadow 0.4s,border 0.4s'}}>
              <div style={{color:'var(--gold)',fontSize:13,marginBottom:14,letterSpacing:3}}>{'★'.repeat(t.rating)}</div>
              <p style={{fontFamily:'Lora,serif',fontSize:'clamp(12px,1.3vw,15px)',color:'var(--brown-deeper)',lineHeight:1.8,fontStyle:'italic',marginBottom:22}}>"{t.text}"</p>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:38,height:38,borderRadius:'50%',background:'var(--brown)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cinzel,serif',fontSize:11,color:'var(--ivory)',flexShrink:0}}>{t.name.split(' ').map(w=>w[0]).join('')}</div>
                <div>
                  <div style={{fontSize:13,color:'var(--text-main)',fontFamily:'Lora,serif',fontWeight:500}}>{t.name}</div>
                  <div style={{fontSize:8,color:'var(--text-light)',letterSpacing:2,fontFamily:'Montserrat,sans-serif'}}>{t.location.toUpperCase()}</div>
                  <div style={{fontSize:9,color:'var(--gold)',marginTop:2,fontFamily:'Montserrat,sans-serif',letterSpacing:1}}>{t.product}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div style={{display:'flex',gap:7,marginTop:24,justifyContent:'center'}}>
        {testimonials.map((_,i)=>(
          <motion.button key={i} onClick={()=>setCur(i)} animate={{width:i===cur?22:7,background:i===cur?'var(--brown)':'rgba(106,78,66,0.2)'}} style={{height:7,borderRadius:4,border:'none'}} transition={{duration:0.3}}/>
        ))}
      </div>
    </section>
  )
}
