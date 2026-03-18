// ============================================================
// EssentialOilsPage.jsx  /essential-oils
// Dedicated essential oils page with usage guide
// ============================================================
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const oils = products.filter(p => p.category === 'Essential Oils')

const benefits = [
  { icon:'🌿', title:'100% Pure', desc:'No fillers, carriers or synthetic dilutants. Every oil is exactly what it says it is — nothing more, nothing less.' },
  { icon:'🧴', title:'Therapeutic Grade', desc:'Sourced from the best growing regions in India, steam-distilled at optimal temperatures to preserve full therapeutic profiles.' },
  { icon:'🌱', title:'Sustainably Sourced', desc:'Wild-harvested or organically farmed. We work directly with communities whose livelihoods depend on these sacred plants.' },
  { icon:'🔬', title:'GC/MS Tested', desc:'Every batch is gas chromatography tested to verify purity and composition. Test reports available on request.' },
]

const usageGuide = [
  { method:'Aromatherapy', icon:'💨', desc:'Add 3–5 drops to a diffuser or oil burner. Inhale deeply for mood, sleep, and respiratory benefits.' },
  { method:'Topical Application', icon:'🤲', desc:'Always dilute 2–3% in a carrier oil (jojoba, sweet almond, coconut). Apply to skin, pulse points, or massage.' },
  { method:'Bath', icon:'🛁', desc:'Add 5–8 drops to a warm bath. Mix with bath salts or milk first to help disperse in water. Deeply relaxing.' },
  { method:'Skincare Blending', icon:'✨', desc:'Add 1–2 drops to your moisturiser, serum, or face oil for targeted skin benefits and natural fragrance.' },
  { method:'Haircare', icon:'💆', desc:'Blend into your hair oil or conditioner. Many oils promote scalp health, shine, and hair growth.' },
  { method:'Natural Perfume', icon:'🌺', desc:'Layer and blend oils to create your own natural signature scent. No alcohol needed — just oil on oil.' },
]

const carriers = [
  { name:'Jojoba Oil', best:'Face & skin', desc:'Closest to skin\'s natural sebum. Non-comedogenic, long shelf life.' },
  { name:'Sweet Almond', best:'Body massage', desc:'Light, nourishing, mild scent. Perfect for massage blends.' },
  { name:'Fractionated Coconut', best:'All-purpose', desc:'Clear, odourless, never solidifies. Excellent carrier for perfumes.' },
  { name:'Rosehip Seed', best:'Anti-aging', desc:'Rich in vitamin C and A. Best for face serums and scars.' },
  { name:'Argan Oil', best:'Hair & face', desc:'Luxurious and nourishing. Excellent for hair and dry skin.' },
]

