import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const MSGS = ['✦  Free shipping on orders above ₹1,999  ·  Across India','✦  New: Rose de Kannauj & Santal Majesty — Now Available','✦  Authentic Kannauj attars since 1887  ·  No synthetics, ever','✦  International shipping to 40+ countries  ·  Gift wrapping available']
export default function AnnouncementBar() {
  const [i,setI]=useState(0); const [v,setV]=useState(true)
  useEffect(()=>{const t=setInterval(()=>setI(x=>(x+1)%MSGS.length),4500);return()=>clearInterval(t)},[])
  if(!v) return null
  return (
    <div style={{background:'var(--brown)',height:38,display:'flex',alignItems:'center',justifyContent:'center',position:'fixed',top:0,left:0,right:0,zIndex:1001,overflow:'hidden'}}>
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.4}}
          style={{fontSize:'clamp(8px,1vw,10px)',letterSpacing:'clamp(1px,0.15vw,2px)',color:'var(--ivory)',fontFamily:'Montserrat,sans-serif',textAlign:'center',padding:'0 40px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'90vw'}}>
          {MSGS[i]}
        </motion.p>
      </AnimatePresence>
      <button onClick={()=>setV(false)} style={{position:'absolute',right:14,background:'transparent',border:'none',color:'rgba(245,241,233,0.45)',fontSize:16,lineHeight:1}}>×</button>
    </div>
  )
}
