// ============================================================
// CartPage.jsx  — /cart
// Full dedicated cart page with:
//  - Product list with qty controls & remove
//  - Order summary with coupon code input
//  - Free shipping progress bar
//  - Related / upsell products
//  - Proceed to checkout button
// ============================================================
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const FREE_SHIPPING_THRESHOLD = 1999
const SHIPPING_COST           = 149

// ── Mini bottle SVG for cart items ──────────────────────────
function MiniBottle({ colors }) {
  const [c1, c2] = colors || ['#1a1208', '#251c0e']
  return (
    <svg width="48" height="72" viewBox="0 0 60 90" fill="none">
      <defs>
        <linearGradient id={`mcg_${c1.slice(1)}`} x1="10" y1="0" x2="50" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/>
        </linearGradient>
      </defs>
      <path d="M14 28 Q10 36 10 46 L9 74 Q9 82 16 84 L44 84 Q51 82 51 74 L50 46 Q50 36 46 28 Z"
        fill={`url(#mcg_${c1.slice(1)})`} stroke="rgba(198,167,90,0.3)" strokeWidth="0.5"/>
      <rect x="24" y="14" width="12" height="18" rx="2" fill={c1} stroke="rgba(198,167,90,0.2)" strokeWidth="0.5"/>
      <rect x="20" y="6" width="20" height="11" rx="3" fill="#C6A75A" opacity="0.7"/>
      <text x="30" y="56" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="5" fill="rgba(198,167,90,0.6)" letterSpacing="1">SS</text>
    </svg>
  )
}

