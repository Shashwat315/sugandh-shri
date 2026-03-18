// ============================================================
// ProductReviews.jsx
// Star-rating breakdown, review list, write-review modal.
// Used inside ProductDetailPage tabs.
// ============================================================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SAMPLE_REVIEWS = [
  { id:1, author:'Priya S.', location:'Delhi', rating:5, date:'12 Jan 2025', title:'Simply extraordinary', body:'I have been searching for a truly authentic Royal Oudh for years. This is it. The depth, the longevity, the way it evolves on the skin — nothing compares. My friends keep asking what I am wearing.', verified:true },
  { id:2, author:'Ahmad K.', location:'Dubai', rating:5, date:'3 Feb 2025', title:'Royal in every sense', body:'The saffron opening is breathtaking. By the second hour the oud has fully bloomed and it is absolutely divine. Ordered three bottles already.', verified:true },
  { id:3, author:'Meera R.', location:'Chennai', rating:4, date:'28 Jan 2025', title:'Beautiful, slightly strong for daily wear', body:'The quality is undeniable — pure, natural, long-lasting. I find it slightly intense for office wear but perfect for evenings and special occasions. Would love a lighter daytime version.', verified:true },
  { id:4, author:'David L.', location:'London', rating:5, date:'15 Feb 2025', title:'Best attar I have found outside Kannauj', body:'I visited Kannauj two years ago and fell in love with the attars. Sugandh Shri has managed to bottle that experience perfectly and deliver it worldwide. Superb.', verified:false },
]

function StarRow({ rating, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
      <span style={{ fontSize:10, color:'var(--text-muted)', minWidth:12 }}>{rating}</span>
      <span style={{ fontSize:11, color:'var(--gold)' }}>★</span>
      <div style={{ flex:1, height:3, background:'rgba(198,167,90,0.1)', position:'relative', overflow:'hidden' }}>
        <motion.div initial={{ width:0 }} whileInView={{ width:`${pct}%` }} transition={{ duration:0.8, delay:0.1*(5-rating) }} viewport={{ once:true }}
          style={{ position:'absolute', inset:'0 auto 0 0', background:'linear-gradient(90deg,var(--gold-dark),#C6A75A)', borderRadius:2 }} />
      </div>
      <span style={{ fontSize:10, color:'var(--text-light)', minWidth:28 }}>{count}</span>
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}
      style={{ padding:'28px 0', borderBottom:'1px solid rgba(198,167,90,0.07)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
        <div>
          <div style={{ color:'var(--gold)', fontSize:13, letterSpacing:2, marginBottom:6 }}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
          <div style={{ fontFamily:'Playfair Display,serif', fontSize:16, color:'var(--text-main)' }}>{review.title}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:11, color:'var(--text-main)', fontWeight:500 }}>{review.author}</div>
          <div style={{ fontSize:9, color:'var(--text-light)', letterSpacing:1, marginTop:2 }}>{review.location} · {review.date}</div>
          {review.verified && <div style={{ fontSize:8, color:'rgba(198,167,90,0.6)', letterSpacing:1, marginTop:4 }}>✓ VERIFIED PURCHASE</div>}
        </div>
      </div>
      <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.85, fontWeight:300 }}>{review.body}</p>
    </motion.div>
  )
}

function WriteReviewModal({ onClose, productName }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover]   = useState(0)
  const [form, setForm]     = useState({ title:'', body:'', name:'', location:'' })
  const [submitted, setSubmitted] = useState(false)
  const set = k => v => setForm(p => ({...p,[k]:v}))

  const submit = () => {
    if (rating > 0 && form.title && form.body && form.name) setSubmitted(true)
  }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', backdropFilter:'blur(8px)', zIndex:4000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <motion.div initial={{ scale:0.92, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.95, opacity:0 }} transition={{ duration:0.35 }}
        onClick={e => e.stopPropagation()}
        style={{ background:'var(--beige)', border:'1px solid rgba(198,167,90,0.15)', width:'100%', maxWidth:560, padding:'48px', position:'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'transparent', border:'none', color:'var(--text-muted)', fontSize:20 }}>×</button>

        {submitted ? (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:40, color:'rgba(198,167,90,0.3)', marginBottom:20 }}>✦</div>
            <div style={{ fontFamily:'Cinzel,serif', fontSize:22, color:'var(--text-main)', marginBottom:12 }}>Thank you</div>
            <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.8 }}>Your review has been submitted for moderation. We appreciate you taking the time to share your experience.</p>
          </div>
        ) : (
          <>
            <div style={{ fontSize:9, letterSpacing:4, color:'var(--gold)', textTransform:'uppercase', marginBottom:8 }}>Write a Review</div>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:18, color:'var(--text-main)', marginBottom:28 }}>{productName}</div>

            {/* Star picker */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:8, letterSpacing:2, color:'var(--text-muted)', textTransform:'uppercase', marginBottom:10 }}>Your Rating</div>
              <div style={{ display:'flex', gap:6 }}>
                {[1,2,3,4,5].map(s => (
                  <motion.button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => setRating(s)}
                    animate={{ scale: (hover||rating)>=s ? 1.2 : 1 }}
                    style={{ background:'transparent', border:'none', fontSize:26, color:(hover||rating)>=s ? '#C6A75A' : 'rgba(198,167,90,0.2)', lineHeight:1 }}>★</motion.button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:8, letterSpacing:2, color:'var(--text-muted)', textTransform:'uppercase', marginBottom:8 }}>Review Title</div>
              <input value={form.title} onChange={e => set('title')(e.target.value)} placeholder="Summarise your experience" style={{ width:'100%', background:'rgba(198,167,90,0.03)', border:'1px solid rgba(198,167,90,0.12)', padding:'11px 14px', color:'var(--text-main)', fontSize:12, fontFamily:'Montserrat,sans-serif', outline:'none' }} />
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:8, letterSpacing:2, color:'var(--text-muted)', textTransform:'uppercase', marginBottom:8 }}>Your Review</div>
              <textarea value={form.body} onChange={e => set('body')(e.target.value)} rows={4} placeholder="Tell others about this fragrance..." style={{ width:'100%', background:'rgba(198,167,90,0.03)', border:'1px solid rgba(198,167,90,0.12)', padding:'11px 14px', color:'var(--text-main)', fontSize:12, fontFamily:'Montserrat,sans-serif', outline:'none', resize:'vertical' }} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
              <div>
                <div style={{ fontSize:8, letterSpacing:2, color:'var(--text-muted)', textTransform:'uppercase', marginBottom:8 }}>Name</div>
                <input value={form.name} onChange={e => set('name')(e.target.value)} placeholder="Priya S." style={{ width:'100%', background:'rgba(198,167,90,0.03)', border:'1px solid rgba(198,167,90,0.12)', padding:'11px 14px', color:'var(--text-main)', fontSize:12, fontFamily:'Montserrat,sans-serif', outline:'none' }} />
              </div>
              <div>
                <div style={{ fontSize:8, letterSpacing:2, color:'var(--text-muted)', textTransform:'uppercase', marginBottom:8 }}>Location</div>
                <input value={form.location} onChange={e => set('location')(e.target.value)} placeholder="Mumbai" style={{ width:'100%', background:'rgba(198,167,90,0.03)', border:'1px solid rgba(198,167,90,0.12)', padding:'11px 14px', color:'var(--text-main)', fontSize:12, fontFamily:'Montserrat,sans-serif', outline:'none' }} />
              </div>
            </div>
            <motion.button onClick={submit}
              style={{ width:'100%', background: (rating&&form.title&&form.body&&form.name) ? '#C6A75A' : 'rgba(198,167,90,0.15)', border:'none', color:(rating&&form.title&&form.body&&form.name) ? '#0B0B0B' : '#4A3A34', padding:'14px', fontSize:10, letterSpacing:3, fontFamily:'Montserrat,sans-serif', fontWeight:700 }}
              whileHover={(rating&&form.title&&form.body&&form.name) ? { background:'#E8D5A3' } : {}}>
              SUBMIT REVIEW
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

