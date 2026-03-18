// StorySection — responsive warm parallax
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StorySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const imgY  = useTransform(scrollYProgress,[0,1],[-24,24])
  const txtY  = useTransform(scrollYProgress,[0,1],[12,-12])

  return (
    <section ref={ref} style={{padding:'clamp(56px,8vw,96px) clamp(16px,5vw,64px)',background:'var(--beige)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontFamily:'Cinzel,serif',fontSize:'clamp(60px,15vw,180px)',color:'rgba(106,78,66,0.03)',letterSpacing:20,userSelect:'none',whiteSpace:'nowrap',pointerEvents:'none'}}>सुगंध</div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(32px,6vw,80px)',alignItems:'center',position:'relative',zIndex:2}} className="story-grid">
        {/* Images */}
        <motion.div style={{position:'relative',height:'clamp(340px,50vw,560px)',y:imgY}}>
          <motion.div initial={{opacity:0,clipPath:'inset(100% 0 0 0)'}} whileInView={{opacity:1,clipPath:'inset(0% 0 0 0)'}}
            transition={{duration:1.2,ease:[0.25,0.46,0.45,0.94]}} viewport={{once:true}}
            style={{position:'absolute',width:'80%',height:'83%',top:0,left:0,overflow:'hidden',borderRadius:8,boxShadow:'var(--shadow-lg)'}}>
            <img src="https://images.unsplash.com/photo-1614267861476-0d129972a0f4?w=700&q=85"
              alt="Master distillery Kannauj" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </motion.div>
          <motion.div initial={{opacity:0,x:16,y:16}} whileInView={{opacity:1,x:0,y:0}}
            transition={{duration:0.9,delay:0.35}} viewport={{once:true}}
            style={{position:'absolute',width:'52%',height:'42%',bottom:0,right:0,overflow:'hidden',borderRadius:8,boxShadow:'var(--shadow-lg)',border:'4px solid var(--ivory)'}}>
            <img src="https://images.unsplash.com/photo-1548445929-4f60a497f851?w=500&q=85"
              alt="Roses Kannauj" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </motion.div>
          <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} transition={{duration:0.6,delay:0.6}} viewport={{once:true}}
            style={{position:'absolute',bottom:'clamp(60px,12vw,120px)',left:'-clamp(8px,2vw,24px)',background:'var(--brown)',color:'var(--ivory)',padding:'clamp(12px,2vw,20px) clamp(14px,2.5vw,24px)',borderRadius:8,boxShadow:'var(--shadow-lg)',zIndex:3}}>
            <div style={{fontFamily:'Cinzel,serif',fontSize:'clamp(28px,4vw,42px)',color:'var(--gold)',lineHeight:1}}>137</div>
            <div style={{fontSize:'clamp(6px,0.8vw,8px)',letterSpacing:4,color:'rgba(245,241,233,0.6)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginTop:4}}>Years of Heritage</div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div style={{y:txtY}}>
          <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} transition={{duration:0.9}} viewport={{once:true}}>
            <span className="section-tag">✦ Our Heritage</span>
            <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(22px,3.5vw,40px)',color:'var(--brown-deeper)',marginBottom:16,lineHeight:1.15}}>
              Rooted in the Ancient City of Fragrance
            </h2>
            <div className="gold-rule" style={{marginBottom:24}}/>
            <p style={{fontSize:'clamp(13px,1.2vw,14px)',color:'var(--text-muted)',lineHeight:1.9,fontFamily:'Lora,serif',marginBottom:16}}>
              Born in the fragrance capital of the world — Kannauj, Uttar Pradesh — Sugandh Shri has preserved the sacred art of attar-making for over a century. Our master distillers follow the same deg-bhapka hydro-distillation process used since the Mughal era.
            </p>
            <div style={{borderLeft:'3px solid var(--gold)',paddingLeft:20,margin:'24px 0',background:'rgba(198,167,90,0.06)',paddingTop:14,paddingBottom:14,paddingRight:16,borderRadius:'0 6px 6px 0'}}>
              <p style={{fontFamily:'Lora,serif',fontSize:'clamp(13px,1.4vw,16px)',color:'var(--brown)',lineHeight:1.8,fontStyle:'italic',margin:0}}>"Every drop we distill carries the memory of a thousand petals, the patience of a lifetime, and the soul of India itself."</p>
              <div style={{fontSize:8,color:'var(--text-light)',marginTop:8,letterSpacing:2,fontFamily:'Montserrat,sans-serif'}}>— ZAFAR HUSSAIN, 5TH GENERATION MASTER DISTILLER</div>
            </div>
            <motion.button className="btn-primary" onClick={()=>window.location.href='/about'}
              style={{marginTop:24,borderRadius:4}} whileHover={{scale:1.02,boxShadow:'0 8px 28px rgba(106,78,66,0.25)'}} whileTap={{scale:0.97}}>
              Read Our Story →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width:768px) { .story-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  )
}
