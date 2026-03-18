// ============================================================
// GiftSetsPage.jsx  /gift-sets
// Curated gift set collections with pricing tiers
// ============================================================
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const giftSets = [
  { id:101, name:'The Kannauj Starter', subtitle:'3 × 6ml Classic Attars', price:2999, originalPrice:3800, contents:['Gulab Attar','Mitti Attar','Jasmine Mogra'], badge:'Most Popular', gradColors:['#1a1208','#251808','#0d0b06'] },
  { id:102, name:'The Royal Collection', subtitle:'4 × 10ml Premium Attars', price:5499, originalPrice:7200, contents:['Royal Oudh Attar','Kesar Chandan','Gulab Attar','Amber Night'], badge:'Bestseller', gradColors:['#1a0e04','#221400','#0f0a02'] },
  { id:103, name:'The Connoisseur\'s Box', subtitle:'6 × 12ml Signature Selection', price:9999, originalPrice:13500, contents:['Royal Oudh','Shamama','Gulab','Mitti','Kesar Chandan','Amber Night'], badge:'Luxury', gradColors:['#14100a','#1c1608','#0a0806'] },
  { id:104, name:'The Wellness Set', subtitle:'3 Essential Oils + Incense', price:2499, originalPrice:3200, contents:['Sandalwood Oil','Rose Otto','Jasmine Oil + Mogra Incense'], badge:'Gift', gradColors:['#0a1a0a','#0d1f0d','#060d06'] },
]

function GiftBottles({ colors }) {
  return (
    <svg width="200" height="120" viewBox="0 0 220 120" fill="none">
      {[0,1,2].map(i => {
        const x = 30 + i * 64
        const h = 90 - i * 8
        const y = 120 - h
        return (
          <g key={i}>
            <defs>
              <linearGradient id={`gb${i}${colors[0].slice(1,4)}`} x1={x} y1="0" x2={x+36} y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={colors[0]}/><stop offset="50%" stopColor={colors[1]}/><stop offset="100%" stopColor={colors[2]}/>
              </linearGradient>
            </defs>
            <path d={`M${x+2} ${y+18} Q${x} ${y+26} ${x} ${y+40} L${x} ${y+h-8} Q${x} ${y+h} ${x+4} ${y+h} L${x+32} ${y+h} Q${x+36} ${y+h} ${x+36} ${y+h-8} L${x+36} ${y+40} Q${x+36} ${y+26} ${x+34} ${y+18} Z`}
              fill={`url(#gb${i}${colors[0].slice(1,4)})`} stroke="rgba(198,167,90,0.2)" strokeWidth="0.4"/>
            <rect x={x+12} y={y+8} width="12" height="14" rx="2" fill={colors[0]} stroke="rgba(198,167,90,0.2)" strokeWidth="0.4"/>
            <rect x={x+9} y={y+2} width="18" height="9" rx="3" fill="#C6A75A" opacity={0.6 + i*0.1}/>
          </g>
        )
      })}
    </svg>
  )
}