// ── Single cart row ──────────────────────────────────────────
function CartRow({ item, index }) {
  const { removeItem, updateQty } = useCart()
  const [removing, setRemoving]   = useState(false)

  const handleRemove = () => {
    setRemoving(true)
    setTimeout(() => removeItem(item.id), 300)
  }

  const discount = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: removing ? 0 : 1, x: removing ? 40 : 0, y: removing ? 0 : 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto',
        gap: 24,
        padding: '28px 0',
        borderBottom: '1px solid rgba(198,167,90,0.08)',
        alignItems: 'center',
      }}
    >
      {/* Product image */}
      <Link to={`/product/${item.slug}`} style={{ textDecoration: 'none' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ background: '#0d0c08', border: '1px solid rgba(198,167,90,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 96, overflow: 'hidden' }}
        >
          <MiniBottle colors={item.gradColors} />
        </motion.div>
      </Link>

      {/* Product details */}
      <div>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#C6A75A', textTransform: 'uppercase', marginBottom: 6 }}>
          {item.category}
        </div>
        <Link to={`/product/${item.slug}`} style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'var(--text-main)', marginBottom: 6, lineHeight: 1.3 }}>
            {item.name}
          </div>
        </Link>
        <div style={{ fontSize: 10, color: '#4A3A34', marginBottom: 14, letterSpacing: 1 }}>
          {item.ml}ML · {item.badge}
        </div>

        {/* Notes tags */}
        {item.notes?.top && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {[...(item.notes.top || []), ...(item.notes.base || [])].slice(0, 3).map(n => (
              <span key={n} style={{ fontSize: 8, color: '#4A3A34', border: '1px solid rgba(106,78,66,0.2)', padding: '2px 8px', letterSpacing: 1 }}>{n}</span>
            ))}
          </div>
        )}

        {/* Qty controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(198,167,90,0.25)' }}>
            <motion.button
              onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : handleRemove()}
              style={{ width: 34, height: 34, background: 'transparent', border: 'none', color: '#C6A75A', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              whileHover={{ background: 'rgba(198,167,90,0.08)' }}
            >−</motion.button>
            <span style={{ fontSize: 13, color: 'var(--text-main)', minWidth: 32, textAlign: 'center', fontFamily: 'Cinzel, serif' }}>
              {item.qty}
            </span>
            <motion.button
              onClick={() => updateQty(item.id, item.qty + 1)}
              style={{ width: 34, height: 34, background: 'transparent', border: 'none', color: '#C6A75A', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              whileHover={{ background: 'rgba(198,167,90,0.08)' }}
            >+</motion.button>
          </div>

          <motion.button
            onClick={handleRemove}
            style={{ background: 'transparent', border: 'none', color: '#3A2C24', fontSize: 10, letterSpacing: 1, fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', gap: 5 }}
            whileHover={{ color: 'rgba(220,80,80,0.7)' }}
          >
            ✕ Remove
          </motion.button>
        </div>
      </div>

      {/* Price */}
      <div style={{ textAlign: 'right', minWidth: 110 }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 20, color: '#C6A75A', marginBottom: 4 }}>
          ₹{(item.price * item.qty).toLocaleString('en-IN')}
        </div>
        {item.qty > 1 && (
          <div style={{ fontSize: 10, color: '#4A3A34', letterSpacing: 1 }}>
            ₹{item.price.toLocaleString('en-IN')} each
          </div>
        )}
        {discount > 0 && (
          <div style={{ fontSize: 10, color: 'rgba(198,167,90,0.6)', marginTop: 2 }}>
            {discount}% off
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Coupon input ─────────────────────────────────────────────
const COUPONS = {
  'SUGANDH10': { type: 'percent', value: 10, label: '10% off' },
  'WELCOME20': { type: 'percent', value: 20, label: '20% off' },
  'FLAT200':   { type: 'flat',    value: 200, label: '₹200 off' },
}

function CouponInput({ onApply, applied }) {
  const [code, setCode]     = useState('')
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState('')

  const apply = () => {
    const upper = code.trim().toUpperCase()
    if (COUPONS[upper]) {
      onApply(upper, COUPONS[upper])
      setSuccess(`Coupon applied: ${COUPONS[upper].label}`)
      setError('')
    } else {
      setError('Invalid coupon code. Try SUGANDH10 or WELCOME20')
      setSuccess('')
    }
  }

  if (applied) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(198,167,90,0.06)', border: '1px solid rgba(198,167,90,0.25)' }}>
        <div>
          <span style={{ fontSize: 9, letterSpacing: 2, color: '#C6A75A' }}>✦ COUPON APPLIED</span>
          <div style={{ fontSize: 12, color: 'var(--text-main)', marginTop: 3 }}>{applied.code} — {applied.data.label}</div>
        </div>
        <button onClick={() => onApply(null, null)} style={{ background: 'transparent', border: 'none', color: '#4A3A34', fontSize: 18 }}>✕</button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', border: '1px solid rgba(198,167,90,0.2)' }}>
        <input
          value={code}
          onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); setSuccess('') }}
          onKeyDown={e => e.key === 'Enter' && apply()}
          placeholder="Enter coupon code"
          style={{ flex: 1, background: 'transparent', border: 'none', padding: '12px 16px', color: 'var(--text-main)', fontSize: 12, fontFamily: 'Montserrat, sans-serif', outline: 'none', letterSpacing: 1 }}
        />
        <motion.button
          onClick={apply}
          style={{ background: 'rgba(198,167,90,0.1)', border: 'none', borderLeft: '1px solid rgba(198,167,90,0.2)', color: '#C6A75A', padding: '12px 20px', fontSize: 9, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          whileHover={{ background: 'rgba(198,167,90,0.2)' }}
        >APPLY</motion.button>
      </div>
      {error   && <div style={{ fontSize: 10, color: 'rgba(220,100,100,0.8)', marginTop: 6 }}>{error}</div>}
      {success && <div style={{ fontSize: 10, color: '#C6A75A', marginTop: 6 }}>✓ {success}</div>}
    </div>
  )
}

