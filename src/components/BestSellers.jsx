import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { products } from '../data/products'
const best = products.filter(p=>p.inStock).slice(0,6)
export default function BestSellers() {
  return (
    <section style={{padding:'clamp(56px,8vw,96px) clamp(16px,5vw,64px)',background:'var(--beige)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'clamp(28px,4vw,48px)',flexWrap:'wrap',gap:16}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}>
          <span className="section-tag">✦ Most Loved</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(22px,4vw,42px)',color:'var(--brown-deeper)'}}>Our Best Sellers</h2>
          <div className="gold-rule" style={{marginTop:16}}/>
        </motion.div>
        <Link to="/shop"><motion.button className="btn-outline" style={{borderRadius:4,whiteSpace:'nowrap',padding:'11px 24px'}} whileHover={{scale:1.02}} whileTap={{scale:0.97}}>View All →</motion.button></Link>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(clamp(200px,22vw,260px),1fr))',gap:'clamp(14px,2vw,24px)'}}>
        {best.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}
      </div>
    </section>
  )
}
