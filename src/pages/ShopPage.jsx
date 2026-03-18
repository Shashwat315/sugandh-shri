// ShopPage — warm sandalwood, fully mobile responsive
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const SORTS = ['Featured','Price: Low to High','Price: High to Low','Top Rated','Newest']

export default function ShopPage() {
  const [cat,    setCat]    = useState('All')
  const [sort,   setSort]   = useState('Featured')
  const [search, setSearch] = useState('')
  const [maxPx,  setMaxPx]  = useState(5000)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const allCats = ['All', ...categories.map(c=>c.name)]

  const filtered = useMemo(() => {
    let list = [...products]
    if (cat!=='All') list = list.filter(p=>p.category===cat)
    if (search) list = list.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.tags?.some(t=>t.toLowerCase().includes(search.toLowerCase())))
    list = list.filter(p=>p.price<=maxPx)
    if (sort==='Price: Low to High')  list.sort((a,b)=>a.price-b.price)
    else if (sort==='Price: High to Low') list.sort((a,b)=>b.price-a.price)
    else if (sort==='Top Rated')      list.sort((a,b)=>b.rating-a.rating)
    else if (sort==='Newest')         list.sort((a,b)=>b.id-a.id)
    return list
  }, [cat,sort,search,maxPx])

  const resetFilters = () => { setCat('All'); setSort('Featured'); setSearch(''); setMaxPx(5000) }

  const FilterContent = () => (
    <>
      {/* Search */}
      <div style={{marginBottom:24}}>
        <div style={{fontSize:9,letterSpacing:3,color:'var(--brown)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:10}}>Search</div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Oud, Rose, Sandalwood…"
          style={{fontSize:12}}/>
      </div>
      {/* Category */}
      <div style={{marginBottom:24}}>
        <div style={{fontSize:9,letterSpacing:3,color:'var(--brown)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:10}}>Category</div>
        {allCats.map(c=>(
          <button key={c} onClick={()=>{setCat(c);setSidebarOpen(false)}}
            style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',background:'transparent',border:'none',color:cat===c?'var(--brown)':'var(--text-muted)',fontSize:13,padding:'8px 0',fontFamily:'Lora,serif',borderBottom:'1px solid rgba(106,78,66,0.06)',fontWeight:cat===c?600:400,textAlign:'left'}}>
            {c}
            {cat===c&&<span style={{width:18,height:1.5,background:'var(--gold)',display:'inline-block'}}/>}
          </button>
        ))}
      </div>
      {/* Price */}
      <div style={{marginBottom:24}}>
        <div style={{fontSize:9,letterSpacing:3,color:'var(--brown)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:8}}>Max Price: ₹{maxPx.toLocaleString('en-IN')}</div>
        <input type="range" min="500" max="5000" step="100" value={maxPx} onChange={e=>setMaxPx(+e.target.value)} style={{width:'100%',marginBottom:4}}/>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'var(--text-light)',fontFamily:'Montserrat,sans-serif'}}><span>₹500</span><span>₹5,000</span></div>
      </div>
      <button onClick={resetFilters}
        style={{width:'100%',border:'1.5px solid rgba(106,78,66,0.25)',color:'var(--text-muted)',padding:'9px',fontSize:9,letterSpacing:2,background:'transparent',fontFamily:'Montserrat,sans-serif',borderRadius:4,transition:'all 0.25s'}}
        onMouseEnter={e=>e.currentTarget.style.borderColor='var(--brown)'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(106,78,66,0.25)'}>
        CLEAR FILTERS
      </button>
    </>
  )

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}
      style={{paddingTop:100,minHeight:'100vh',background:'var(--ivory)'}}>

      {/* Page hero */}
      <div style={{position:'relative',height:'clamp(160px,25vw,260px)',overflow:'hidden',display:'flex',alignItems:'center'}}>
        <div style={{position:'absolute',inset:0}}>
          <img src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=1600&q=85"
            alt="Shop" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 35%'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,rgba(245,241,233,0.97) 0%,rgba(245,241,233,0.75) 55%,rgba(245,241,233,0.35) 100%)'}}/>
        </div>
        <motion.div style={{position:'relative',zIndex:2,padding:'0 clamp(16px,5vw,64px)'}}
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}}>
          <span className="section-tag">✦ The Collection</span>
          <h1 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(24px,5vw,52px)',color:'var(--brown-deeper)',marginBottom:8}}>All Fragrances</h1>
          <p style={{fontSize:13,color:'var(--text-muted)',fontFamily:'Lora,serif'}}>{products.length} products · Attars, Perfumes & Essential Oils</p>
        </motion.div>
      </div>

      {/* Mobile filter toggle */}
      <div style={{padding:'12px clamp(16px,5vw,64px)',background:'var(--beige)',borderBottom:'1px solid rgba(106,78,66,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:12,color:'var(--text-muted)',fontFamily:'Lora,serif'}}>{filtered.length} fragrance{filtered.length!==1?'s':''}</span>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>setSidebarOpen(o=>!o)}
            style={{background:'var(--brown)',color:'var(--ivory)',border:'none',padding:'8px 16px',fontSize:9,letterSpacing:2,fontFamily:'Montserrat,sans-serif',borderRadius:4}} className="filter-toggle-btn">
            {sidebarOpen?'CLOSE':'FILTERS'}
          </button>
          <select value={sort} onChange={e=>setSort(e.target.value)}
            style={{background:'var(--beige)',border:'1.5px solid rgba(106,78,66,0.2)',color:'var(--text-main)',padding:'7px 12px',fontSize:11,fontFamily:'Lora,serif',borderRadius:4,width:'auto'}}>
            {SORTS.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Mobile filter panel */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
            style={{overflow:'hidden',background:'var(--ivory)',borderBottom:'1px solid rgba(106,78,66,0.1)'}}>
            <div style={{padding:'24px clamp(16px,5vw,64px)'}}>
              <FilterContent/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{display:'grid',gridTemplateColumns:'220px 1fr',minHeight:'50vh'}} className="shop-grid">
        {/* Desktop sidebar */}
        <aside style={{padding:'28px 20px 28px 24px',borderRight:'1px solid rgba(106,78,66,0.08)',background:'var(--beige)',position:'sticky',top:80,height:'fit-content'}} className="shop-sidebar">
          <FilterContent/>
        </aside>

        {/* Products */}
        <div style={{padding:'clamp(20px,3vw,32px) clamp(16px,3vw,40px)'}}>
          <AnimatePresence mode="popLayout">
            {filtered.length>0 ? (
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(clamp(200px,22vw,260px),1fr))',gap:'clamp(14px,2vw,24px)'}}>
                {filtered.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}
              </div>
            ) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{textAlign:'center',padding:'80px 0'}}>
                <div style={{fontFamily:'Cinzel,serif',fontSize:40,color:'rgba(106,78,66,0.1)',marginBottom:14}}>✦</div>
                <p style={{color:'var(--text-light)',fontFamily:'Lora,serif',fontSize:14}}>No fragrances match your search.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width:768px) {
          .shop-grid { grid-template-columns: 1fr !important; }
          .shop-sidebar { display: none !important; }
          .filter-toggle-btn { display: inline-block !important; }
        }
        @media (min-width:769px) {
          .filter-toggle-btn { display: none !important; }
        }
      `}</style>
    </motion.div>
  )
}
