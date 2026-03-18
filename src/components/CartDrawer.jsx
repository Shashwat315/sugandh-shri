// CartDrawer — warm ivory theme, mobile friendly
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart }     from '../context/CartContext'

function CartItem({ item }) {
  const { removeItem, updateQty } = useCart()
  return (
    <div style={{ display:'flex', gap:12, padding:'16px 0', borderBottom:'1px solid rgba(106,78,66,0.08)' }}>
      <div style={{ width:52, height:64, background:'var(--ivory-dark)', border:'1px solid rgba(106,78,66,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, borderRadius:5, overflow:'hidden' }}>
        {item.image ? (
          <img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>e.target.style.display='none'}/>
        ) : (
          <span style={{ fontFamily:'Cinzel,serif', fontSize:8, color:'rgba(106,78,66,0.3)', letterSpacing:1 }}>SS</span>
        )}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Cinzel,serif', fontSize:13, color:'var(--text-main)', marginBottom:2, lineHeight:1.3 }}>{item.name}</div>
        <div style={{ fontSize:9, color:'var(--text-light)', marginBottom:8, fontFamily:'Montserrat,sans-serif', letterSpacing:1 }}>{item.category?.toUpperCase()} · {item.ml}ML</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', border:'1px solid rgba(106,78,66,0.2)', borderRadius:4, overflow:'hidden' }}>
            <button onClick={() => item.qty>1?updateQty(item.id,item.qty-1):removeItem(item.id)}
              style={{ width:28, height:28, background:'transparent', border:'none', color:'var(--brown)', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
            <span style={{ fontSize:12, color:'var(--text-main)', minWidth:22, textAlign:'center', fontFamily:'Cinzel,serif' }}>{item.qty}</span>
            <button onClick={() => updateQty(item.id,item.qty+1)}
              style={{ width:28, height:28, background:'transparent', border:'none', color:'var(--brown)', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
          </div>
          <span style={{ fontFamily:'Cinzel,serif', fontSize:15, color:'var(--brown)' }}>₹{(item.price*item.qty).toLocaleString('en-IN')}</span>
        </div>
      </div>
      <button onClick={()=>removeItem(item.id)} style={{ background:'transparent', border:'none', color:'var(--text-light)', fontSize:14, alignSelf:'flex-start', paddingTop:2, transition:'color 0.2s' }}
        onMouseEnter={e=>e.target.style.color='rgba(160,60,60,0.7)'} onMouseLeave={e=>e.target.style.color='var(--text-light)'}>✕</button>
    </div>
  )
}

export default function CartDrawer() {
  const { items, cartTotal, isOpen, setIsOpen, clearCart } = useCart()
  const navigate = useNavigate()
  const shipping  = cartTotal>=1999 ? 0 : 149
  const grand     = cartTotal + shipping

  const goTo = path => { setIsOpen(false); navigate(path) }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setIsOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(47,37,35,0.5)', backdropFilter:'blur(4px)', zIndex:2000 }}/>

          <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:0.4,ease:[0.25,0.46,0.45,0.94]}}
            style={{ position:'fixed', top:0, right:0, bottom:0, width:'clamp(300px,90vw,400px)', background:'var(--ivory)', borderLeft:'1px solid rgba(106,78,66,0.1)', zIndex:2001, display:'flex', flexDirection:'column', boxShadow:'-8px 0 40px rgba(106,78,66,0.14)' }}>

            {/* Header */}
            <div style={{ padding:'clamp(18px,3vw,24px) clamp(20px,4vw,28px)', borderBottom:'1px solid rgba(106,78,66,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0, background:'var(--beige)' }}>
              <div>
                <div style={{ fontFamily:'Cinzel,serif', fontSize:14, color:'var(--text-main)', letterSpacing:2 }}>YOUR BAG</div>
                <div style={{ fontSize:9, color:'var(--text-light)', marginTop:2, fontFamily:'Montserrat,sans-serif', letterSpacing:1 }}>{items.length} ITEM{items.length!==1?'S':''}</div>
              </div>
              <motion.button onClick={()=>setIsOpen(false)}
                style={{ background:'transparent', border:'1.5px solid rgba(106,78,66,0.2)', color:'var(--brown)', width:34, height:34, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:4, transition:'all 0.2s' }}
                whileHover={{ background:'var(--brown)', color:'var(--ivory)', borderColor:'var(--brown)' }}>✕</motion.button>
            </div>

            {/* Free shipping progress */}
            {cartTotal>0 && cartTotal<1999 && (
              <div style={{ padding:'10px 24px', background:'rgba(198,167,90,0.07)', borderBottom:'1px solid rgba(106,78,66,0.06)' }}>
                <div style={{ fontSize:9, color:'var(--text-muted)', marginBottom:5, fontFamily:'Montserrat,sans-serif', letterSpacing:1 }}>
                  Add ₹{(1999-cartTotal).toLocaleString('en-IN')} more for free shipping
                </div>
                <div style={{ height:2, background:'rgba(106,78,66,0.1)', borderRadius:1, overflow:'hidden' }}>
                  <motion.div animate={{ width:`${Math.min(cartTotal/1999*100,100)}%` }} transition={{ duration:0.5 }}
                    style={{ height:'100%', background:'linear-gradient(90deg,var(--brown),var(--gold))', borderRadius:1 }}/>
                </div>
              </div>
            )}
            {cartTotal>=1999 && (
              <div style={{ padding:'9px 24px', background:'rgba(198,167,90,0.1)', borderBottom:'1px solid rgba(106,78,66,0.06)', fontSize:9, color:'var(--brown)', fontFamily:'Montserrat,sans-serif', letterSpacing:2 }}>
                ✦ FREE SHIPPING UNLOCKED
              </div>
            )}

            {/* Items */}
            <div style={{ flex:1, padding:'0 clamp(18px,4vw,28px)', overflowY:'auto' }}>
              {items.length===0 ? (
                <div style={{ textAlign:'center', padding:'60px 0' }}>
                  <div style={{ fontFamily:'Cinzel,serif', fontSize:40, color:'rgba(106,78,66,0.1)', marginBottom:16 }}>✦</div>
                  <p style={{ fontSize:13, color:'var(--text-light)', fontFamily:'Lora,serif', lineHeight:1.8 }}>Your bag is empty.<br/>Discover our fragrances.</p>
                </div>
              ) : (
                <>
                  {items.map(item=><CartItem key={item.id} item={item}/>)}
                  <button onClick={clearCart} style={{ margin:'12px 0', background:'transparent', border:'none', fontSize:9, color:'var(--text-light)', letterSpacing:2, fontFamily:'Montserrat,sans-serif', transition:'color 0.2s' }}
                    onMouseEnter={e=>e.target.style.color='rgba(160,60,60,0.7)'} onMouseLeave={e=>e.target.style.color='var(--text-light)'}>
                    CLEAR ALL
                  </button>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length>0 && (
              <div style={{ padding:'clamp(16px,3vw,20px) clamp(18px,4vw,28px)', borderTop:'1px solid rgba(106,78,66,0.08)', flexShrink:0, background:'var(--beige)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontSize:12, color:'var(--text-muted)', fontFamily:'Lora,serif' }}>Subtotal</span>
                  <span style={{ fontSize:13, color:'var(--text-main)', fontFamily:'Cinzel,serif' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
                  <span style={{ fontSize:12, color:'var(--text-muted)', fontFamily:'Lora,serif' }}>Shipping</span>
                  <span style={{ fontSize:12, color:shipping===0?'var(--brown)':'var(--text-main)', fontFamily:'Montserrat,sans-serif' }}>{shipping===0?'FREE':`₹${shipping}`}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid rgba(106,78,66,0.1)', marginBottom:16 }}>
                  <span style={{ fontFamily:'Cinzel,serif', fontSize:14, color:'var(--text-main)' }}>Total</span>
                  <span style={{ fontFamily:'Cinzel,serif', fontSize:20, color:'var(--brown)' }}>₹{grand.toLocaleString('en-IN')}</span>
                </div>
                <motion.button onClick={()=>goTo('/checkout')} className="btn-primary"
                  style={{ width:'100%', borderRadius:4, marginBottom:10, padding:'14px' }}
                  whileHover={{ scale:1.01 }} whileTap={{ scale:0.98 }}>
                  CHECKOUT NOW →
                </motion.button>
                <motion.button onClick={()=>goTo('/cart')} className="btn-outline"
                  style={{ width:'100%', borderRadius:4, padding:'11px', fontSize:9 }}
                  whileHover={{ scale:1.01 }}>
                  VIEW FULL BAG
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
