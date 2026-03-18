// ============================================================
// OrderTrackingPage.jsx  /track-order
// Order status timeline with animated step indicator.
// ============================================================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DEMO_ORDERS = {
  'SH-2025-48291': {
    product: 'Royal Oudh Attar × 1, Gulab Attar × 2',
    date: '12 March 2025',
    total: '₹6,097',
    address: 'Arjun Mehra, Mumbai, Maharashtra',
    status: 2,
    steps: [
      { label:'Order Placed',    date:'12 Mar, 2:34 PM',  desc:'Your order has been received and is being prepared.' },
      { label:'Quality Check',  date:'12 Mar, 6:10 PM',  desc:'Master attar-maker inspects each bottle before packing.' },
      { label:'Packed & Sealed',date:'13 Mar, 10:22 AM', desc:'Sealed in our signature black-and-gold gift box with tamper-evident tape.' },
      { label:'Dispatched',     date:'13 Mar, 4:45 PM',  desc:'Handed to BlueDart Express. Tracking ID: BD9847263819' },
      { label:'Out for Delivery',date:'—',                desc:'Your fragrance is on its way to your door.' },
      { label:'Delivered',      date:'—',                desc:'Package delivered. Enjoy your fragrance.' },
    ],
  },
}

export default function OrderTrackingPage() {
  const [orderNum, setOrderNum] = useState('')
  const [searched, setSearched] = useState(false)
  const [order, setOrder]       = useState(null)
  const [notFound, setNotFound] = useState(false)

  const search = () => {
    setSearched(true)
    const found = DEMO_ORDERS[orderNum.trim().toUpperCase()]
    if (found) { setOrder(found); setNotFound(false) }
    else       { setOrder(null);  setNotFound(true) }
  }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
      style={{ paddingTop:100, minHeight:'100vh', background:'var(--ivory)' }}>

      {/* Header */}
      <div style={{ padding:'70px 60px 50px', borderBottom:'1px solid rgba(198,167,90,0.08)' }}>
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
          <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:14 }}>✦ Where Is My Order?</span>
          <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(30px,4vw,52px)', color:'var(--text-main)', marginBottom:16 }}>Track Your Order</h1>
          <p style={{ fontSize:13, color:'var(--text-muted)', fontWeight:300 }}>Enter your order number to see real-time shipping status.</p>
        </motion.div>
      </div>

      <div style={{ padding:'60px', maxWidth:720, margin:'0 auto' }}>
        {/* Search */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <div style={{ display:'flex', border:'1px solid rgba(198,167,90,0.25)', marginBottom:12 }}>
            <input value={orderNum} onChange={e => setOrderNum(e.target.value)}
              onKeyDown={e => e.key==='Enter' && search()}
              placeholder="e.g. SH-2025-48291"
              style={{ flex:1, background:'transparent', border:'none', padding:'16px 24px', color:'var(--text-main)', fontSize:13, fontFamily:'Montserrat,sans-serif', outline:'none', letterSpacing:1 }} />
            <motion.button onClick={search}
              style={{ background:'#C6A75A', border:'none', color:'#0B0B0B', padding:'16px 28px', fontSize:9, letterSpacing:3, fontFamily:'Montserrat,sans-serif', fontWeight:700 }}
              whileHover={{ background:'#E8D5A3' }}>TRACK</motion.button>
          </div>
          <p style={{ fontSize:10, color:'var(--text-light)', letterSpacing:1 }}>Demo: try order number <span style={{ color:'rgba(198,167,90,0.5)', letterSpacing:2 }}>SH-2025-48291</span></p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* Not found */}
          {searched && notFound && (
            <motion.div key="notfound" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              style={{ textAlign:'center', padding:'60px 0' }}>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:48, color:'rgba(198,167,90,0.1)', marginBottom:20 }}>✦</div>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:20, color:'var(--text-main)', marginBottom:12 }}>Order Not Found</div>
              <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.8 }}>We couldn't find that order number. Please check and try again, or <a href="/contact" style={{ color:'rgba(198,167,90,0.6)' }}>contact us</a> for help.</p>
            </motion.div>
          )}

          {/* Order found */}
          {order && (
            <motion.div key="found" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
              {/* Order summary */}
              <div style={{ marginTop:40, padding:'24px', background:'rgba(198,167,90,0.04)', border:'1px solid rgba(198,167,90,0.1)', marginBottom:40 }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
                  {[
                    { label:'Order', value:`#${orderNum.toUpperCase()}` },
                    { label:'Placed', value:order.date },
                    { label:'Total', value:order.total },
                    { label:'Delivery to', value:order.address },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ fontSize:8, letterSpacing:2, color:'var(--text-light)', textTransform:'uppercase', marginBottom:6 }}>{item.label}</div>
                      <div style={{ fontSize:11, color:'var(--text-main)', lineHeight:1.5 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div style={{ position:'relative', paddingLeft:40 }}>
                {/* Vertical track */}
                <div style={{ position:'absolute', left:10, top:16, bottom:16, width:1, background:'rgba(198,167,90,0.1)' }}>
                  <motion.div initial={{ height:0 }} animate={{ height:`${(order.status / (order.steps.length-1)) * 100}%` }}
                    transition={{ duration:1.2, ease:[0.25,0.46,0.45,0.94], delay:0.3 }}
                    style={{ background:'linear-gradient(to bottom, #8B6914, #C6A75A)', width:'100%' }} />
                </div>

                {order.steps.map((step, i) => {
                  const done    = i <= order.status
                  const current = i === order.status
                  return (
                    <motion.div key={i} initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }}
                      transition={{ duration:0.5, delay: 0.4 + i*0.1 }}
                      style={{ display:'flex', gap:24, marginBottom:32, position:'relative' }}>
                      {/* Node */}
                      <div style={{ position:'absolute', left:-40, top:3, width:20, height:20, borderRadius:'50%', background: done ? '#C6A75A' : 'rgba(198,167,90,0.1)', border:`1px solid ${done ? '#C6A75A' : 'rgba(198,167,90,0.2)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        {done && !current && <span style={{ color:'#0B0B0B', fontSize:11, fontWeight:700 }}>✓</span>}
                        {current && <motion.div animate={{ scale:[1,1.3,1] }} transition={{ duration:1.5, repeat:Infinity }} style={{ width:8, height:8, borderRadius:'50%', background:'var(--ivory)' }} />}
                      </div>
                      <div>
                        <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, fontWeight:600, letterSpacing:2, color: done ? '#F5F1E9' : '#4A3A34', textTransform:'uppercase', marginBottom:4 }}>
                          {step.label}
                          {current && <span style={{ marginLeft:10, fontSize:8, color:'var(--gold)', letterSpacing:2, border:'1px solid rgba(198,167,90,0.3)', padding:'2px 8px' }}>CURRENT</span>}
                        </div>
                        {step.date !== '—' && <div style={{ fontSize:10, color:'var(--gold)', marginBottom:4, letterSpacing:1 }}>{step.date}</div>}
                        <p style={{ fontSize:12, color: done ? '#6A4E42' : '#2A2018', lineHeight:1.6, fontWeight:300 }}>{step.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
