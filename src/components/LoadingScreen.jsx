import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
export default function LoadingScreen({ onComplete }) {
  const [p,setP]=useState(0)
  useEffect(()=>{
    const t1=setTimeout(()=>setP(1),700)
    const t2=setTimeout(()=>setP(2),1800)
    const t3=setTimeout(()=>{ if(onComplete) onComplete() },2500)
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3)}
  },[]) // eslint-disable-line
  return (
    <motion.div initial={{opacity:1}} animate={{opacity:p===2?0:1}} transition={{duration:0.65}}
      style={{position:'fixed',inset:0,background:'linear-gradient(135deg,var(--ivory) 0%,var(--beige) 100%)',zIndex:99999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',pointerEvents:p===2?'none':'all'}}>
      <motion.div initial={{scaleX:0}} animate={{scaleX:p>=1?1:0}} transition={{duration:0.9,ease:[0.25,0.46,0.45,0.94]}}
        style={{width:'clamp(120px,20vw,200px)',height:1,background:'linear-gradient(90deg,transparent,var(--gold),transparent)',transformOrigin:'center',marginBottom:28}}/>
      <motion.div initial={{opacity:0,y:16}} animate={{opacity:p>=1?1:0,y:p>=1?0:16}} transition={{duration:0.7,delay:0.15}}
        style={{fontFamily:'Cinzel,serif',fontSize:'clamp(18px,4vw,34px)',color:'var(--brown)',letterSpacing:'0.22em',fontWeight:600,marginBottom:8}}>
        SUGANDH SHRI
      </motion.div>
      <motion.div initial={{opacity:0}} animate={{opacity:p>=1?1:0}} transition={{duration:0.6,delay:0.4}}
        style={{fontFamily:'Lora,serif',fontSize:'clamp(10px,1.2vw,12px)',color:'var(--text-muted)',marginBottom:28,fontStyle:'italic'}}>
        The Essence of Tradition
      </motion.div>
      <motion.div initial={{scaleX:0}} animate={{scaleX:p>=1?1:0}} transition={{duration:0.9,delay:0.1,ease:[0.25,0.46,0.45,0.94]}}
        style={{width:'clamp(120px,20vw,200px)',height:1,background:'linear-gradient(90deg,transparent,var(--gold),transparent)',transformOrigin:'center',marginBottom:32}}/>
      <motion.div initial={{opacity:0}} animate={{opacity:p>=1?1:0}} style={{display:'flex',gap:10}}>
        {[0,1,2].map(i=>(
          <motion.div key={i} animate={{background:['rgba(106,78,66,0.18)','rgba(198,167,90,0.8)','rgba(106,78,66,0.18)']}} transition={{duration:1.2,repeat:Infinity,delay:i*0.22}} style={{width:5,height:5,borderRadius:'50%'}}/>
        ))}
      </motion.div>
    </motion.div>
  )
}