export default function GiftSetsPage() {
  const { addItem } = useCart()

  const addSet = (set) => {
    addItem({ ...set, id: set.id, category:'Gift Sets', ml:0, inStock:true })
  }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
      style={{ paddingTop:100, background:'var(--ivory)' }}>

      {/* Header */}
      <div style={{ padding:'80px 60px', background:'linear-gradient(160deg,#0f0c06,#0B0B0B)', borderBottom:'1px solid rgba(198,167,90,0.08)', textAlign:'center' }}>
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }}>
          <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:16 }}>✦ The Art of Giving</span>
          <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(36px,5vw,64px)', color:'var(--text-main)', marginBottom:20, lineHeight:1.1 }}>
            Curated Gift Sets
          </h1>
          <p style={{ fontSize:14, color:'#A09070', lineHeight:1.9, maxWidth:520, margin:'0 auto', fontWeight:300 }}>
            Each gift set arrives in our signature black and gold box, wrapped in ivory silk, with a handwritten fragrance scroll and a personal note card.
          </p>
        </motion.div>
      </div>

      {/* Packaging detail */}
      <div style={{ padding:'60px', background:'rgba(198,167,90,0.03)', borderBottom:'1px solid rgba(198,167,90,0.08)', display:'flex', gap:60, justifyContent:'center', flexWrap:'wrap' }}>
        {['Signature Black & Gold Box','Ivory Silk Wrapping','Handwritten Fragrance Scroll','Personal Note Card','Free Gift Message','Discreet Billing'].map((feat, i) => (
          <motion.div key={feat} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:i*0.07, duration:0.5 }} viewport={{ once:true }}
            style={{ textAlign:'center', minWidth:100 }}>
            <div style={{ fontSize:9, letterSpacing:2, color:'var(--gold)', textTransform:'uppercase', lineHeight:1.6 }}>{feat}</div>
          </motion.div>
        ))}
      </div>

      {/* Gift sets grid */}
      <div style={{ padding:'80px 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:2 }}>
          {giftSets.map((set, i) => (
            <motion.div key={set.id}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:i*0.1 }} viewport={{ once:true }}
              whileHover={{ borderColor:'rgba(198,167,90,0.3)', boxShadow:'0 0 40px rgba(198,167,90,0.05)' }}
              style={{ background:'var(--beige)', border:'1px solid rgba(198,167,90,0.08)', transition:'all 0.4s' }}>
              {/* Visual */}
              <div style={{ height:200, background:'linear-gradient(135deg,#0d0c08,#0B0B0B)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', borderBottom:'1px solid rgba(198,167,90,0.06)' }}>
                {set.badge && <div style={{ position:'absolute', top:16, left:16, background:'#C6A75A', color:'#0B0B0B', fontSize:8, letterSpacing:2, padding:'4px 10px', fontWeight:700 }}>{set.badge.toUpperCase()}</div>}
                <GiftBottles colors={set.gradColors} />
              </div>
              {/* Info */}
              <div style={{ padding:'28px 28px 32px' }}>
                <div style={{ fontFamily:'Cinzel,serif', fontSize:20, color:'var(--text-main)', marginBottom:6 }}>{set.name}</div>
                <div style={{ fontSize:10, letterSpacing:2, color:'var(--gold)', marginBottom:16 }}>{set.subtitle}</div>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 20px', display:'flex', flexDirection:'column', gap:6 }}>
                  {set.contents.map(item => (
                    <li key={item} style={{ fontSize:11, color:'var(--text-muted)', display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ width:16, height:1, background:'rgba(198,167,90,0.4)', display:'inline-block', flexShrink:0 }}/>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:20 }}>
                  <span style={{ fontFamily:'Cinzel,serif', fontSize:24, color:'var(--gold)' }}>₹{set.price.toLocaleString()}</span>
                  <span style={{ fontSize:13, color:'var(--text-light)', textDecoration:'line-through' }}>₹{set.originalPrice.toLocaleString()}</span>
                </div>
                <motion.button onClick={() => addSet(set)}
                  style={{ width:'100%', background:'transparent', border:'1px solid rgba(198,167,90,0.3)', color:'var(--gold)', padding:'14px', fontSize:9, letterSpacing:3, fontFamily:'Montserrat,sans-serif' }}
                  whileHover={{ background:'rgba(198,167,90,0.08)', borderColor:'#C6A75A' }}>
                  ADD TO BAG →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom gift banner */}
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}
        style={{ margin:'0 60px 80px', padding:'60px', background:'rgba(198,167,90,0.04)', border:'1px solid rgba(198,167,90,0.12)', textAlign:'center' }}>
        <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:16 }}>✦ Bespoke Service</span>
        <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(22px,3vw,34px)', color:'var(--text-main)', marginBottom:16 }}>Create a Custom Gift Set</h2>
        <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9, maxWidth:480, margin:'0 auto 32px', fontWeight:300 }}>
          Corporate orders, wedding favours, and bespoke gifting programmes. We can engrave bottles, print custom labels, and create completely personalised fragrance experiences.
        </p>
        <motion.button style={{ border:'1px solid #C6A75A', color:'var(--gold)', padding:'14px 44px', fontSize:10, letterSpacing:3, background:'transparent', fontFamily:'Montserrat,sans-serif' }}
          whileHover={{ background:'#C6A75A', color:'#0B0B0B' }} transition={{ duration:0.3 }}>
          ENQUIRE NOW →
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
