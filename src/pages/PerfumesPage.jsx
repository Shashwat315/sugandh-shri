// PerfumesPage — warm sandalwood theme with 6 perfumes
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const perfumes = products.filter(p => p.category === 'Perfumes')

const concentrations = [
  { name:'Attar (Itr)', conc:'90–100%', duration:'12–24h', desc:'Pure botanical essence in sandalwood oil. Alcohol-free. The most concentrated form of fragrance possible.' },
  { name:'Eau de Parfum', conc:'18–25%', duration:'8–14h', desc:'Our luxury alcohol-based parfums. Rich, lasting, and contemporary.' },
  { name:'Essential Oil', conc:'100%', duration:'Variable', desc:'Pure single-note botanicals. Use neat or blend with carrier oils.' },
]

export default function PerfumesPage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}
      style={{paddingTop:100,background:'var(--ivory)',minHeight:'100vh'}}>

      {/* Hero */}
      <div style={{position:'relative',height:440,overflow:'hidden',display:'flex',alignItems:'center'}}>
        <div style={{position:'absolute',inset:0}}>
          <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1600&q=85"
            alt="Luxury perfumes" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 40%'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to right, rgba(245,241,233,0.97) 0%, rgba(245,241,233,0.75) 55%, rgba(245,241,233,0.3) 100%)'}}/>
        </div>
        <motion.div style={{position:'relative',zIndex:2,padding:'0 64px',maxWidth:580}}
          initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.9}}>
          <span className="section-tag">✦ Luxury Fragrances</span>
          <h1 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(30px,5vw,56px)',color:'var(--brown-deeper)',marginBottom:18,lineHeight:1.1}}>
            Perfumes & Eau de Parfum
          </h1>
          <p style={{fontSize:14,color:'var(--text-muted)',lineHeight:1.85,fontFamily:'Lora,serif',marginBottom:24}}>
            Where ancient Indian perfumery wisdom meets contemporary luxury. Six unique compositions, each built around precious Indian botanicals — oud, rose, sandalwood, vetiver and jasmine.
          </p>
          <div style={{width:48,height:1,background:'var(--gold)'}}/>
        </motion.div>
      </div>

      {/* Concentration guide */}
      <div style={{padding:'72px 64px',background:'var(--beige)'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}
          style={{textAlign:'center',marginBottom:44}}>
          <span className="section-tag">✦ Understanding Your Fragrance</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(22px,3vw,34px)',color:'var(--brown-deeper)',marginBottom:8}}>
            Choosing Your Concentration
          </h2>
          <div style={{width:48,height:1,background:'var(--gold)',margin:'16px auto 0'}}/>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {concentrations.map((c,i) => (
            <motion.div key={c.name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
              transition={{duration:0.6,delay:i*0.12}} viewport={{once:true}}
              style={{background:'var(--ivory)',borderRadius:8,padding:'32px 28px',textAlign:'center',boxShadow:'var(--shadow-sm)'}}>
              <div style={{fontFamily:'Cinzel,serif',fontSize:17,color:'var(--brown)',marginBottom:6}}>{c.name}</div>
              <div style={{fontSize:9,letterSpacing:3,color:'var(--gold)',marginBottom:4,fontFamily:'Montserrat,sans-serif'}}>CONCENTRATION: {c.conc}</div>
              <div style={{fontSize:9,letterSpacing:2,color:'var(--text-light)',marginBottom:16,fontFamily:'Montserrat,sans-serif'}}>DURATION: {c.duration}</div>
              <p style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.75,fontFamily:'Lora,serif'}}>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Products — all 6 perfumes */}
      <div style={{padding:'72px 64px',background:'var(--ivory)'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}
          style={{marginBottom:48}}>
          <span className="section-tag">✦ The Collection</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(22px,3vw,34px)',color:'var(--brown-deeper)',marginBottom:8}}>
            Our Perfumes
          </h2>
          <p style={{fontSize:14,color:'var(--text-muted)',maxWidth:520,fontFamily:'Lora,serif'}}>
            Six distinctive compositions. From delicate floral musks to powerful oud parfums — each crafted to become your signature.
          </p>
          <div style={{width:48,height:1,background:'var(--gold)',marginTop:20}}/>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:28}}>
          {perfumes.map((p,i) => <ProductCard key={p.id} product={p} index={i}/>)}
        </div>
      </div>

      {/* Gift CTA */}
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}
        style={{margin:'0 64px 80px',padding:'56px',background:'var(--beige)',borderRadius:8,textAlign:'center',boxShadow:'var(--shadow-md)'}}>
        <span className="section-tag" style={{justifyContent:'center',display:'block'}}>✦ The Perfect Gift</span>
        <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(20px,3vw,32px)',color:'var(--brown-deeper)',marginBottom:14}}>Curated Perfume Gift Sets</h2>
        <p style={{fontSize:14,color:'var(--text-muted)',lineHeight:1.85,maxWidth:460,margin:'0 auto 28px',fontFamily:'Lora,serif'}}>
          Our gift boxes arrive in our signature packaging with a personal message card and a fragrance guide scroll.
        </p>
        <motion.button className="btn-primary" style={{borderRadius:4,margin:'0 auto'}}
          whileHover={{scale:1.02,boxShadow:'0 8px 28px rgba(106,78,66,0.25)'}} whileTap={{scale:0.98}}
          onClick={() => window.location.href='/gift-sets'}>
          Explore Gift Sets →
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
