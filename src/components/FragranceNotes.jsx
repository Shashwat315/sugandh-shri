import { motion } from 'framer-motion'
const notes = [
  { type:'First Impression · 0–30 min', title:'Top Notes', icon:'🌿', items:['Bergamot & Citrus','Saffron & Cardamom','Fresh Green Herbs','Morning Dew'] },
  { type:'The Character · 30 min–4 hrs', title:'Heart Notes', icon:'🌹', items:['Rose Damascena','Oud & Frankincense','Jasmine Mogra','Amber Resin'], featured:true },
  { type:'The Memory · 4–12+ hrs',     title:'Base Notes', icon:'🪵', items:['Mysore Sandalwood','Dark Musk & Vetiver','Ambergris','Warm Vanilla'] },
]
export default function FragranceNotes() {
  return (
    <section style={{padding:'clamp(56px,8vw,96px) clamp(16px,5vw,64px)',background:'var(--ivory)',textAlign:'center'}}>
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}>
        <span className="section-tag">✦ The Art of Layering</span>
        <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(22px,4vw,42px)',color:'var(--brown-deeper)',marginBottom:12}}>The Fragrance Pyramid</h2>
        <div className="gold-rule gold-rule-center" style={{marginBottom:14}}/>
        <p style={{fontSize:'clamp(12px,1.2vw,14px)',color:'var(--text-muted)',lineHeight:1.85,maxWidth:480,margin:'0 auto clamp(32px,5vw,52px)',fontFamily:'Lora,serif',fontStyle:'italic'}}>
          Every great fragrance is a journey through time — from the first breath to the lingering memory on your skin.
        </p>
      </motion.div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(clamp(200px,25vw,300px),1fr))',gap:'clamp(12px,2vw,20px)'}}>
        {notes.map((note,i)=>(
          <motion.div key={note.title} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
            transition={{duration:0.7,delay:i*0.15}} viewport={{once:true}}
            whileHover={{y:-5,boxShadow:'var(--shadow-lg)'}}
            style={{background:note.featured?'var(--brown)':'var(--beige)',padding:'clamp(28px,4vw,44px) clamp(20px,3vw,32px)',borderRadius:8,boxShadow:'var(--shadow-sm)',transition:'box-shadow 0.4s,transform 0.4s',position:'relative'}}>
            {note.featured&&<div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,var(--gold),transparent)',borderRadius:'8px 8px 0 0'}}/>}
            <div style={{fontSize:'clamp(24px,4vw,36px)',marginBottom:14}}>{note.icon}</div>
            <div style={{fontSize:8,letterSpacing:4,color:'var(--gold)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:8}}>{note.type}</div>
            <div style={{fontFamily:'Cinzel,serif',fontSize:'clamp(16px,2vw,22px)',color:note.featured?'var(--ivory)':'var(--brown-deeper)',marginBottom:18}}>{note.title}</div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
              {note.items.map(item=>(
                <li key={item} style={{fontSize:'clamp(11px,1.1vw,12px)',color:note.featured?'rgba(245,241,233,0.72)':'var(--text-muted)',fontFamily:'Lora,serif',display:'flex',alignItems:'center',gap:10,justifyContent:'center'}}>
                  <span style={{width:14,height:1,background:note.featured?'rgba(198,167,90,0.45)':'rgba(106,78,66,0.25)',display:'inline-block',flexShrink:0}}/>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
