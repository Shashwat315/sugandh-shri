// ============================================================
// ProductDetailPage.jsx  /product/:slug
// Full product page: hero image panel, fragrance notes wheel,
// ingredients accordion, related products, breadcrumb.
// Framer Motion: staggered entrance, accordion, image zoom.
// ============================================================
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart }     from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { products }    from '../data/products'
import ProductCard     from '../components/ProductCard'

// ── Accordion item ──────────────────────────────────────────
function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom:'1px solid rgba(198,167,90,0.08)' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:'100%', textAlign:'left', background:'transparent', border:'none', padding:'22px 0', display:'flex', justifyContent:'space-between', alignItems:'center', color:'var(--text-main)', fontFamily:'Montserrat,sans-serif', fontSize:11, letterSpacing:2, textTransform:'uppercase' }}>
        {title}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration:0.3 }}
          style={{ color:'var(--gold)', fontSize:22, lineHeight:1, flexShrink:0 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content" initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration:0.4, ease:[0.25,0.46,0.45,0.94] }} style={{ overflow:'hidden' }}>
            <div style={{ paddingBottom:24 }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Quantity selector ────────────────────────────────────────
function QtySelector({ qty, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', border:'1px solid rgba(198,167,90,0.25)', width:'fit-content' }}>
      <button onClick={() => onChange(Math.max(1, qty - 1))}
        style={{ width:44, height:44, background:'transparent', border:'none', color:'var(--gold)', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
      <span style={{ width:40, textAlign:'center', fontSize:14, color:'var(--text-main)', fontFamily:'Cinzel,serif' }}>{qty}</span>
      <button onClick={() => onChange(qty + 1)}
        style={{ width:44, height:44, background:'transparent', border:'none', color:'var(--gold)', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
    </div>
  )
}

// ── Fragrance notes visualiser ───────────────────────────────
function NotesWheel({ notes }) {
  const layers = [
    { key:'top',   label:'Top',   color:'rgba(198,167,90,0.7)',  radius:80  },
    { key:'heart', label:'Heart', color:'rgba(198,167,90,0.45)', radius:120 },
    { key:'base',  label:'Base',  color:'rgba(198,167,90,0.2)',  radius:160 },
  ]
  return (
    <div style={{ position:'relative', width:340, height:340, margin:'0 auto', flexShrink:0 }}>
      {layers.map(layer => (
        <div key={layer.key} style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:layer.radius*2, height:layer.radius*2, borderRadius:'50%', border:`1px solid ${layer.color}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)', fontSize:8, letterSpacing:2, color:layer.color, textTransform:'uppercase', whiteSpace:'nowrap', background:'var(--ivory)', padding:'0 8px' }}>{layer.label}</div>
        </div>
      ))}
      {/* Centre dot */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:24, height:24, borderRadius:'50%', background:'#C6A75A', opacity:0.6 }} />
      {/* Note pills placed around circles */}
      {Object.entries(notes).map(([layer, items], li) =>
        items.map((note, ni) => {
          const radius = [90, 130, 170][li]
          const total = items.length
          const angle = (360 / total) * ni - 90 + li * 15
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius
          return (
            <motion.div key={`${layer}-${note}`}
              initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay: 0.1 * ni + 0.2 * li, duration:0.5 }}
              style={{ position:'absolute', top:'50%', left:'50%', transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, background:'rgba(245,241,233,0.9)', border:'1px solid rgba(198,167,90,0.2)', padding:'4px 10px', fontSize:9, color:'var(--gold)', letterSpacing:1, whiteSpace:'nowrap', textAlign:'center' }}>
              {note}
            </motion.div>
          )
        })
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────
export default function ProductDetailPage() {
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const { addItem }         = useCart()
  const { toggle, isWishlisted } = useWishlist()

  const product = products.find(p => p.slug === slug)
  const related = products.filter(p => p.id !== product?.id && p.category === product?.category).slice(0, 3)

  const [qty, setQty]         = useState(1)
  const [activeTab, setTab]   = useState('notes')
  const [added, setAdded]     = useState(false)

  if (!product) return (
    <div style={{ paddingTop:160, textAlign:'center', minHeight:'60vh' }}>
      <div style={{ fontFamily:'Cinzel,serif', fontSize:48, color:'rgba(198,167,90,0.15)', marginBottom:24 }}>404</div>
      <p style={{ color:'var(--text-muted)', marginBottom:24 }}>Product not found.</p>
      <button onClick={() => navigate('/shop')} style={{ border:'1px solid rgba(198,167,90,0.3)', color:'var(--gold)', padding:'12px 32px', fontSize:10, letterSpacing:3, background:'transparent', fontFamily:'Montserrat,sans-serif' }}>BACK TO SHOP</button>
    </div>
  )

  const { name, category, price, originalPrice, rating, reviews, badge, description, longDescription, notes, origin, process, longevity, sillage, tags, ml, inStock, gradColors } = product
  const discount = Math.round((1 - price / originalPrice) * 100)
  const wishlisted = isWishlisted(product.id)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
      style={{ paddingTop:100, background:'var(--ivory)', minHeight:'100vh' }}>

      {/* Breadcrumb */}
      <div style={{ padding:'20px 60px', borderBottom:'1px solid rgba(198,167,90,0.06)', display:'flex', gap:12, alignItems:'center' }}>
        {[{ label:'Home', to:'/' }, { label:'Shop', to:'/shop' }, { label:category, to:`/${category.toLowerCase().replace(' ','-')}` }, { label:name, to:null }].map((crumb, i, arr) => (
          <span key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
            {crumb.to ? <Link to={crumb.to} style={{ fontSize:10, color:'var(--text-muted)', letterSpacing:1, textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>e.target.style.color='#C6A75A'} onMouseLeave={e=>e.target.style.color='#6A4E42'}>{crumb.label}</Link>
              : <span style={{ fontSize:10, color:'var(--gold)', letterSpacing:1 }}>{crumb.label}</span>}
            {i < arr.length - 1 && <span style={{ color:'rgba(198,167,90,0.3)', fontSize:10 }}>›</span>}
          </span>
        ))}
      </div>

      {/* Product hero */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:600 }}>
        {/* Left: Visual */}
        <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.9 }}
          style={{ background:'linear-gradient(135deg,#0d0c08,#0B0B0B)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 40px', position:'relative', borderRight:'1px solid rgba(198,167,90,0.06)' }}>
          {badge && <div style={{ position:'absolute', top:28, left:28, background:'#C6A75A', color:'#0B0B0B', fontSize:8, letterSpacing:2, padding:'5px 12px', fontWeight:700 }}>{badge.toUpperCase()}</div>}

          {/* Wishlist button */}
          <motion.button onClick={() => toggle(product)} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
            style={{ position:'absolute', top:24, right:24, width:44, height:44, border:`1px solid ${wishlisted ? '#C6A75A' : 'rgba(198,167,90,0.25)'}`, background: wishlisted ? 'rgba(198,167,90,0.12)' : 'transparent', color:'var(--gold)', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>
            {wishlisted ? '♥' : '♡'}
          </motion.button>

          {/* Big animated bottle */}
          <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}>
            <svg width="200" height="360" viewBox="0 0 200 360" fill="none">
              <defs>
                <linearGradient id="dpbg" x1="50" y1="0" x2="150" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor={gradColors?.[0] || '#1a1208'}/>
                  <stop offset="50%" stopColor={gradColors?.[1] || '#251c0e'}/>
                  <stop offset="100%" stopColor={gradColors?.[2] || '#0d0b06'}/>
                </linearGradient>
                <linearGradient id="dpcap" x1="64" y1="34" x2="136" y2="80" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#A07830"/>
                  <stop offset="45%" stopColor="#C6A75A"/>
                  <stop offset="100%" stopColor="#6B4E10"/>
                </linearGradient>
              </defs>
              <ellipse cx="100" cy="348" rx="55" ry="9" fill="rgba(198,167,90,0.06)"/>
              <path d="M56 112 Q46 140 43 180 L40 300 Q40 324 58 332 L142 332 Q160 324 160 300 L157 180 Q154 140 144 112 Z"
                fill="url(#dpbg)" stroke="rgba(198,167,90,0.3)" strokeWidth="0.5"/>
              <rect x="80" y="62" width="40" height="56" rx="4" fill={gradColors?.[0] || '#1a1208'} stroke="rgba(198,167,90,0.2)" strokeWidth="0.5"/>
              <rect x="68" y="34" width="64" height="34" rx="7" fill="url(#dpcap)"/>
              <line x1="68" y1="52" x2="132" y2="52" stroke="rgba(245,241,233,0.25)" strokeWidth="0.6"/>
              {/* Label */}
              <rect x="50" y="180" width="100" height="96" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(198,167,90,0.18)" strokeWidth="0.6"/>
              <line x1="58" y1="195" x2="142" y2="195" stroke="rgba(198,167,90,0.35)" strokeWidth="0.5"/>
              <line x1="58" y1="268" x2="142" y2="268" stroke="rgba(198,167,90,0.35)" strokeWidth="0.5"/>
              <text x="100" y="222" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="9" fill="rgba(198,167,90,0.85)" letterSpacing="2">SUGANDH</text>
              <text x="100" y="236" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="9" fill="rgba(198,167,90,0.85)" letterSpacing="2">SHRI</text>
              <text x="100" y="254" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontSize="7" fill="rgba(198,167,90,0.45)" letterSpacing="3">{name.toUpperCase().slice(0,12)}</text>
              <text x="100" y="264" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontSize="6" fill="rgba(160,130,100,0.35)" letterSpacing="2">{ml}ML</text>
              {/* Highlights */}
              <path d="M56 130 Q51 160 50 200 L54 200 Q55 160 60 130 Z" fill="rgba(255,255,255,0.04)"/>
              <path d="M154 145 Q158 175 158 210 L154 210 Q154 175 150 145 Z" fill="rgba(255,255,255,0.02)"/>
              {/* Animated mist */}
              {[{cx:32,cy:170,r:2,dur:'3.5s'},{cx:172,cy:200,r:1.5,dur:'4.2s'},{cx:24,cy:250,r:2.5,dur:'5s'},{cx:180,cy:140,r:1,dur:'3s'}].map((p,i)=>(
                <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="rgba(198,167,90,0.25)">
                  <animate attributeName="cy" values={`${p.cy};${p.cy-20};${p.cy}`} dur={p.dur} repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.25;0.6;0.25" dur={p.dur} repeatCount="indefinite"/>
                </circle>
              ))}
            </svg>
          </motion.div>

          <div style={{ marginTop:24, fontSize:11, letterSpacing:3, color:'var(--text-muted)', textAlign:'center' }}>{ml}ML · {category.toUpperCase()}</div>
          <div style={{ marginTop:12, fontSize:10, color:'var(--text-light)', letterSpacing:1 }}>Origin: {origin}</div>
        </motion.div>

        {/* Right: Info */}
        <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.9 }}
          style={{ padding:'52px 56px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ fontSize:9, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', marginBottom:10 }}>{category}</div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(26px,3vw,40px)', color:'var(--text-main)', marginBottom:14, lineHeight:1.2 }}>{name}</h1>

          {/* Stars */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <span style={{ color:'var(--gold)', fontSize:13 }}>{'★'.repeat(Math.floor(rating))}</span>
            <span style={{ fontSize:12, color:'var(--gold)' }}>{rating}</span>
            <span style={{ fontSize:11, color:'var(--text-light)' }}>({reviews} reviews)</span>
          </div>

          {/* Price */}
          <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:10 }}>
            <span style={{ fontFamily:'Cinzel,serif', fontSize:32, color:'var(--gold)' }}>₹{price.toLocaleString()}</span>
            <span style={{ fontSize:15, color:'var(--text-light)', textDecoration:'line-through' }}>₹{originalPrice.toLocaleString()}</span>
            <span style={{ fontSize:10, background:'rgba(198,167,90,0.12)', color:'var(--gold)', padding:'3px 10px', letterSpacing:1 }}>SAVE {discount}%</span>
          </div>
          <div style={{ fontSize:10, color:'var(--text-light)', letterSpacing:1, marginBottom:28 }}>Inclusive of all taxes · Free shipping above ₹1999</div>

          <p style={{ fontSize:13, color:'#A09070', lineHeight:2, fontWeight:300, marginBottom:28 }}>{description}</p>

          {/* Tags */}
          {tags && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:28 }}>
              {tags.map(t => <span key={t} style={{ fontSize:9, color:'var(--text-muted)', border:'1px solid rgba(106,78,66,0.25)', padding:'4px 11px', letterSpacing:1 }}>{t}</span>)}
            </div>
          )}

          {/* Qty + Add */}
          <div style={{ display:'flex', gap:14, marginBottom:16, flexWrap:'wrap' }}>
            <QtySelector qty={qty} onChange={setQty} />
            <motion.button onClick={handleAdd} disabled={!inStock}
              animate={{ background: added ? '#4a7c3f' : inStock ? '#C6A75A' : 'rgba(198,167,90,0.1)' }}
              transition={{ duration:0.3 }}
              style={{ flex:1, border:'none', color: inStock ? '#0B0B0B' : '#4A3A34', padding:'0 32px', fontSize:10, letterSpacing:3, fontFamily:'Montserrat,sans-serif', fontWeight:700, height:44, minWidth:180 }}
              whileHover={inStock ? { scale:1.01 } : {}} whileTap={inStock ? { scale:0.98 } : {}}>
              {added ? '✓ ADDED TO BAG' : inStock ? 'ADD TO COLLECTION' : 'OUT OF STOCK'}
            </motion.button>
          </div>

          {/* Wishlist + Share */}
          <div style={{ display:'flex', gap:12 }}>
            <motion.button onClick={() => toggle(product)} whileHover={{ borderColor:'rgba(198,167,90,0.5)' }}
              style={{ flex:1, border:'1px solid rgba(198,167,90,0.2)', color: wishlisted ? '#C6A75A' : '#6A4E42', padding:'12px', fontSize:9, letterSpacing:2, background: wishlisted ? 'rgba(198,167,90,0.06)' : 'transparent', fontFamily:'Montserrat,sans-serif' }}>
              {wishlisted ? '♥ WISHLISTED' : '♡ ADD TO WISHLIST'}
            </motion.button>
            <motion.button whileHover={{ borderColor:'rgba(198,167,90,0.5)' }}
              style={{ flex:1, border:'1px solid rgba(198,167,90,0.2)', color:'var(--text-muted)', padding:'12px', fontSize:9, letterSpacing:2, background:'transparent', fontFamily:'Montserrat,sans-serif' }}>
              ↗ SHARE
            </motion.button>
          </div>

          {/* Quick specs */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:28 }}>
            {[{ l:'Longevity', v:longevity }, { l:'Sillage', v:sillage }, { l:'Process', v:process }, { l:'Origin', v:origin }].filter(s=>s.v).map(spec => (
              <div key={spec.l} style={{ background:'rgba(198,167,90,0.04)', border:'1px solid rgba(198,167,90,0.07)', padding:'12px 14px' }}>
                <div style={{ fontSize:8, letterSpacing:2, color:'var(--text-light)', textTransform:'uppercase', marginBottom:4 }}>{spec.l}</div>
                <div style={{ fontSize:11, color:'#A09070', lineHeight:1.4 }}>{spec.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs: Story / Notes / Details */}
      <div style={{ borderTop:'1px solid rgba(198,167,90,0.08)', borderBottom:'1px solid rgba(198,167,90,0.08)' }}>
        <div style={{ display:'flex', padding:'0 60px' }}>
          {['notes','story','details'].map(tab => (
            <button key={tab} onClick={() => setTab(tab)}
              style={{ padding:'20px 32px', background:'transparent', border:'none', borderBottom: activeTab===tab ? '1px solid #C6A75A' : '1px solid transparent', color: activeTab===tab ? '#C6A75A' : '#6A4E42', fontSize:10, letterSpacing:3, fontFamily:'Montserrat,sans-serif', textTransform:'uppercase', transition:'all 0.3s', marginBottom:-1 }}>
              {tab === 'notes' ? 'Fragrance Notes' : tab === 'story' ? 'The Story' : 'Details & Care'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding:'60px', minHeight:400 }}>
        <AnimatePresence mode="wait">
          {activeTab === 'notes' && notes && (
            <motion.div key="notes" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}
              style={{ display:'flex', gap:80, alignItems:'center', flexWrap:'wrap' }}>
              <NotesWheel notes={notes} />
              <div style={{ flex:1, minWidth:260 }}>
                <h3 style={{ fontFamily:'Cinzel,serif', fontSize:22, color:'var(--text-main)', marginBottom:28 }}>Scent Profile</h3>
                {Object.entries(notes).map(([layer, items]) => (
                  <div key={layer} style={{ marginBottom:22 }}>
                    <div style={{ fontSize:9, letterSpacing:4, color:'var(--gold)', textTransform:'uppercase', marginBottom:10 }}>{layer} notes</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                      {items.map(note => (
                        <span key={note} style={{ fontSize:11, color:'#A09070', border:'1px solid rgba(198,167,90,0.15)', padding:'6px 14px', letterSpacing:1 }}>{note}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'story' && (
            <motion.div key="story" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.4 }} style={{ maxWidth:700 }}>
              <h3 style={{ fontFamily:'Cinzel,serif', fontSize:22, color:'var(--text-main)', marginBottom:24 }}>The Story Behind {name}</h3>
              <div style={{ width:40, height:1, background:'#C6A75A', marginBottom:28 }} />
              <p style={{ fontSize:14, color:'#A09070', lineHeight:2, fontWeight:300 }}>{longDescription || description}</p>
              <div style={{ marginTop:32, borderLeft:'1px solid #C6A75A', paddingLeft:24 }}>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:16, color:'#E8D5A3', fontStyle:'italic', lineHeight:1.8 }}>
                  "Fragrance is the memory of a moment, distilled into a bottle and gifted to time."
                </p>
              </div>
            </motion.div>
          )}
          {activeTab === 'details' && (
            <motion.div key="details" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.4 }} style={{ maxWidth:680 }}>
              <AccordionItem title="Composition & Ingredients" defaultOpen>
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9, fontWeight:300 }}>All our attars and perfumes are crafted from 100% natural botanical ingredients. No synthetic accords, no aroma chemicals, no preservatives. Distilled in pure sandalwood oil base.</p>
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9, fontWeight:300, marginTop:12 }}>Ingredients: Natural essential oils distilled in Santalum album (Mysore Sandalwood) oil. May contain traces of tree nuts. Perform a patch test before first use.</p>
              </AccordionItem>
              <AccordionItem title="How to Use">
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9, fontWeight:300 }}>Apply 1–2 drops directly to pulse points: wrists, neck, inner elbows. Do not rub — allow to absorb naturally. For a longer-lasting experience, apply to moisturised skin. A little goes a very long way.</p>
              </AccordionItem>
              <AccordionItem title="Storage & Shelf Life">
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9, fontWeight:300 }}>Store in a cool, dark place away from direct sunlight and heat. When stored correctly, natural attars improve with age and can last 10–20 years. Keep the stopper tightly sealed when not in use.</p>
              </AccordionItem>
              <AccordionItem title="Shipping & Returns">
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9, fontWeight:300 }}>All fragrance products are carefully packed in our signature black-and-gold gift box with tamper-evident seals. Domestic shipping: 3–5 business days. International: 7–14 days. Returns accepted within 7 days of receipt for unopened products only.</p>
              </AccordionItem>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ padding:'0 60px 80px', borderTop:'1px solid rgba(198,167,90,0.08)' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }} style={{ padding:'60px 0 40px' }}>
            <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:14 }}>✦ You May Also Like</span>
            <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(24px,3vw,34px)', color:'var(--text-main)' }}>Related Fragrances</h2>
            <div style={{ width:40, height:1, background:'#C6A75A', marginTop:18 }} />
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </motion.div>
  )
}
