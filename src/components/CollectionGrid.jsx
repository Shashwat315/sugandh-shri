// CollectionGrid — responsive
import { motion } from 'framer-motion'
import { Link }   from 'react-router-dom'
import { categories } from '../data/products'

const routes = { 'Attars':'/attars','Perfumes':'/perfumes','Essential Oils':'/essential-oils','Incense':'/shop' }

export default function CollectionGrid() {
  return (
    <section style={{ padding:'clamp(56px,8vw,96px) clamp(16px,5vw,64px)', background:'var(--ivory)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(28px,4vw,48px)', flexWrap:'wrap', gap:16 }}>
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}>
          <span className="section-tag">✦ Explore Our World</span>
          <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(22px,4vw,42px)', color:'var(--brown-deeper)' }}>Our Collections</h2>
          <div className="gold-rule" style={{ marginTop:16 }}/>
        </motion.div>
        <Link to="/shop">
          <motion.button className="btn-outline" style={{ borderRadius:4, whiteSpace:'nowrap', padding:'11px 28px' }}
            whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>View All →</motion.button>
        </Link>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(clamp(160px,20vw,220px),1fr))', gap:'clamp(12px,2vw,20px)' }}>
        {categories.map((cat,i) => (
          <Link key={cat.id} to={routes[cat.name]||'/shop'} style={{ textDecoration:'none' }}>
            <motion.div initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
              transition={{duration:0.7,delay:i*0.1}} viewport={{once:true}} whileHover="hover"
              style={{ position:'relative', overflow:'hidden', aspectRatio:'2/3', borderRadius:8, boxShadow:'var(--shadow-md)' }}>
              <motion.img src={cat.image} alt={cat.name}
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                variants={{ hover:{ scale:1.07 } }} transition={{ duration:0.7, ease:[0.25,0.46,0.45,0.94] }}/>
              <motion.div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(47,37,35,0.85) 0%,rgba(47,37,35,0.15) 60%,transparent 100%)' }}
                variants={{ hover:{ background:'linear-gradient(to top,rgba(47,37,35,0.9) 0%,rgba(47,37,35,0.3) 60%,rgba(47,37,35,0.05) 100%)' } }}/>
              <motion.div style={{ position:'absolute',inset:8,border:'1px solid transparent',borderRadius:4,zIndex:2 }}
                variants={{ hover:{ borderColor:'rgba(198,167,90,0.45)' } }}/>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'clamp(14px,2vw,24px)', zIndex:3 }}>
                <div style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(14px,1.8vw,18px)', color:'var(--ivory)', marginBottom:4 }}>{cat.name}</div>
                <div style={{ fontSize:'clamp(7px,0.8vw,9px)', letterSpacing:3, color:'var(--gold)', fontFamily:'Montserrat,sans-serif' }}>{cat.count} VARIETIES</div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}
