// ============================================================
// ShareProduct.jsx
// Native Web Share API + fallback copy-link button.
// Shows on ProductDetailPage.
// ============================================================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ShareProduct({ product }) {
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const url = `${window.location.origin}/product/${product.slug}`
  const text = `${product.name} — Pure luxury fragrance from Sugandh Shri`

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url })
      } catch { /* user cancelled */ }
    } else {
      setMenuOpen(o => !o)
    }
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    setMenuOpen(false)
  }

  const shareLinks = [
    { label:'WhatsApp',  href:`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,  color:'#25D366' },
    { label:'Twitter/X', href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, color:'#1DA1F2' },
    { label:'Facebook',  href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,  color:'#1877F2' },
    { label:'Pinterest', href:`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`, color:'#E60023' },
  ]

  return (
    <div style={{ position:'relative', display:'inline-block' }}>
      <motion.button onClick={nativeShare}
        style={{ background:'transparent', border:'1px solid rgba(198,167,90,0.2)', color:'var(--text-muted)', padding:'9px 18px', fontSize:9, letterSpacing:2, fontFamily:'Montserrat,sans-serif', display:'flex', alignItems:'center', gap:8 }}
        whileHover={{ borderColor:'rgba(198,167,90,0.45)', color:'var(--gold)' }}>
        ↗ SHARE
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0, y:8, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:8, scale:0.95 }} transition={{ duration:0.2 }}
            style={{ position:'absolute', bottom:'calc(100% + 8px)', left:0, background:'var(--beige)', border:'1px solid rgba(198,167,90,0.15)', minWidth:180, zIndex:100, padding:'8px 0' }}>
            {shareLinks.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display:'block', padding:'10px 16px', fontSize:11, color:'#A09070', transition:'color 0.2s', letterSpacing:0.5 }}
                onMouseEnter={e => e.target.style.color = s.color}
                onMouseLeave={e => e.target.style.color = '#A09070'}
                onClick={() => setMenuOpen(false)}>
                {s.label}
              </a>
            ))}
            <div style={{ height:1, background:'rgba(198,167,90,0.08)', margin:'6px 0' }} />
            <button onClick={copyLink}
              style={{ display:'block', width:'100%', textAlign:'left', padding:'10px 16px', fontSize:11, color: copied ? '#C6A75A' : '#A09070', background:'transparent', border:'none', fontFamily:'Montserrat,sans-serif', letterSpacing:0.5 }}>
              {copied ? '✓ LINK COPIED' : 'COPY LINK'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position:'fixed', inset:0, zIndex:99 }} />}
    </div>
  )
}