export default function EssentialOilsPage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}
      style={{paddingTop:100, background:'var(--ivory)', minHeight:'100vh'}}>

      {/* Hero */}
      <div style={{ position:'relative', height:480, overflow:'hidden', display:'flex', alignItems:'center' }}>
        <div style={{ position:'absolute', inset:0 }}>
          <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1600&q=85"
            alt="Essential oils" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 30%'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to right, rgba(245,241,233,0.97) 0%, rgba(245,241,233,0.8) 50%, rgba(245,241,233,0.4) 100%)'}}/>
        </div>
        <motion.div style={{position:'relative',zIndex:2,padding:'0 64px',maxWidth:600}}
          initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9}}>
          <span className="section-tag">✦ Botanical Treasures</span>
          <h1 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(32px,5vw,58px)',color:'var(--brown-deeper)',marginBottom:20,lineHeight:1.1}}>
            Pure Essential Oils
          </h1>
          <p style={{fontSize:15,color:'var(--text-muted)',lineHeight:1.85,fontFamily:'Lora,serif',marginBottom:28}}>
            Single-origin botanical oils of therapeutic purity — extracted from the finest plants
            grown across India using traditional methods that honour the plant and preserve its full healing essence.
          </p>
          <div style={{width:48,height:1,background:'var(--gold)'}}/>
        </motion.div>
      </div>

      {/* Why choose our oils */}
      <div style={{padding:'80px 64px',background:'var(--beige)'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}
          style={{textAlign:'center',marginBottom:52}}>
          <span className="section-tag">✦ Our Promise</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(24px,3vw,36px)',color:'var(--brown-deeper)',marginBottom:16}}>
            Why Choose Sugandh Shri Oils
          </h2>
          <div style={{width:48,height:1,background:'var(--gold)',margin:'0 auto'}}/>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24}}>
          {benefits.map((b,i) => (
            <motion.div key={b.title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
              transition={{duration:0.6,delay:i*0.1}} viewport={{once:true}}
              style={{background:'var(--ivory)',borderRadius:8,padding:'32px 24px',textAlign:'center',boxShadow:'var(--shadow-sm)'}}>
              <div style={{fontSize:36,marginBottom:16}}>{b.icon}</div>
              <div style={{fontFamily:'Cinzel,serif',fontSize:15,color:'var(--brown)',marginBottom:10}}>{b.title}</div>
              <p style={{fontSize:12,color:'var(--text-light)',lineHeight:1.75,fontFamily:'Lora,serif'}}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{padding:'80px 64px',background:'var(--ivory)'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}
          style={{marginBottom:48}}>
          <span className="section-tag">✦ The Collection</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(24px,3vw,36px)',color:'var(--brown-deeper)',marginBottom:8}}>Our Essential Oils</h2>
          <p style={{fontSize:14,color:'var(--text-muted)',maxWidth:520,fontFamily:'Lora,serif'}}>
            Six exceptional single-origin oils, each sourced from the best growing region in India. No blends, no dilutants — pure botanical essence.
          </p>
          <div style={{width:48,height:1,background:'var(--gold)',marginTop:20}}/>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:28}}>
          {oils.map((p,i) => <ProductCard key={p.id} product={p} index={i}/>)}
        </div>
      </div>

      {/* Usage guide */}
      <div style={{padding:'80px 64px',background:'var(--beige)'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}
          style={{textAlign:'center',marginBottom:52}}>
          <span className="section-tag">✦ How to Use</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(24px,3vw,36px)',color:'var(--brown-deeper)',marginBottom:8}}>Six Ways to Use Essential Oils</h2>
          <div style={{width:48,height:1,background:'var(--gold)',margin:'20px auto 0'}}/>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {usageGuide.map((u,i) => (
            <motion.div key={u.method} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
              transition={{duration:0.6,delay:i*0.08}} viewport={{once:true}}
              style={{background:'var(--ivory)',borderRadius:8,padding:'28px 24px',boxShadow:'var(--shadow-sm)'}}>
              <div style={{fontSize:28,marginBottom:14}}>{u.icon}</div>
              <div style={{fontFamily:'Cinzel,serif',fontSize:14,color:'var(--brown)',marginBottom:10}}>{u.method}</div>
              <p style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.75,fontFamily:'Lora,serif'}}>{u.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Carrier oils guide */}
      <div style={{padding:'80px 64px',background:'var(--ivory)'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'start'}}>
          <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
            <span className="section-tag">✦ Essential Knowledge</span>
            <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(22px,3vw,34px)',color:'var(--brown-deeper)',marginBottom:16,lineHeight:1.2}}>
              The Art of Blending with Carrier Oils
            </h2>
            <div style={{width:48,height:1,background:'var(--gold)',marginBottom:24}}/>
            <p style={{fontSize:14,color:'var(--text-muted)',lineHeight:1.9,fontFamily:'Lora,serif',marginBottom:16}}>
              Essential oils are highly concentrated plant extracts — most require dilution in a carrier oil before applying to skin. The right carrier oil enhances the therapeutic benefits and creates a luxurious texture.
            </p>
            <p style={{fontSize:14,color:'var(--text-muted)',lineHeight:1.9,fontFamily:'Lora,serif',marginBottom:24}}>
              A general safe dilution ratio is <strong style={{color:'var(--brown)'}}>2–3% for adults</strong> — approximately 2–3 drops of essential oil per teaspoon (5ml) of carrier oil. For sensitive skin or children, use 1%.
            </p>
            <div style={{background:'var(--beige)',borderRadius:8,padding:'20px 24px',borderLeft:'3px solid var(--gold)'}}>
              <p style={{fontSize:13,color:'var(--text-muted)',fontFamily:'Lora,serif',fontStyle:'italic',lineHeight:1.75}}>
                "The best perfume is not the most expensive — it is the one that makes you feel like yourself, only more so."
              </p>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
            <div style={{fontFamily:'Cinzel,serif',fontSize:14,color:'var(--brown)',marginBottom:20,letterSpacing:1}}>Recommended Carrier Oils</div>
            {carriers.map((c,i) => (
              <div key={c.name} style={{padding:'16px 0',borderBottom:'1px solid rgba(106,78,66,0.1)',display:'grid',gridTemplateColumns:'1fr 80px',gap:16}}>
                <div>
                  <div style={{fontFamily:'Lora,serif',fontSize:14,color:'var(--brown-deeper)',marginBottom:4,fontWeight:500}}>{c.name}</div>
                  <div style={{fontSize:12,color:'var(--text-light)',fontFamily:'Lora,serif'}}>{c.desc}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <span style={{fontSize:8,letterSpacing:1,color:'var(--gold)',background:'rgba(198,167,90,0.12)',padding:'3px 8px',borderRadius:3,fontFamily:'Montserrat,sans-serif',whiteSpace:'nowrap'}}>{c.best}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Safety */}
      <div style={{padding:'48px 64px',background:'rgba(106,78,66,0.06)',borderTop:'1px solid rgba(106,78,66,0.1)'}}>
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} transition={{duration:0.7}} viewport={{once:true}}
          style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{fontFamily:'Cinzel,serif',fontSize:16,color:'var(--brown)',marginBottom:16,textAlign:'center'}}>Safety Guidelines</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
            {[
              'Always dilute essential oils before applying to skin. Never use undiluted (neat) except as directed.',
              'Keep out of reach of children and pets. Store in dark glass bottles away from heat and sunlight.',
              'Avoid contact with eyes. If contact occurs, rinse with carrier oil, not water. Consult a doctor if irritation persists.',
            ].map((tip,i) => (
              <div key={i} style={{fontSize:12,color:'var(--text-muted)',fontFamily:'Lora,serif',lineHeight:1.75,padding:'16px',background:'var(--ivory)',borderRadius:6}}>
                <span style={{color:'var(--gold)',marginRight:8}}>✦</span>{tip}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
