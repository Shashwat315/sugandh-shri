// ============================================================
// WishlistPage.jsx  /wishlist
// Grid of wishlisted products with remove + add-to-cart.
// ============================================================
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart }     from '../context/CartContext'

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist()
  const { addItem } = useCart()

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
      style={{ paddingTop:120, minHeight:'80vh', background:'var(--ivory)', padding:'120px 60px 80px' }}>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:60 }}>
        <div>
          <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:14 }}>✦ Saved for Later</span>
          <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(32px,4vw,52px)', color:'var(--text-main)' }}>Your Wishlist</h1>
          <div style={{ width:40, height:1, background:'#C6A75A', marginTop:20 }} />
        </div>
        {items.length > 0 && (
          <button onClick={clear} style={{ background:'transparent', border:'none', color:'var(--text-light)', fontSize:10, letterSpacing:2, fontFamily:'Montserrat,sans-serif', textDecoration:'underline', textDecorationColor:'rgba(74,58,52,0.3)' }}>CLEAR ALL</button>
        )}
      </div>

      <AnimatePresence>
        {items.length === 0 ? (
          <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ textAlign:'center', padding:'80px 0' }}>
            <div style={{ fontFamily:'Cinzel,serif', fontSize:64, color:'rgba(198,167,90,0.08)', marginBottom:24 }}>♡</div>
            <p style={{ fontSize:14, color:'var(--text-light)', marginBottom:32, lineHeight:1.8 }}>Your wishlist is empty.<br />Discover fragrances that call to you.</p>
            <Link to="/shop" style={{ textDecoration:'none' }}>
              <motion.button style={{ border:'1px solid #C6A75A', color:'var(--gold)', padding:'14px 40px', fontSize:10, letterSpacing:3, background:'transparent', fontFamily:'Montserrat,sans-serif' }}
                whileHover={{ background:'rgba(198,167,90,0.08)' }}>EXPLORE SHOP →</motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div key="grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:24 }}>
            {items.map((product, i) => (
              <motion.div key={product.id} layout
                initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.9, transition:{ duration:0.3 } }}
                transition={{ duration:0.5, delay:i*0.06 }}
                style={{ background:'var(--beige)', border:'1px solid rgba(198,167,90,0.08)', position:'relative' }}>
                {/* Remove button */}
                <button onClick={() => remove(product.id)}
                  style={{ position:'absolute', top:14, right:14, background:'rgba(245,241,233,0.7)', border:'1px solid rgba(198,167,90,0.2)', color:'var(--gold)', width:32, height:32, fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>×</button>
                {/* Product image */}
                <Link to={`/product/${product.slug}`} style={{ textDecoration:'none', display:'block' }}>
                  <div style={{ height:220, background:'var(--ivory-dark)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="90" height="170" viewBox="0 0 120 220" fill="none">
                      <defs>
                        <linearGradient id={`wbg${product.id}`} x1="30" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor={product.gradColors?.[0] || '#1a1208'}/><stop offset="50%" stopColor={product.gradColors?.[1] || '#251c0e'}/><stop offset="100%" stopColor={product.gradColors?.[2] || '#0d0b06'}/>
                        </linearGradient>
                      </defs>
                      <path d="M38 72 Q34 88 32 110 L30 178 Q30 192 40 196 L80 196 Q90 192 90 178 L88 110 Q86 88 82 72 Z" fill={`url(#wbg${product.id})`} stroke="rgba(198,167,90,0.25)" strokeWidth="0.5"/>
                      <rect x="52" y="42" width="16" height="35" rx="2" fill={product.gradColors?.[0] || '#1a1208'} stroke="rgba(198,167,90,0.2)" strokeWidth="0.5"/>
                      <rect x="46" y="28" width="28" height="18" rx="4" fill="#C6A75A" opacity="0.7"/>
                      <text x="60" y="138" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="5" fill="rgba(198,167,90,0.6)" letterSpacing="1.5">SUGANDH SHRI</text>
                    </svg>
                  </div>
                </Link>
                {/* Info */}
                <div style={{ padding:'18px 20px 20px' }}>
                  <div style={{ fontSize:8, letterSpacing:3, color:'var(--gold)', marginBottom:6, textTransform:'uppercase' }}>{product.category}</div>
                  <div style={{ fontFamily:'Playfair Display,serif', fontSize:16, color:'var(--text-main)', marginBottom:10 }}>{product.name}</div>
                  <div style={{ fontFamily:'Cinzel,serif', fontSize:18, color:'var(--gold)', marginBottom:14 }}>₹{product.price.toLocaleString()}</div>
                  <motion.button onClick={() => addItem(product)}
                    style={{ width:'100%', background:'transparent', border:'1px solid rgba(198,167,90,0.3)', color:'var(--gold)', padding:'11px', fontSize:9, letterSpacing:3, fontFamily:'Montserrat,sans-serif' }}
                    whileHover={{ background:'rgba(198,167,90,0.08)', borderColor:'#C6A75A' }}>
                    MOVE TO BAG →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
