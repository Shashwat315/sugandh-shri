// ProductCard — sandalwood luxury with real images, mobile responsive
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart }     from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductModal    from './ProductModal'

export default function ProductCard({ product, index=0 }) {
  const { addItem }              = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [open, setOpen]          = useState(false)
  const [added, setAdded]        = useState(false)
  const [imgErr, setImgErr]      = useState(false)

  const { name, category, price, originalPrice, rating, reviews, badge, inStock, image, ml } = product
  const wishlisted = isWishlisted(product.id)
  const discount   = originalPrice ? Math.round((1-price/originalPrice)*100) : 0

  const handleAdd = e => {
    e.preventDefault(); e.stopPropagation()
    if (!inStock) return
    addItem(product); setAdded(true); setTimeout(()=>setAdded(false),2000)
  }

  return (
    <>
      <motion.article
        initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
        transition={{ duration:0.7, delay:index*0.07, ease:[0.25,0.46,0.45,0.94] }}
        viewport={{ once:true }}
        whileHover={{ y:-5, boxShadow:'0 20px 52px rgba(106,78,66,0.18)' }}
        onClick={() => setOpen(true)}
        style={{ background:'var(--beige)', borderRadius:8, overflow:'hidden', boxShadow:'var(--shadow-sm)', cursor:'none', position:'relative', transition:'box-shadow 0.4s' }}
      >
        {/* Badge */}
        {badge && (
          <div style={{ position:'absolute', top:12, left:12, zIndex:3, background:'var(--brown)', color:'var(--ivory)', fontSize:8, letterSpacing:2, padding:'3px 10px', fontFamily:'Montserrat,sans-serif', fontWeight:600, borderRadius:3 }}>
            {badge.toUpperCase()}
          </div>
        )}

        {/* Wishlist */}
        <motion.button onClick={e=>{e.stopPropagation();toggle(product)}}
          style={{ position:'absolute', top:12, right:12, zIndex:4, background:'rgba(245,241,233,0.92)', border:'none', width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, color:wishlisted?'var(--brown)':'var(--text-light)', boxShadow:'var(--shadow-sm)' }}
          whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}>
          {wishlisted?'♥':'♡'}
        </motion.button>

        {/* Image */}
        <div style={{ height:'clamp(200px,30vw,280px)', overflow:'hidden', position:'relative', background:'var(--ivory-dark)' }}>
          {!imgErr&&image ? (
            <motion.img src={image} alt={name} onError={()=>setImgErr(true)}
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block' }}
              whileHover={{ scale:1.08 }} transition={{ duration:0.6, ease:[0.25,0.46,0.45,0.94] }}/>
          ) : (
            <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:'Cinzel,serif', fontSize:36, color:'rgba(106,78,66,0.15)' }}>✦</span>
            </div>
          )}
          {/* Hover overlay */}
          <motion.div initial={{opacity:0}} whileHover={{opacity:1}} transition={{duration:0.3}}
            style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(106,78,66,0.35) 0%,transparent 55%)' }}/>
          <motion.div initial={{opacity:0,y:6}} whileHover={{opacity:1,y:0}} transition={{duration:0.3}}
            style={{ position:'absolute', bottom:12, left:0, right:0, textAlign:'center' }}>
            <span style={{ background:'rgba(245,241,233,0.92)', color:'var(--brown)', fontSize:8, letterSpacing:2, padding:'4px 14px', borderRadius:20, fontFamily:'Montserrat,sans-serif', fontWeight:600 }}>VIEW DETAILS</span>
          </motion.div>
          {!inStock && (
            <div style={{ position:'absolute', top:12, right:12, background:'rgba(47,37,35,0.65)', color:'rgba(245,241,233,0.8)', fontSize:8, letterSpacing:1, padding:'3px 9px', borderRadius:3, fontFamily:'Montserrat,sans-serif' }}>Out of Stock</div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding:'clamp(14px,2vw,22px)' }}>
          <div style={{ fontSize:'clamp(7px,0.8vw,9px)', letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif', marginBottom:5 }}>
            {category}{ml?` · ${ml}ml`:''}
          </div>
          <div style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(13px,1.5vw,16px)', color:'var(--text-main)', marginBottom:8, lineHeight:1.3 }}>
            {name}
          </div>
          {/* Stars */}
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
            <span style={{ color:'var(--gold)', fontSize:11 }}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5-Math.floor(rating))}</span>
            <span style={{ fontSize:10, color:'var(--text-light)', fontFamily:'Montserrat,sans-serif' }}>({reviews})</span>
          </div>
          {/* Price */}
          <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:14, flexWrap:'wrap' }}>
            <span style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(16px,2vw,20px)', color:'var(--brown)' }}>₹{price.toLocaleString('en-IN')}</span>
            {originalPrice && <span style={{ fontSize:11, color:'var(--text-light)', textDecoration:'line-through', fontFamily:'Lora,serif' }}>₹{originalPrice.toLocaleString('en-IN')}</span>}
            {discount>0 && <span style={{ fontSize:9, color:'var(--gold)', fontFamily:'Montserrat,sans-serif', letterSpacing:1 }}>{discount}% off</span>}
          </div>
          {/* Add button */}
          <motion.button onClick={handleAdd} disabled={!inStock}
            style={{ width:'100%', border:`1.5px solid ${added?'var(--brown)':'var(--brown)'}`, background:added?'var(--brown)':'transparent', color:added?'var(--ivory)':'var(--brown)', padding:'clamp(9px,1vw,11px)', fontSize:9, letterSpacing:2, fontFamily:'Montserrat,sans-serif', fontWeight:500, borderRadius:4, transition:'all 0.35s', opacity:inStock?1:0.45 }}
            whileHover={inStock?{background:'var(--brown)',color:'var(--ivory)'}:{}} whileTap={inStock?{scale:0.97}:{}}>
            {added?'✓ ADDED TO BAG':inStock?'ADD TO BAG':'OUT OF STOCK'}
          </motion.button>
        </div>
      </motion.article>

      {open && <ProductModal product={product} onClose={()=>setOpen(false)}/>}
    </>
  )
}
