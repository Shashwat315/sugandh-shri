// ProductModal — warm sandalwood, responsive
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart }     from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductModal({ product, onClose }) {
  const { addItem }              = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [added, setAdded]        = useState(false)
  const [imgErr, setImgErr]      = useState(false)
  if (!product) return null

  const { name, category, price, originalPrice, rating, reviews, badge, longDescription, description,
    notes, origin, process, longevity, sillage, tags, ml, inStock, image, usage } = product
  const discount   = originalPrice ? Math.round((1-price/originalPrice)*100) : 0
  const wishlisted = isWishlisted(product.id)

  const handleAdd = () => {
    if (!inStock) return
    addItem(product); setAdded(true); setTimeout(()=>setAdded(false),2000)
  }

  return (
    <AnimatePresence>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        onClick={onClose}
        style={{ position:'fixed',inset:0,background:'rgba(47,37,35,0.72)',backdropFilter:'blur(8px)',zIndex:3000,display:'flex',alignItems:'center',justifyContent:'center',padding:'clamp(8px,2vw,24px)',overflowY:'auto' }}>
        <motion.div initial={{opacity:0,scale:0.94,y:20}} animate={{opacity:1,scale:1,y:0}}
          exit={{opacity:0,scale:0.96}} transition={{duration:0.4,ease:[0.25,0.46,0.45,0.94]}}
          onClick={e=>e.stopPropagation()}
          style={{ background:'var(--ivory)',borderRadius:10,width:'100%',maxWidth:800,maxHeight:'90vh',overflowY:'auto',position:'relative',boxShadow:'0 24px 80px rgba(47,37,35,0.35)' }}>

          {/* Close */}
          <button onClick={onClose}
            style={{ position:'sticky',top:0,float:'right',zIndex:10,margin:'12px 12px 0 0',background:'var(--beige)',border:'none',width:32,height:32,borderRadius:'50%',fontSize:14,color:'var(--text-muted)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--shadow-sm)' }}>✕</button>

          <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)' }} className="modal-grid">
            {/* Image */}
            <div style={{ background:'var(--beige)',display:'flex',alignItems:'center',justifyContent:'center',minHeight:'clamp(240px,35vw,380px)',padding:'clamp(16px,3vw,32px)',borderRadius:'10px 0 0 10px',position:'relative',overflow:'hidden' }}>
              {badge&&<div style={{position:'absolute',top:14,left:14,background:'var(--brown)',color:'var(--ivory)',fontSize:8,letterSpacing:2,padding:'3px 10px',fontFamily:'Montserrat,sans-serif',fontWeight:600,borderRadius:3}}>{badge}</div>}
              {!inStock&&<div style={{position:'absolute',bottom:14,left:0,right:0,textAlign:'center',fontSize:9,color:'rgba(245,241,233,0.8)',background:'rgba(47,37,35,0.55)',padding:'5px',letterSpacing:2,fontFamily:'Montserrat,sans-serif'}}>OUT OF STOCK</div>}
              {!imgErr&&image ? (
                <img src={image} alt={name} onError={()=>setImgErr(true)}
                  style={{width:'100%',maxHeight:300,objectFit:'contain',borderRadius:6,boxShadow:'var(--shadow-md)'}}/>
              ) : (
                <div style={{width:140,height:200,background:'var(--ivory)',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--shadow-md)'}}>
                  <span style={{fontFamily:'Cinzel,serif',fontSize:32,color:'rgba(106,78,66,0.15)'}}>✦</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div style={{ padding:'clamp(20px,3vw,36px)',overflowY:'auto' }}>
              <div style={{fontSize:9,letterSpacing:3,color:'var(--gold)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:6}}>{category}{ml?` · ${ml}ml`:''}</div>
              <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(16px,2vw,22px)',color:'var(--brown-deeper)',marginBottom:10,lineHeight:1.2}}>{name}</h2>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
                <span style={{color:'var(--gold)',fontSize:12}}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5-Math.floor(rating))}</span>
                <span style={{fontSize:10,color:'var(--text-light)',fontFamily:'Montserrat,sans-serif'}}>{rating} · {reviews} reviews</span>
              </div>
              <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:16,flexWrap:'wrap'}}>
                <span style={{fontFamily:'Cinzel,serif',fontSize:'clamp(20px,3vw,28px)',color:'var(--brown)'}}>₹{price.toLocaleString('en-IN')}</span>
                {originalPrice&&<span style={{fontSize:13,color:'var(--text-light)',textDecoration:'line-through',fontFamily:'Lora,serif'}}>₹{originalPrice.toLocaleString('en-IN')}</span>}
                {discount>0&&<span style={{fontSize:9,color:'var(--gold)',fontFamily:'Montserrat,sans-serif',letterSpacing:1}}>{discount}% off</span>}
              </div>
              <p style={{fontSize:'clamp(12px,1.2vw,13px)',color:'var(--text-muted)',lineHeight:1.85,fontFamily:'Lora,serif',marginBottom:16,fontStyle:'italic'}}>{longDescription||description}</p>

              {notes&&(
                <div style={{marginBottom:14,padding:'12px 14px',background:'var(--beige)',borderRadius:5,borderLeft:'3px solid var(--gold)'}}>
                  <div style={{fontSize:8,letterSpacing:3,color:'var(--brown)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:8}}>Fragrance Notes</div>
                  {Object.entries(notes).map(([layer,items])=>(
                    <div key={layer} style={{display:'flex',gap:8,marginBottom:5,alignItems:'flex-start'}}>
                      <span style={{fontSize:8,letterSpacing:2,color:'var(--text-light)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',minWidth:44,paddingTop:2}}>{layer}</span>
                      <span style={{fontSize:11,color:'var(--text-muted)',fontFamily:'Lora,serif'}}>{items.join(' · ')}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
                {[['Origin',origin],['Longevity',longevity],['Sillage',sillage],['Process',process]].filter(([,v])=>v).map(([label,value])=>(
                  <div key={label} style={{background:'var(--beige)',padding:'9px 11px',borderRadius:5}}>
                    <div style={{fontSize:7,letterSpacing:2,color:'var(--text-light)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:2}}>{label}</div>
                    <div style={{fontSize:11,color:'var(--text-muted)',fontFamily:'Lora,serif'}}>{value}</div>
                  </div>
                ))}
              </div>

              {usage&&(
                <div style={{marginBottom:14,padding:'10px 14px',background:'rgba(198,167,90,0.08)',borderRadius:5}}>
                  <div style={{fontSize:8,letterSpacing:2,color:'var(--brown)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:5}}>How to Use</div>
                  <p style={{fontSize:11,color:'var(--text-muted)',fontFamily:'Lora,serif',lineHeight:1.7}}>{usage}</p>
                </div>
              )}

              {tags&&(
                <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:16}}>
                  {tags.map(t=>(
                    <span key={t} style={{fontSize:9,color:'var(--brown)',border:'1px solid rgba(106,78,66,0.22)',padding:'2px 10px',borderRadius:20,fontFamily:'Montserrat,sans-serif',letterSpacing:0.5}}>{t}</span>
                  ))}
                </div>
              )}

              <div style={{display:'flex',gap:10}}>
                <motion.button onClick={handleAdd} disabled={!inStock}
                  style={{flex:2,background:added?'var(--brown-dark)':inStock?'var(--brown)':'rgba(106,78,66,0.2)',border:'none',color:inStock?'var(--ivory)':'var(--text-light)',padding:'13px',fontSize:9,letterSpacing:2,fontFamily:'Montserrat,sans-serif',fontWeight:600,borderRadius:5,transition:'background 0.3s'}}
                  whileHover={inStock?{background:'var(--brown-dark)'}:{}} whileTap={inStock?{scale:0.98}:{}}>
                  {added?'✓ ADDED':inStock?'ADD TO BAG':'OUT OF STOCK'}
                </motion.button>
                <motion.button onClick={()=>toggle(product)}
                  style={{width:46,background:wishlisted?'rgba(198,167,90,0.12)':'var(--beige)',border:`1px solid ${wishlisted?'var(--gold)':'rgba(106,78,66,0.2)'}`,color:wishlisted?'var(--brown)':'var(--text-muted)',fontSize:16,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center'}}
                  whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
                  {wishlisted?'♥':'♡'}
                </motion.button>
              </div>
              <p style={{fontSize:9,color:'var(--text-light)',textAlign:'center',marginTop:10,fontFamily:'Montserrat,sans-serif',letterSpacing:1}}>Free shipping above ₹1,999</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <style>{`
        @media (max-width:640px) { .modal-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </AnimatePresence>
  )
}
