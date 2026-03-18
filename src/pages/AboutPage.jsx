// ============================================================
// AboutPage.jsx – Full brand story, team, values, timeline
// ============================================================
import { motion } from 'framer-motion'

const timeline = [
  { year:'1887', event:'Founded in Kannauj', desc:'Hakim Ghulam Hussain establishes the first Sugandh Shri deg in the heart of Kannauj.' },
  { year:'1921', event:'Royal Warrant', desc:'Awarded the Royal Attar Warrant by the Nawab of Awadh. The golden era of patronage begins.' },
  { year:'1956', event:'Third Generation', desc:'The craft passes to Ustad Altaf Hussain, who introduces new botanicals from South India.' },
  { year:'1992', event:'International Reach', desc:'First export to the Middle East. Sugandh Shri attars reach Dubai, Kuwait, and Bahrain.' },
  { year:'2010', event:'Kannauj GI Tag', desc:'Kannauj Attar receives Geographical Indication status. Our craft is officially recognized as heritage.' },
  { year:'2019', event:'New Generation', desc:'Zafar Hussain returns from France with modern perfumery knowledge, fusing it with family tradition.' },
  { year:'2025', event:'The Digital House', desc:'Sugandh Shri launches its luxury e-commerce platform, bringing ancient craft to the modern world.' },
]

const values = [
  { icon:'⚗️', title:'Purity', desc:'We never use synthetic accords, aroma chemicals, or dilutants. Every product is exactly what it claims to be.' },
  { icon:'🌿', title:'Sustainability', desc:'We source only from certified sustainable farms and government-regulated forestry. Nature is our greatest partner.' },
  { icon:'🤝', title:'Craft Preservation', desc:'15% of all profits go directly to the Kannauj Ittar Artisans Welfare Fund, preserving the livelihoods of our craft community.' },
  { icon:'📜', title:'Transparency', desc:'Every batch is traceable to its botanical source. We share full ingredient lists and sourcing information on request.' },
]

