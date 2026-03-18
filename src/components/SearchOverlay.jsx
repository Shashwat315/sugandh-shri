// SearchOverlay — warm sandalwood theme
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'

export default function SearchOverlay({ isOpen, onClose }) {
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 100) }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    const found = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    ).slice(0,6)
    setResults(found)
  }, [query])

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  const goTo = slug => { navigate(`/product/${slug}`); onClose() }

  const suggestions = ['Royal Oudh', 'Rose Attar', 'Sandalwood', 'Jasmine', 'Vetiver', 'Amber']

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}}
          onClick={onClose}
          style={{ position:'fixed', inset:0, background:'rgba(47,37,35,0.65)', backdropFilter:'blur(12px)', zIndex:4000, display:'flex', flexDirection:'column', alignItems:'center', paddingTop:'clamp(80px,12vw,120px)', padding:'clamp(80px,12vw,120px) clamp(16px,4vw,40px) 40px' }}>

          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:0.3}}
            onClick={e => e.stopPropagation()}
            style={{ width:'100%', maxWidth:600, background:'var(--ivory)', borderRadius:10, overflow:'hidden', boxShadow:'0 24px 80px rgba(47,37,35,0.3)' }}>

            {/* Search input */}
            <div style={{ display:'flex', alignItems:'center', gap:14, padding:'clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)', borderBottom:'1px solid rgba(106,78,66,0.1)' }}>
              <span style={{ fontSize:20, color:'var(--text-light)' }}>⌕</span>
              <input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)}
                placeholder="Search fragrances, notes, ingredients…"
                style={{ flex:1, background:'transparent', border:'none', fontSize:'clamp(14px,2vw,16px)', color:'var(--text-main)', fontFamily:'Lora,serif', outline:'none', padding:0 }}/>
              <button onClick={onClose} style={{ background:'var(--beige)', border:'none', color:'var(--text-muted)', width:30, height:30, borderRadius:'50%', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>✕</button>
            </div>

            {/* Suggestions */}
            {!query && (
              <div style={{ padding:'clamp(14px,2vw,20px) clamp(16px,3vw,24px)' }}>
                <div style={{ fontSize:9, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif', marginBottom:12 }}>Popular Searches</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {suggestions.map(s => (
                    <button key={s} onClick={() => setQuery(s)}
                      style={{ background:'var(--beige)', border:'1px solid rgba(106,78,66,0.15)', color:'var(--text-muted)', padding:'6px 14px', fontSize:12, fontFamily:'Lora,serif', borderRadius:20, transition:'all 0.2s' }}
                      onMouseEnter={e=>{e.currentTarget.style.background='var(--brown)';e.currentTarget.style.color='var(--ivory)'}}
                      onMouseLeave={e=>{e.currentTarget.style.background='var(--beige)';e.currentTarget.style.color='var(--text-muted)'}}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {query && (
              <div>
                {results.length > 0 ? (
                  results.map((p,i) => (
                    <motion.button key={p.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                      onClick={() => goTo(p.slug)}
                      style={{ width:'100%', display:'flex', alignItems:'center', gap:14, padding:'clamp(12px,2vw,16px) clamp(16px,3vw,24px)', background:'transparent', border:'none', borderBottom:'1px solid rgba(106,78,66,0.06)', textAlign:'left', transition:'background 0.2s' }}
                      onMouseEnter={e=>e.currentTarget.style.background='var(--beige)'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <div style={{ width:46, height:52, borderRadius:5, overflow:'hidden', background:'var(--ivory-dark)', flexShrink:0 }}>
                        {p.image && <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>e.target.style.display='none'}/>}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:9, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif', marginBottom:3 }}>{p.category}</div>
                        <div style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(13px,1.5vw,15px)', color:'var(--text-main)', marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
                        <div style={{ fontSize:12, color:'var(--text-light)', fontFamily:'Lora,serif', fontStyle:'italic', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.description}</div>
                      </div>
                      <div style={{ fontFamily:'Cinzel,serif', fontSize:15, color:'var(--brown)', flexShrink:0 }}>₹{p.price.toLocaleString('en-IN')}</div>
                    </motion.button>
                  ))
                ) : (
                  <div style={{ padding:'clamp(24px,4vw,40px)', textAlign:'center' }}>
                    <div style={{ fontFamily:'Cinzel,serif', fontSize:32, color:'rgba(106,78,66,0.1)', marginBottom:10 }}>✦</div>
                    <p style={{ color:'var(--text-light)', fontFamily:'Lora,serif', fontSize:13 }}>No fragrances found for "{query}"</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
