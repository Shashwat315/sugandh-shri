// ============================================================
// CheckoutPage.jsx  /checkout
// Complete 4-step checkout with REAL Razorpay integration.
// Steps: Review → Shipping → Payment → Confirmed
// ============================================================
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

// ── Razorpay loader ──────────────────────────────────────────
function loadRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) return resolve(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload  = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

// ── Step progress bar ────────────────────────────────────────
const STEPS = ['Review', 'Shipping', 'Payment', 'Confirmed']

function StepBar({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
      {STEPS.map((step, i) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <motion.div
              animate={{
                background: i < current ? '#C6A75A' : i === current ? 'rgba(198,167,90,0.15)' : 'transparent',
                borderColor: i <= current ? '#C6A75A' : 'rgba(198,167,90,0.2)',
              }}
              style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {i < current
                ? <span style={{ color: '#0B0B0B', fontSize: 14, fontWeight: 700 }}>✓</span>
                : <span style={{ fontFamily: 'Cinzel, serif', fontSize: 11, color: i <= current ? '#C6A75A' : '#4A3A34' }}>{i + 1}</span>
              }
            </motion.div>
            <span style={{ fontSize: 8, letterSpacing: 2, color: i === current ? '#C6A75A' : i < current ? '#6A4E42' : '#3A2C24', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <motion.div
              animate={{ background: i < current ? '#C6A75A' : 'rgba(198,167,90,0.1)' }}
              style={{ flex: 1, height: 1, margin: '0 8px', marginBottom: 24 }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Luxury input field ───────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 8, letterSpacing: 2, color: error ? 'rgba(220,100,100,0.8)' : '#6A4E42', textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.2s' }}>
        {label}{required && ' *'}
      </div>
      {children}
      {error && <div style={{ fontSize: 10, color: 'rgba(220,100,100,0.8)', marginTop: 5 }}>{error}</div>}
    </div>
  )
}

function LuxInput({ label, required, error, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <Field label={label} required={required} error={error}>
      <input
        {...props}
        onFocus={e => { setFocused(true); props.onFocus?.(e) }}
        onBlur={e => { setFocused(false); props.onBlur?.(e) }}
        style={{
          width: '100%',
          background: 'rgba(198,167,90,0.04)',
          border: `1px solid ${error ? 'rgba(220,100,100,0.4)' : focused ? 'rgba(198,167,90,0.5)' : 'rgba(198,167,90,0.15)'}`,
          padding: '13px 16px',
          color: 'var(--text-main)',
          fontSize: 13,
          fontFamily: 'Montserrat, sans-serif',
          outline: 'none',
          transition: 'border-color 0.3s',
          letterSpacing: 0.5,
          ...props.style,
        }}
      />
    </Field>
  )
}

// ── Step 0 — Order Review ────────────────────────────────────
function ReviewStep({ items, totals, onNext }) {
  return (
    <motion.div key="review" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: 'var(--text-main)', marginBottom: 28 }}>Review Your Order</h2>

      {/* Items */}
      <div style={{ marginBottom: 28 }}>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(198,167,90,0.07)', alignItems: 'center' }}>
            <div style={{ width: 48, height: 60, background: '#0d0c08', border: '1px solid rgba(198,167,90,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: 7, color: 'rgba(198,167,90,0.4)', letterSpacing: 1 }}>SS</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, color: 'var(--text-main)', marginBottom: 3 }}>{item.name}</div>
              <div style={{ fontSize: 9, color: '#4A3A34', letterSpacing: 1 }}>{item.ml}ML · Qty {item.qty}</div>
            </div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 16, color: '#C6A75A' }}>
              ₹{(item.price * item.qty).toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ background: 'rgba(198,167,90,0.04)', border: '1px solid rgba(198,167,90,0.1)', padding: '20px 24px', marginBottom: 28 }}>
        {[
          { label: 'Subtotal', value: `₹${totals.subtotal.toLocaleString('en-IN')}` },
          ...(totals.discount > 0 ? [{ label: `Coupon (${totals.couponCode})`, value: `−₹${totals.discount.toLocaleString('en-IN')}`, gold: true }] : []),
          { label: 'Shipping', value: totals.shipping === 0 ? 'FREE' : `₹${totals.shipping}`, gold: totals.shipping === 0 },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: '#6A4E42' }}>{row.label}</span>
            <span style={{ fontSize: 12, color: row.gold ? '#C6A75A' : '#F5F1E9' }}>{row.value}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(198,167,90,0.1)', paddingTop: 12, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: 'var(--text-main)' }}>Total</span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 24, color: '#C6A75A' }}>₹{totals.grand.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <motion.button onClick={onNext}
        style={{ width: '100%', background: '#C6A75A', border: 'none', color: '#0B0B0B', padding: '16px', fontSize: 10, letterSpacing: 3, fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
        whileHover={{ background: '#E8D5A3' }} whileTap={{ scale: 0.98 }}>
        CONTINUE TO SHIPPING →
      </motion.button>

      <div style={{ textAlign: 'center', marginTop: 14 }}>
        <Link to="/cart" style={{ fontSize: 10, color: '#4A3A34', letterSpacing: 1, textDecoration: 'none' }}>← Edit Cart</Link>
      </div>
    </motion.div>
  )
}

// ── Step 1 — Shipping ────────────────────────────────────────
function ShippingStep({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!data.fullName.trim())  e.fullName  = 'Full name required'
    if (!data.email.includes('@')) e.email  = 'Valid email required'
    if (!data.phone.trim())     e.phone     = 'Phone required'
    if (!data.address.trim())   e.address   = 'Address required'
    if (!data.city.trim())      e.city      = 'City required'
    if (!data.state.trim())     e.state     = 'State required'
    if (!/^\d{6}$/.test(data.pinCode)) e.pinCode = 'Enter valid 6-digit PIN'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validate()) onNext() }

  const inp = (key, label, props = {}) => (
    <LuxInput label={label} required value={data[key]}
      onChange={e => onChange(key, e.target.value)}
      error={errors[key]} {...props} />
  )

  return (
    <motion.div key="shipping" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: 'var(--text-main)', marginBottom: 28 }}>Shipping Details</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <div style={{ gridColumn: '1/-1' }}>{inp('fullName', 'Full Name', { placeholder: 'Priya Sharma', autoComplete: 'name' })}</div>
        {inp('email', 'Email', { placeholder: 'your@email.com', type: 'email', autoComplete: 'email' })}
        {inp('phone', 'Phone', { placeholder: '+91 98765 43210', type: 'tel', autoComplete: 'tel' })}
        <div style={{ gridColumn: '1/-1' }}>{inp('address', 'Street Address', { placeholder: 'House no., street, area', autoComplete: 'street-address' })}</div>
        {inp('city',  'City',  { placeholder: 'Mumbai', autoComplete: 'address-level2' })}
        {inp('state', 'State', { placeholder: 'Maharashtra', autoComplete: 'address-level1' })}
        {inp('pinCode', 'PIN Code', { placeholder: '400001', autoComplete: 'postal-code', maxLength: 6 })}
        {inp('country', 'Country', { placeholder: 'India', autoComplete: 'country' })}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <motion.button onClick={onBack}
          style={{ flex: 1, background: 'transparent', border: '1px solid rgba(198,167,90,0.2)', color: '#6A4E42', padding: '14px', fontSize: 10, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif' }}
          whileHover={{ borderColor: 'rgba(198,167,90,0.5)', color: '#C6A75A' }}>← BACK</motion.button>
        <motion.button onClick={handleNext}
          style={{ flex: 2, background: '#C6A75A', border: 'none', color: '#0B0B0B', padding: '14px', fontSize: 10, letterSpacing: 3, fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          whileHover={{ background: '#E8D5A3' }} whileTap={{ scale: 0.98 }}>
          CONTINUE TO PAYMENT →
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── Step 2 — Payment (REAL Razorpay) ────────────────────────
function PaymentStep({ totals, shipping, onSuccess, onBack }) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const { items, clearCart }  = useCart()
  const { user }              = useAuth()

  const handleRazorpay = async () => {
    setLoading(true)
    setError('')

    // 1. Load Razorpay script
    const loaded = await loadRazorpay()
    if (!loaded) {
      setError('Could not load payment gateway. Check your internet connection.')
      setLoading(false)
      return
    }

    // 2. Get your Razorpay Key from .env.local
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID
    if (!key || key === 'rzp_test_DEMO') {
      setError('Razorpay key not configured. Add VITE_RAZORPAY_KEY_ID to your .env.local file.')
      setLoading(false)
      return
    }

    // 3. (Production) Create order on backend first.
    // Uncomment this block when your backend is ready:
    //
    // try {
    //   const res = await fetch('http://localhost:5000/api/orders/create-razorpay-order', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ amount: totals.grand }),
    //   })
    //   const orderData = await res.json()
    //   options.order_id = orderData.id   // Pass this to options below
    // } catch {
    //   setError('Could not create order. Please try again.')
    //   setLoading(false)
    //   return
    // }

    // 4. Open Razorpay modal
    const options = {
      key,
      amount:      totals.grand * 100,     // in paise (₹1 = 100 paise)
      currency:    'INR',
      name:        'Sugandh Shri',
      description: `${items.length} fragrance${items.length > 1 ? 's' : ''} · ${items.map(i => i.name).join(', ')}`,
      image:       '/favicon.svg',
      // order_id: orderData.id,           // Uncomment when backend ready

      // ── Called when payment succeeds ──
      handler: function(response) {
        clearCart()
        onSuccess({
          paymentId: response.razorpay_payment_id,
          orderId:   response.razorpay_order_id,
          signature: response.razorpay_signature,
        })
      },

      // Pre-fill user details if logged in
      prefill: {
        name:    user?.name    || shipping?.fullName || '',
        email:   user?.email   || shipping?.email    || '',
        contact: user?.phone   || shipping?.phone    || '',
      },

      notes: {
        items:   items.map(i => `${i.name} x${i.qty}`).join(', '),
        address: shipping ? `${shipping.address}, ${shipping.city}` : '',
      },

      // Brand styling for the Razorpay popup
      theme: {
        color:          '#C6A75A',
        backdrop_color: 'rgba(11,11,11,0.9)',
      },

      modal: {
        ondismiss: () => setLoading(false),
        animation:  true,
        confirm_close: true,
      },
    }

    const rzp = new window.Razorpay(options)

    rzp.on('payment.failed', err => {
      setError(`Payment failed: ${err.error.description || 'Please try again.'}`)
      setLoading(false)
    })

    rzp.open()
    // Note: setLoading(false) is handled by ondismiss or handler above
  }

  return (
    <motion.div key="payment" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: 'var(--text-main)', marginBottom: 28 }}>Complete Payment</h2>

      {/* Amount summary */}
      <div style={{ background: 'rgba(198,167,90,0.04)', border: '1px solid rgba(198,167,90,0.12)', padding: '24px', marginBottom: 28 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#C6A75A', textTransform: 'uppercase', marginBottom: 16 }}>Amount Due</div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 36, color: '#C6A75A', marginBottom: 8 }}>
          ₹{totals.grand.toLocaleString('en-IN')}
        </div>
        <div style={{ fontSize: 10, color: '#4A3A34', letterSpacing: 1 }}>
          {items.reduce((s,i) => s+i.qty, 0)} items · {totals.shipping === 0 ? 'Free shipping' : `₹${totals.shipping} shipping`}
          {totals.discount > 0 && ` · ₹${totals.discount} coupon discount`}
        </div>
      </div>

      {/* What Razorpay supports */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: '#6A4E42', textTransform: 'uppercase', marginBottom: 14 }}>Accepted Payment Methods</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { icon: '💳', label: 'Credit / Debit Card' },
            { icon: '📱', label: 'UPI (GPay, PhonePe)' },
            { icon: '🏦', label: 'Net Banking' },
            { icon: '💰', label: 'EMI Options' },
            { icon: '👛', label: 'Wallets' },
            { icon: '🔄', label: 'BNPL' },
          ].map(m => (
            <div key={m.label} style={{ border: '1px solid rgba(198,167,90,0.1)', padding: '12px 10px', textAlign: 'center', background: 'rgba(198,167,90,0.02)' }}>
              <div style={{ fontSize: 18, marginBottom: 5 }}>{m.icon}</div>
              <div style={{ fontSize: 9, color: '#4A3A34', lineHeight: 1.4, letterSpacing: 0.5 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ background: 'rgba(220,80,80,0.08)', border: '1px solid rgba(220,80,80,0.25)', padding: '12px 16px', marginBottom: 20, fontSize: 12, color: 'rgba(220,120,120,1)', fontFamily: 'Montserrat, sans-serif' }}>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pay button */}
      <motion.button
        onClick={handleRazorpay}
        disabled={loading}
        style={{
          width: '100%', padding: '17px',
          background: loading ? 'rgba(198,167,90,0.2)' : '#C6A75A',
          border: 'none',
          color: loading ? '#4A3A34' : '#0B0B0B',
          fontSize: 11, letterSpacing: 3, fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginBottom: 12,
        }}
        whileHover={!loading ? { background: '#E8D5A3' } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
      >
        {loading ? (
          <>
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#0B0B0B', borderRadius: '50%', display: 'inline-block' }} />
            OPENING RAZORPAY…
          </>
        ) : (
          <>🔒 PAY ₹{totals.grand.toLocaleString('en-IN')} SECURELY</>
        )}
      </motion.button>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 9, color: '#2A2018', letterSpacing: 1 }}>
          256-bit SSL encrypted · Powered by Razorpay
        </span>
      </div>

      <motion.button onClick={onBack}
        style={{ width: '100%', background: 'transparent', border: '1px solid rgba(198,167,90,0.15)', color: '#6A4E42', padding: '13px', fontSize: 10, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif' }}
        whileHover={{ borderColor: 'rgba(198,167,90,0.4)', color: '#C6A75A' }}>
        ← BACK TO SHIPPING
      </motion.button>
    </motion.div>
  )
}

// ── Step 3 — Confirmation ────────────────────────────────────
function ConfirmedStep({ paymentInfo }) {
  const orderNum = `SH-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000 + 10000)}`

  return (
    <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.25,0.46,0.45,0.94] }}
      style={{ textAlign: 'center', padding: '20px 0' }}>

      {/* Animated tick */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
        style={{ width: 80, height: 80, border: '2px solid #C6A75A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: 32 }}>
        ✓
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        style={{ fontFamily: 'Cinzel, serif', fontSize: 28, color: 'var(--text-main)', marginBottom: 10 }}>
        Order Confirmed!
      </motion.h2>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#C6A75A', marginBottom: 8 }}>ORDER NUMBER</div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 18, color: '#C6A75A', marginBottom: 24, letterSpacing: 2 }}>{orderNum}</div>

        {paymentInfo?.paymentId && (
          <div style={{ fontSize: 10, color: '#4A3A34', marginBottom: 6, letterSpacing: 1 }}>
            Payment ID: {paymentInfo.paymentId}
          </div>
        )}

        <p style={{ fontSize: 13, color: '#6A4E42', lineHeight: 1.9, maxWidth: 440, margin: '0 auto 28px', fontWeight: 300 }}>
          Thank you for your order. Your fragrances are being lovingly packed in our signature black-and-gold gift box with a personal fragrance scroll. You will receive a shipping confirmation by email shortly.
        </p>

        <div style={{ borderLeft: '1px solid #C6A75A', paddingLeft: 20, margin: '0 auto 32px', maxWidth: 380, textAlign: 'left' }}>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, color: '#E8D5A3', fontStyle: 'italic', lineHeight: 1.7 }}>
            "Every bottle leaves Kannauj with a blessing for its new home."
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/">
            <motion.button style={{ background: '#C6A75A', border: 'none', color: '#0B0B0B', padding: '13px 36px', fontSize: 9, letterSpacing: 3, fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              whileHover={{ background: '#E8D5A3' }}>BACK TO HOME</motion.button>
          </Link>
          <Link to="/track-order">
            <motion.button style={{ background: 'transparent', border: '1px solid rgba(198,167,90,0.3)', color: '#C6A75A', padding: '13px 36px', fontSize: 9, letterSpacing: 3, fontFamily: 'Montserrat, sans-serif' }}
              whileHover={{ borderColor: '#C6A75A' }}>TRACK ORDER →</motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main CheckoutPage ────────────────────────────────────────
export default function CheckoutPage() {
  const { items, cartTotal } = useCart()
  const { user }             = useAuth()
  const navigate             = useNavigate()
  const location             = useLocation()

  // Read totals passed from CartPage (discount, coupon, etc.)
  const passed = location.state || {}
  const discount  = passed.discount   || 0
  const couponCode = passed.couponCode || ''
  const shipping  = passed.shipping   ?? (cartTotal >= 1999 ? 0 : 149)
  const grand     = passed.grandTotal ?? (cartTotal - discount + shipping)

  const totals = { subtotal: cartTotal, discount, couponCode, shipping, grand }

  const [step, setStep] = useState(0)
  const [paymentInfo, setPaymentInfo] = useState(null)

  const [shippingData, setShippingData] = useState({
    fullName: user?.name  || '',
    email:    user?.email || '',
    phone:    user?.phone || '',
    address: '', city: '', state: '', pinCode: '', country: 'India',
  })

  // Redirect to cart if empty (but not after confirmation)
  useEffect(() => {
    if (items.length === 0 && step < 3) navigate('/cart', { replace: true })
  }, [items, step, navigate])

  const changeShipping = (key, val) => setShippingData(d => ({ ...d, [key]: val }))

  const handlePaymentSuccess = (info) => {
    setPaymentInfo(info)
    setStep(3)
  }

  if (items.length === 0 && step < 3) return null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--ivory)' }}>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 40px' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontSize: 9, letterSpacing: 5, color: '#C6A75A', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>✦ Secure Checkout</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px,3.5vw,38px)', color: 'var(--text-main)' }}>Complete Your Order</h1>
        </div>

        {/* Step bar */}
        {step < 3 && <StepBar current={step} />}

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 0 && <ReviewStep  items={items} totals={totals} onNext={() => setStep(1)} />}
          {step === 1 && <ShippingStep data={shippingData} onChange={changeShipping} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
          {step === 2 && <PaymentStep  totals={totals} shipping={shippingData} onSuccess={handlePaymentSuccess} onBack={() => setStep(1)} />}
          {step === 3 && <ConfirmedStep paymentInfo={paymentInfo} />}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