// ── Main CartPage ────────────────────────────────────────────
export default function CartPage() {
  const { items, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [coupon, setCoupon] = useState(null)   // { code, data }

  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  const discount = coupon
    ? coupon.data.type === 'percent'
      ? Math.round(cartTotal * coupon.data.value / 100)
      : Math.min(coupon.data.value, cartTotal)
    : 0

  const grandTotal = cartTotal - discount + shipping

  // Products not in cart → suggested upsells
  const cartIds    = new Set(items.map(i => i.id))
  const suggestions = products.filter(p => !cartIds.has(p.id) && p.inStock).slice(0, 3)

  const handleApplyCoupon = (code, data) => {
    setCoupon(code ? { code, data } : null)
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ paddingTop: 100, minHeight: '80vh', background: 'var(--ivory)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 40px' }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ fontFamily: 'Cinzel, serif', fontSize: 80, color: 'rgba(198,167,90,0.08)', marginBottom: 24, lineHeight: 1 }}
        >
          ✦
        </motion.div>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, color: 'var(--text-main)', marginBottom: 16, textAlign: 'center' }}>Your Bag is Empty</h1>
        <p style={{ fontSize: 13, color: '#4A3A34', lineHeight: 1.8, textAlign: 'center', maxWidth: 380, marginBottom: 36 }}>
          You haven't added any fragrances yet. Discover our collection of pure attars and luxury perfumes.
        </p>
        <Link to="/shop">
          <motion.button
            style={{ background: '#C6A75A', border: 'none', color: '#0B0B0B', padding: '15px 48px', fontSize: 10, letterSpacing: 3, fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            whileHover={{ background: '#E8D5A3' }}
          >EXPLORE FRAGRANCES →</motion.button>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--ivory)' }}
    >
      {/* Header */}
      <div style={{ padding: '48px 60px 24px', borderBottom: '1px solid rgba(198,167,90,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span style={{ fontSize: 9, letterSpacing: 5, color: '#C6A75A', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>✦ Your Selection</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text-main)', marginBottom: 6 }}>
            Shopping Bag
          </h1>
          <p style={{ fontSize: 11, color: '#4A3A34', letterSpacing: 1 }}>
            {items.length} item{items.length !== 1 ? 's' : ''} · ₹{cartTotal.toLocaleString('en-IN')}
          </p>
        </motion.div>
      </div>

      {/* Free shipping progress */}
      {cartTotal < FREE_SHIPPING_THRESHOLD && (
        <div style={{ padding: '16px 60px', background: 'rgba(198,167,90,0.04)', borderBottom: '1px solid rgba(198,167,90,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: '#6A4E42', letterSpacing: 1 }}>
              Add ₹{(FREE_SHIPPING_THRESHOLD - cartTotal).toLocaleString('en-IN')} more for free shipping
            </span>
            <span style={{ fontSize: 10, color: '#C6A75A', letterSpacing: 1 }}>Free shipping above ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ height: 3, background: 'rgba(198,167,90,0.1)', borderRadius: 2, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #8B6914, #C6A75A)', borderRadius: 2 }}
            />
          </div>
        </div>
      )}
      {cartTotal >= FREE_SHIPPING_THRESHOLD && (
        <div style={{ padding: '12px 60px', background: 'rgba(198,167,90,0.06)', borderBottom: '1px solid rgba(198,167,90,0.1)' }}>
          <span style={{ fontSize: 10, color: '#C6A75A', letterSpacing: 2 }}>✦ FREE SHIPPING UNLOCKED</span>
        </div>
      )}

      {/* Main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 0, alignItems: 'start', padding: '0 60px', paddingTop: 0 }}>

        {/* Left — cart items */}
        <div style={{ paddingRight: 60, paddingTop: 8, borderRight: '1px solid rgba(198,167,90,0.06)' }}>
          {/* Continue shopping + clear */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid rgba(198,167,90,0.06)' }}>
            <Link to="/shop" style={{ fontSize: 10, color: '#6A4E42', letterSpacing: 2, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Montserrat, sans-serif' }}
              onMouseEnter={e => e.currentTarget.style.color='#C6A75A'}
              onMouseLeave={e => e.currentTarget.style.color='#6A4E42'}>
              ← CONTINUE SHOPPING
            </Link>
            <button onClick={clearCart} style={{ background: 'transparent', border: 'none', color: '#3A2C24', fontSize: 10, letterSpacing: 1, fontFamily: 'Montserrat, sans-serif' }}
              onMouseEnter={e => e.target.style.color='rgba(220,80,80,0.6)'}
              onMouseLeave={e => e.target.style.color='#3A2C24'}>
              CLEAR ALL
            </button>
          </div>

          {/* Cart rows */}
          <AnimatePresence>
            {items.map((item, i) => (
              <CartRow key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>

          {/* Upsell suggestions */}
          {suggestions.length > 0 && (
            <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid rgba(198,167,90,0.06)' }}>
              <div style={{ fontSize: 9, letterSpacing: 4, color: '#C6A75A', textTransform: 'uppercase', marginBottom: 24 }}>✦ You Might Also Love</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {suggestions.map(p => (
                  <UpsellCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — order summary */}
        <div style={{ padding: '32px 0 32px 40px', position: 'sticky', top: 120 }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 16, color: 'var(--text-main)', marginBottom: 24, letterSpacing: 1 }}>Order Summary</div>

          {/* Coupon */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: '#6A4E42', textTransform: 'uppercase', marginBottom: 10 }}>Coupon Code</div>
            <CouponInput onApply={handleApplyCoupon} applied={coupon} />
          </div>

          {/* Price breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 20, borderBottom: '1px solid rgba(198,167,90,0.08)', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#6A4E42' }}>Subtotal ({items.reduce((s,i) => s+i.qty,0)} items)</span>
              <span style={{ fontSize: 12, color: 'var(--text-main)' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#C6A75A' }}>Coupon ({coupon?.code})</span>
                <span style={{ fontSize: 12, color: '#C6A75A' }}>−₹{discount.toLocaleString('en-IN')}</span>
              </motion.div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#6A4E42' }}>Shipping</span>
              <span style={{ fontSize: 12, color: shipping === 0 ? '#C6A75A' : '#F5F1E9' }}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
          </div>

          {/* Grand total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32, alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: 'var(--text-main)', letterSpacing: 1 }}>Total</span>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 26, color: '#C6A75A' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>

          {/* Checkout button */}
          <motion.button
            onClick={() => navigate('/checkout', { state: { discount, couponCode: coupon?.code, grandTotal, shipping } })}
            style={{ width: '100%', background: '#C6A75A', border: 'none', color: '#0B0B0B', padding: '17px', fontSize: 10, letterSpacing: 3, fontFamily: 'Montserrat, sans-serif', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
            whileHover={{ background: '#E8D5A3' }}
            whileTap={{ scale: 0.98 }}
          >
            PROCEED TO CHECKOUT →
          </motion.button>

          {/* Security badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
            {['🔒 SSL Secure', '📦 Tracked Delivery', '↩ Easy Returns'].map(b => (
              <span key={b} style={{ fontSize: 9, color: '#3A2C24', letterSpacing: 0.5 }}>{b}</span>
            ))}
          </div>

          {/* Payment icons */}
          <div style={{ textAlign: 'center', paddingTop: 16, borderTop: '1px solid rgba(198,167,90,0.06)' }}>
            <div style={{ fontSize: 8, letterSpacing: 2, color: '#2A2018', marginBottom: 10 }}>SECURED BY RAZORPAY</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {['Visa', 'Mastercard', 'UPI', 'NetBanking', 'EMI'].map(m => (
                <span key={m} style={{ fontSize: 8, color: '#2A2018', border: '1px solid rgba(198,167,90,0.1)', padding: '3px 8px', letterSpacing: 0.5 }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Small upsell card ────────────────────────────────────────
function UpsellCard({ product }) {
  const { addItem } = useCart()
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(198,167,90,0.3)' }}
      style={{ background: 'var(--beige)', border: '1px solid rgba(198,167,90,0.07)', padding: 16, transition: 'border-color 0.3s' }}
    >
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 13, color: 'var(--text-main)', marginBottom: 4, lineHeight: 1.3 }}>{product.name}</div>
      <div style={{ fontSize: 9, color: '#C6A75A', marginBottom: 12, fontFamily: 'Cinzel, serif' }}>₹{product.price.toLocaleString('en-IN')}</div>
      <motion.button
        onClick={() => addItem(product)}
        style={{ width: '100%', background: 'transparent', border: '1px solid rgba(198,167,90,0.2)', color: '#C6A75A', padding: '7px', fontSize: 8, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif' }}
        whileHover={{ background: 'rgba(198,167,90,0.08)', borderColor: '#C6A75A' }}
      >
        + ADD
      </motion.button>
    </motion.div>
  )
}