const DISTRIBUTION = [
  { rating:5, count:187 },
  { rating:4, count:68  },
  { rating:3, count:22  },
  { rating:2, count:9   },
  { rating:1, count:6   },
]
const TOTAL = DISTRIBUTION.reduce((s,d) => s+d.count, 0)
const AVG   = (DISTRIBUTION.reduce((s,d) => s+d.rating*d.count,0)/TOTAL).toFixed(1)

export default function ProductReviews({ productName = 'This Fragrance' }) {
  const [writeOpen, setWriteOpen] = useState(false)
  const [sortBy, setSort]         = useState('recent')

  const sorted = [...SAMPLE_REVIEWS].sort((a,b) =>
    sortBy === 'highest' ? b.rating - a.rating :
    sortBy === 'lowest'  ? a.rating - b.rating :
    b.id - a.id
  )

  return (
    <div>
      {/* Summary row */}
      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:48, alignItems:'start', marginBottom:48, paddingBottom:40, borderBottom:'1px solid rgba(198,167,90,0.08)' }}>
        {/* Big average */}
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:'Cinzel,serif', fontSize:64, color:'var(--gold)', lineHeight:1, marginBottom:8 }}>{AVG}</div>
          <div style={{ color:'var(--gold)', fontSize:16, letterSpacing:4, marginBottom:8 }}>{'★'.repeat(5)}</div>
          <div style={{ fontSize:10, color:'var(--text-light)', letterSpacing:2 }}>{TOTAL} REVIEWS</div>
        </div>
        {/* Bar chart */}
        <div>
          {DISTRIBUTION.map(d => <StarRow key={d.rating} rating={d.rating} count={d.count} total={TOTAL} />)}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
        <div style={{ display:'flex', gap:8 }}>
          {['recent','highest','lowest'].map(s => (
            <motion.button key={s} onClick={() => setSort(s)}
              animate={{ background: sortBy===s ? 'rgba(198,167,90,0.12)' : 'transparent', borderColor: sortBy===s ? 'rgba(198,167,90,0.4)' : 'rgba(198,167,90,0.12)' }}
              style={{ border:'1px solid', color: sortBy===s ? '#C6A75A' : '#6A4E42', padding:'7px 16px', fontSize:9, letterSpacing:2, fontFamily:'Montserrat,sans-serif', textTransform:'uppercase' }}>
              {s === 'recent' ? 'Most Recent' : s === 'highest' ? 'Highest' : 'Lowest'}
            </motion.button>
          ))}
        </div>
        <motion.button onClick={() => setWriteOpen(true)}
          style={{ border:'1px solid rgba(198,167,90,0.3)', color:'var(--gold)', padding:'9px 22px', fontSize:9, letterSpacing:2, background:'transparent', fontFamily:'Montserrat,sans-serif' }}
          whileHover={{ background:'rgba(198,167,90,0.07)', borderColor:'#C6A75A' }}>
          + WRITE A REVIEW
        </motion.button>
      </div>

      {/* Review list */}
      {sorted.map(r => <ReviewCard key={r.id} review={r} />)}

      <AnimatePresence>
        {writeOpen && <WriteReviewModal key="wr" onClose={() => setWriteOpen(false)} productName={productName} />}
      </AnimatePresence>
    </div>
  )
}
