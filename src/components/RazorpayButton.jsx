// ============================================================
// RazorpayButton.jsx
// Razorpay payment gateway integration.
// Dynamically loads the Razorpay checkout script and opens
// the payment modal when clicked.
// Replace VITE_RAZORPAY_KEY_ID in .env.local with your key.
// ============================================================
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

function loadRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function RazorpayButton({ amount, onSuccess, disabled }) {
  const [loading, setLoading] = useState(false)
  const { items, clearCart }  = useCart()

  const handlePayment = async () => {
    setLoading(true)
    const loaded = await loadRazorpay()
    if (!loaded) {
      alert('Payment gateway failed to load. Please try again.')
      setLoading(false)
      return
    }

    // In production, create an order on your backend first
    // and pass the order_id returned by Razorpay Orders API.
    const options = {
      key:         import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_DEMO',
      amount:      amount * 100, // paise
      currency:    'INR',
      name:        'Sugandh Shri',
      description: `Order of ${items.length} fragrance${items.length !== 1 ? 's' : ''}`,
      image:       '/favicon.ico',
      // order_id: 'order_XXXXXXX', // from backend
      handler: response => {
        // response.razorpay_payment_id
        // response.razorpay_order_id
        // response.razorpay_signature
        clearCart()
        onSuccess?.(response)
      },
      prefill: {
        name:    '',
        email:   '',
        contact: '',
      },
      notes: {
        items: items.map(i => `${i.name} x${i.qty}`).join(', '),
      },
      theme: {
        color:            '#C6A75A',
        backdrop_color:   'rgba(11,11,11,0.85)',
        hide_topbar:      false,
      },
      modal: {
        ondismiss: () => setLoading(false),
        animation: true,
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', err => {
      console.error('Payment failed:', err.error)
      setLoading(false)
    })
    rzp.open()
    setLoading(false)
  }

  return (
    <motion.button
      onClick={handlePayment}
      disabled={disabled || loading}
      style={{
        width: '100%',
        background: (disabled || loading) ? 'rgba(198,167,90,0.15)' : '#C6A75A',
        border: 'none',
        color:  (disabled || loading) ? '#4A3A34' : '#0B0B0B',
        padding: '16px',
        fontSize: 10,
        letterSpacing: 3,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
      whileHover={(!disabled && !loading) ? { background:'#E8D5A3' } : {}}
      whileTap={(!disabled && !loading) ? { scale:0.98 } : {}}
    >
      {loading ? (
        <>
          <motion.span animate={{ rotate: 360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
            style={{ width:12, height:12, border:'2px solid rgba(11,11,11,0.3)', borderTopColor:'#0B0B0B', borderRadius:'50%', display:'inline-block' }} />
          PROCESSING…
        </>
      ) : (
        <>PAY SECURELY WITH RAZORPAY →</>
      )}
    </motion.button>
  )
}
