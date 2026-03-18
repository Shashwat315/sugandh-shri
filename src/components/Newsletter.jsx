import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function Newsletter() {
  const [email,setEmail]=useState('')
  const [done,setDone]=useState(false)
  const [err,setErr]=useState(false)
  const submit=()=>{if(email&&email.includes('@')){setDone(true);setErr(false)}else{setErr(true);setTimeout(()=>setErr(false),2500)}}
  return (
    <section style={{position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0}}>
        <img src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=1600&q=80" alt="" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 40%'}}/>
        <div style={{position:'absolute',inset:0,background:'rgba(47,37,35,0.83)'}}/>
      </div>
      <div style={{position:'relative',zIndex:2,padding:'clamp(56px,8vw,96px) clamp(16px,5vw,64px)',textAlign:'center'}}>
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.9}} viewport={{once:true}}>
          <span style={{fontSize:9,letterSpacing:5,color:'var(--gold)',textTransform:'uppercase',display:'block',marginBottom:14,fontFamily:'Montserrat,sans-serif'}}>✦ Stay Connected</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(22px,4vw,42px)',color:'var(--ivory)',marginBottom:4}}>Receive the Scent of</h2>
          <h2 style={{fontFamily:'Cinzel,serif',fontStyle:'italic',fontSize:'clamp(22px,4vw,42px)',color:'var(--gold)',marginBottom:14}}>Exclusivity</h2>
          <p style={{fontSize:'clamp(12px,1.2vw,13px)',color:'rgba(245,241,233,0.6)',marginBottom:32,fontFamily:'Lora,serif',maxWidth:400,margin:'0 auto 32px'}}>New launches, heritage stories, and member-only offers.</p>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}>
                <div style={{fontSize:24,color:'var(--gold)',marginBottom:8}}>✦</div>
                <p style={{fontFamily:'Lora,serif',fontSize:15,color:'var(--ivory)',fontStyle:'italic'}}>Welcome to the House of Sugandh Shri.</p>
              </motion.div>
            ) : (
              <motion.div key="form" style={{display:'flex',maxWidth:460,margin:'0 auto',borderRadius:5,overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.3)'}}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()} placeholder="Your email address"
                  style={{flex:1,background:'var(--ivory)',border:'none',padding:'clamp(12px,2vw,15px) clamp(12px,2vw,20px)',color:'var(--text-main)',fontSize:13,fontFamily:'Lora,serif',outline:'none',borderRadius:'5px 0 0 5px'}}/>
                <button onClick={submit} className="btn-primary" style={{borderRadius:'0 5px 5px 0',padding:'clamp(12px,2vw,15px) clamp(16px,2.5vw,24px)',fontSize:9,whiteSpace:'nowrap'}}>
                  SUBSCRIBE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {err&&<p style={{fontSize:10,color:'rgba(220,100,100,0.9)',marginTop:10,fontFamily:'Montserrat,sans-serif'}}>Please enter a valid email address.</p>}
        </motion.div>
      </div>
    </section>
  )
}