export default function AboutPage() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
      style={{ paddingTop:100, background:'var(--ivory)' }}>

      {/* Hero */}
      <div style={{ padding:'80px 60px', background:'linear-gradient(160deg,#0e0c08,#0B0B0B)', borderBottom:'1px solid rgba(198,167,90,0.08)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:0, bottom:0, fontFamily:'Cinzel,serif', fontSize:200, color:'rgba(198,167,90,0.02)', lineHeight:1, userSelect:'none' }}>१८८७</div>
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }} style={{ maxWidth:680 }}>
          <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:16 }}>✦ Our Heritage</span>
          <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(36px,5vw,64px)', color:'var(--text-main)', marginBottom:24, lineHeight:1.1 }}>
            A Century of<br /><span style={{ color:'var(--gold)', fontStyle:'italic' }}>Sacred Scent</span>
          </h1>
          <p style={{ fontSize:15, color:'#A09070', lineHeight:2, fontWeight:300 }}>
            In 1887, in a small courtyard in Kannauj — the perfume capital of India — a master attar-maker lit a fire under a copper deg. From that flame, Sugandh Shri was born. One hundred and thirty-seven years later, that same fire still burns.
          </p>
        </motion.div>
      </div>

      {/* Story prose */}
      <div style={{ padding:'80px 60px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>
        <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.9 }} viewport={{ once:true }}>
          <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:16 }}>✦ The Story</span>
          <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(26px,3vw,38px)', color:'var(--text-main)', marginBottom:24, lineHeight:1.2 }}>Rooted in the City Where Fragrance Was Born</h2>
          <div style={{ width:40, height:1, background:'#C6A75A', marginBottom:28 }} />
          <p style={{ fontSize:13, color:'#A09070', lineHeight:2, fontWeight:300, marginBottom:20 }}>
            Kannauj, Uttar Pradesh, has been called the Grasse of India — a city where the air itself smells of roses and oud. For over 5,000 years, this city has been the undisputed centre of Indian perfumery. Our founders chose no accident of location; they chose the source itself.
          </p>
          <p style={{ fontSize:13, color:'#A09070', lineHeight:2, fontWeight:300, marginBottom:20 }}>
            The Hussain family has practiced the deg-bhapka hydro-distillation method for five generations. Each generation has added knowledge — new botanical sources, refinements in technique, expanded palates — while preserving the core method unchanged from its Mughal-era origins.
          </p>
          <p style={{ fontSize:13, color:'#A09070', lineHeight:2, fontWeight:300 }}>
            Today, under the guidance of Zafar Hussain — who trained under master perfumers in Grasse, France before returning to his family's legacy — Sugandh Shri bridges the ancient and the modern. Our attars are unchanged in their making; our perfumes bring contemporary artistry to traditional ingredients.
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.9 }} viewport={{ once:true }}>
          {/* Story image placeholder */}
          <div style={{ background:'var(--beige)', border:'1px solid rgba(198,167,90,0.1)', height:420, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
            <svg width="300" height="300" viewBox="0 0 300 300">
              <text x="150" y="160" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="80" fill="rgba(198,167,90,0.08)" letterSpacing="4">सुगंध</text>
              <text x="150" y="200" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="14" fill="rgba(198,167,90,0.2)" letterSpacing="6">KANNAUJ · 1887</text>
              <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(198,167,90,0.06)" strokeWidth="1"/>
              <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(198,167,90,0.04)" strokeWidth="1"/>
            </svg>
          </div>
          <div style={{ border:'1px solid rgba(198,167,90,0.2)', padding:'24px', background:'rgba(198,167,90,0.03)' }}>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:16, color:'#E8D5A3', fontStyle:'italic', lineHeight:1.7, marginBottom:16 }}>
              "We do not make perfume. We capture memory — the memory of a rose field at dawn, of earth after rain, of a sandalwood forest in Mysore. Our job is simply to not get in the way."
            </div>
            <div style={{ fontSize:11, color:'var(--gold)', letterSpacing:2 }}>— Zafar Hussain, Master Attar-Maker, 5th Generation</div>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div style={{ padding:'0 60px 80px', background:'var(--ivory-dark)', paddingTop:80, borderTop:'1px solid rgba(198,167,90,0.08)' }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:60 }}>
          <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:16 }}>✦ Our Journey</span>
          <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(26px,3vw,38px)', color:'var(--text-main)' }}>137 Years of Fragrance</h2>
          <div style={{ width:40, height:1, background:'#C6A75A', margin:'20px auto' }} />
        </motion.div>
        <div style={{ position:'relative', maxWidth:800, margin:'0 auto' }}>
          <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:1, background:'rgba(198,167,90,0.1)', transform:'translateX(-50%)' }} />
          {timeline.map((item, i) => (
            <motion.div key={item.year}
              initial={{ opacity:0, x: i%2===0 ? -40 : 40 }} whileInView={{ opacity:1, x:0 }}
              transition={{ duration:0.7, delay:i*0.08 }} viewport={{ once:true }}
              style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginBottom:48, alignItems:'center' }}>
              {i%2===0 ? (
                <>
                  <div style={{ textAlign:'right', paddingRight:40 }}>
                    <div style={{ fontFamily:'Cinzel,serif', fontSize:32, color:'rgba(198,167,90,0.3)', marginBottom:8 }}>{item.year}</div>
                    <div style={{ fontFamily:'Playfair Display,serif', fontSize:16, color:'var(--text-main)', marginBottom:8 }}>{item.event}</div>
                    <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.7, fontWeight:300 }}>{item.desc}</p>
                  </div>
                  <div style={{ paddingLeft:40 }}>
                    <div style={{ width:10, height:10, background:'#C6A75A', borderRadius:'50%', marginLeft:-5 }} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ textAlign:'right', paddingRight:40 }}>
                    <div style={{ width:10, height:10, background:'#C6A75A', borderRadius:'50%', marginLeft:'auto', marginRight:-5 }} />
                  </div>
                  <div style={{ paddingLeft:40 }}>
                    <div style={{ fontFamily:'Cinzel,serif', fontSize:32, color:'rgba(198,167,90,0.3)', marginBottom:8 }}>{item.year}</div>
                    <div style={{ fontFamily:'Playfair Display,serif', fontSize:16, color:'var(--text-main)', marginBottom:8 }}>{item.event}</div>
                    <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.7, fontWeight:300 }}>{item.desc}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div style={{ padding:'80px 60px' }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:60 }}>
          <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:16 }}>✦ What We Stand For</span>
          <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(26px,3vw,38px)', color:'var(--text-main)' }}>Our Values</h2>
          <div style={{ width:40, height:1, background:'#C6A75A', margin:'20px auto' }} />
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
          {values.map((v, i) => (
            <motion.div key={v.title}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:i*0.1 }} viewport={{ once:true }}
              style={{ padding:'44px 32px', border:'1px solid rgba(198,167,90,0.06)', textAlign:'center' }}
              whileHover={{ background:'rgba(198,167,90,0.03)', borderColor:'rgba(198,167,90,0.2)' }}>
              <div style={{ fontSize:32, marginBottom:20 }}>{v.icon}</div>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:16, color:'var(--text-main)', marginBottom:16 }}>{v.title}</div>
              <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.8, fontWeight:300 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
