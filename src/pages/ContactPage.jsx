// ============================================================
// ContactPage.jsx – Contact form, store info, FAQ accordion
// ============================================================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '../data/products'

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
      transition={{ duration:0.6, delay:index*0.07 }} viewport={{ once:true }}
      style={{ borderBottom:'1px solid rgba(198,167,90,0.08)' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:'100%', textAlign:'left', background:'transparent', border:'none', padding:'24px 0', display:'flex', justifyContent:'space-between', alignItems:'center', color:'var(--text-main)', fontFamily:'Playfair Display,serif', fontSize:16, lineHeight:1.4 }}>
        <span>{faq.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration:0.3 }}
          style={{ color:'var(--gold)', fontSize:24, flexShrink:0, marginLeft:20, lineHeight:1 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration:0.4, ease:[0.25,0.46,0.45,0.94] }} style={{ overflow:'hidden' }}>
            <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9, fontWeight:300, paddingBottom:24 }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (form.name && form.email && form.message) { setSent(true) }
  }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
      style={{ paddingTop:100, background:'var(--ivory)' }}>

      {/* Header */}
      <div style={{ padding:'80px 60px', borderBottom:'1px solid rgba(198,167,90,0.08)' }}>
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }}>
          <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:16 }}>✦ Reach Out</span>
          <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(36px,5vw,64px)', color:'var(--text-main)', marginBottom:20 }}>Contact Us</h1>
          <p style={{ fontSize:14, color:'var(--text-muted)', lineHeight:1.9, fontWeight:300, maxWidth:500 }}>We are a small, family-run house of perfumery. Your message will be read and responded to personally.</p>
        </motion.div>
      </div>

      {/* Contact grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
        {/* Left: Info */}
        <div style={{ padding:'70px 60px', borderRight:'1px solid rgba(198,167,90,0.08)' }}>
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}>
            <div style={{ marginBottom:48 }}>
              <div style={{ fontSize:9, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', marginBottom:16 }}>Our Distillery</div>
              <p style={{ fontSize:13, color:'#A09070', lineHeight:1.9, fontWeight:300 }}>Sugandh Shri Attars<br />Hari Nagar, Kannauj<br />Uttar Pradesh – 209725<br />India</p>
            </div>
            {[
              { label:'Phone', value:'+91 8318400201' },
              { label:'Whatsapp', value:'+91 8318400201' },
              { label:'Email', value:'guptashashwat315@gmail.com' },
              { label:'Wholesale', value:'guptashashwat315@gmail.com' },
            ].map(item => (
              <div key={item.label} style={{ display:'flex', gap:20, paddingBottom:20, marginBottom:20, borderBottom:'1px solid rgba(198,167,90,0.06)' }}>
                <div style={{ fontSize:9, letterSpacing:2, color:'var(--gold)', textTransform:'uppercase', minWidth:90, paddingTop:2 }}>{item.label}</div>
                <div style={{ fontSize:13, color:'var(--text-main)' }}>{item.value}</div>
              </div>
            ))}
            <div style={{ marginTop:40 }}>
              <div style={{ fontSize:9, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', marginBottom:16 }}>Visit Our Distillery</div>
              <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.8, fontWeight:300 }}>We welcome visits by appointment. Experience the deg-bhapka process firsthand, walk through our rose gardens, and meet the artisans behind each bottle. Write to us to arrange a visit.</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Form */}
        <div style={{ padding:'70px 60px' }}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="thanks" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:'center', paddingTop:60 }}>
                <div style={{ fontFamily:'Cinzel,serif', fontSize:48, color:'rgba(198,167,90,0.3)', marginBottom:24 }}>✦</div>
                <h2 style={{ fontFamily:'Cinzel,serif', fontSize:28, color:'var(--text-main)', marginBottom:16 }}>Thank You</h2>
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9, fontWeight:300 }}>Your message has been received. We will respond within 24–48 hours.</p>
                <motion.button onClick={() => setSent(false)}
                  style={{ marginTop:32, border:'1px solid rgba(198,167,90,0.3)', color:'var(--gold)', padding:'12px 32px', fontSize:9, letterSpacing:3, background:'transparent', fontFamily:'Montserrat,sans-serif' }}
                  whileHover={{ background:'rgba(198,167,90,0.08)' }}>SEND ANOTHER</motion.button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity:0 }} animate={{ opacity:1 }}>
                <div style={{ fontSize:9, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', marginBottom:32 }}>Send a Message</div>
                {[
                  { field:'name', label:'Your Name', type:'text', placeholder:'Full Name' },
                  { field:'email', label:'Email Address', type:'email', placeholder:'your@email.com' },
                  { field:'subject', label:'Subject', type:'text', placeholder:'Question about Royal Oudh...' },
                ].map(({ field, label, type, placeholder }) => (
                  <div key={field} style={{ marginBottom:24 }}>
                    <div style={{ fontSize:9, letterSpacing:2, color:'var(--text-muted)', textTransform:'uppercase', marginBottom:10 }}>{label}</div>
                    <input type={type} value={form[field]} placeholder={placeholder}
                      onChange={e => setForm(f => ({...f, [field]:e.target.value}))}
                      style={{ width:'100%', background:'rgba(198,167,90,0.04)', border:'1px solid rgba(198,167,90,0.15)', padding:'14px 18px', color:'var(--text-main)', fontSize:12, fontFamily:'Montserrat,sans-serif', outline:'none', transition:'border-color 0.3s' }}
                      onFocus={e => e.target.style.borderColor='rgba(198,167,90,0.4)'}
                      onBlur={e => e.target.style.borderColor='rgba(198,167,90,0.15)'} />
                  </div>
                ))}
                <div style={{ marginBottom:32 }}>
                  <div style={{ fontSize:9, letterSpacing:2, color:'var(--text-muted)', textTransform:'uppercase', marginBottom:10 }}>Message</div>
                  <textarea value={form.message} placeholder="Tell us about your fragrance needs..."
                    onChange={e => setForm(f => ({...f, message:e.target.value}))}
                    rows={5}
                    style={{ width:'100%', background:'rgba(198,167,90,0.04)', border:'1px solid rgba(198,167,90,0.15)', padding:'14px 18px', color:'var(--text-main)', fontSize:12, fontFamily:'Montserrat,sans-serif', outline:'none', resize:'vertical', transition:'border-color 0.3s' }}
                    onFocus={e => e.target.style.borderColor='rgba(198,167,90,0.4)'}
                    onBlur={e => e.target.style.borderColor='rgba(198,167,90,0.15)'} />
                </div>
                <motion.button type="submit"
                  style={{ width:'100%', background:'#C6A75A', border:'none', color:'#0B0B0B', padding:'16px', fontSize:10, letterSpacing:3, fontFamily:'Montserrat,sans-serif', fontWeight:600 }}
                  whileHover={{ background:'#E8D5A3' }} whileTap={{ scale:0.98 }}>
                  SEND MESSAGE →
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding:'80px 60px', background:'var(--ivory-dark)', borderTop:'1px solid rgba(198,167,90,0.08)' }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }} style={{ marginBottom:48 }}>
            <span style={{ fontSize:9, letterSpacing:5, color:'var(--gold)', textTransform:'uppercase', display:'block', marginBottom:16 }}>✦ Common Questions</span>
            <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(24px,3vw,36px)', color:'var(--text-main)' }}>Frequently Asked</h2>
            <div style={{ width:40, height:1, background:'#C6A75A', marginTop:20 }} />
          </motion.div>
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
        </div>
      </div>
    </motion.div>
  )
}
