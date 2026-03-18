// Navbar — sandalwood luxury, fully responsive mobile
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useCart }     from '../context/CartContext'
import { useAuth }     from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'

const LINKS = [
  { label:'Home',    to:'/' },
  { label:'Shop',    to:'/shop' },
  { label:'Attars',  to:'/attars' },
  { label:'Perfumes',to:'/perfumes' },
  { label:'Oils',    to:'/essential-oils' },
  { label:'About',   to:'/about' },
  { label:'Contact', to:'/contact' },
]

export default function Navbar({ onSearchOpen }) {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartPulse,  setCartPulse]  = useState(false)
  const [prev,       setPrev]       = useState(0)
  const { scrollY }                 = useScroll()
  const { cartCount, toggleCart }   = useCart()
  const { isLoggedIn, user }        = useAuth()
  const { count: wishCount }        = useWishlist()
  const location                    = useLocation()

  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 40))
  useEffect(() => {
    if (cartCount > prev && cartCount > 0) { setCartPulse(true); setTimeout(() => setCartPulse(false), 600) }
    setPrev(cartCount)
  }, [cartCount])
  useEffect(() => setMobileOpen(false), [location.pathname])

  const navBg   = scrolled ? 'rgba(245,241,233,0.97)' : 'rgba(245,241,233,0)'
  const navBdr  = scrolled ? '1px solid rgba(106,78,66,0.12)' : '1px solid transparent'
  const navShdw = scrolled ? '0 2px 20px rgba(106,78,66,0.08)' : 'none'
  const padY    = scrolled ? '10px' : '18px'
  const topPos  = scrolled ? '0px' : '38px'

  return (
    <>
      <motion.nav
        animate={{ background:navBg, borderBottom:navBdr, boxShadow:navShdw, paddingTop:padY, paddingBottom:padY, top:topPos }}
        transition={{ duration:0.35, ease:'easeInOut' }}
        style={{ position:'fixed', left:0, right:0, zIndex:1000, paddingLeft:'clamp(16px,4vw,64px)', paddingRight:'clamp(16px,4vw,64px)', display:'flex', justifyContent:'space-between', alignItems:'center', backdropFilter: scrolled ? 'blur(16px)' : 'none' }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration:'none', flexShrink:0 }}>
          <motion.div whileHover={{ opacity:0.75 }} transition={{ duration:0.2 }}>
            <div style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(13px,2vw,18px)', color:'var(--brown)', letterSpacing:'clamp(2px,0.3vw,4px)', fontWeight:600, lineHeight:1 }}>
              SUGANDH SHRI
            </div>
            <div style={{ fontSize:'clamp(6px,0.6vw,7px)', letterSpacing:'clamp(2px,0.5vw,5px)', color:'var(--gold)', fontFamily:'Montserrat,sans-serif', marginTop:3 }}>
              EST. 1887 · KANNAUJ
            </div>
          </motion.div>
        </Link>

        {/* Desktop links */}
        <ul style={{ display:'flex', gap:'clamp(16px,2.5vw,32px)', listStyle:'none', margin:0, padding:0 }}
          className="desktop-nav">
          {LINKS.map(link => {
            const active = location.pathname === link.to
            return (
              <li key={link.label} style={{ position:'relative' }}>
                <Link to={link.to}>
                  <motion.span style={{ fontFamily:'Montserrat,sans-serif', fontSize:'clamp(8px,0.8vw,10px)', letterSpacing:'clamp(1px,0.2vw,2px)', textTransform:'uppercase', fontWeight:500, color: active?'var(--brown)':'var(--text-muted)', display:'block', paddingBottom:3 }}
                    whileHover={{ color:'var(--brown)' }} transition={{ duration:0.2 }}>
                    {link.label}
                  </motion.span>
                </Link>
                {active && (
                  <motion.span layoutId="navLine" style={{ position:'absolute', bottom:0, left:0, right:0, height:1.5, background:'var(--gold)', borderRadius:1 }}/>
                )}
              </li>
            )
          })}
        </ul>

        {/* Actions */}
        <div style={{ display:'flex', alignItems:'center', gap:'clamp(2px,0.5vw,6px)' }}>
          {/* Search */}
          <motion.button onClick={onSearchOpen} title="Search"
            style={{ background:'transparent', border:'none', color:'var(--text-muted)', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, borderRadius:'50%' }}
            whileHover={{ color:'var(--brown)', background:'rgba(106,78,66,0.06)' }}>
            ⌕
          </motion.button>

          {/* Wishlist */}
          <Link to="/wishlist" title="Wishlist">
            <motion.div style={{ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', borderRadius:'50%' }}
              whileHover={{ background:'rgba(106,78,66,0.06)' }}>
              <span style={{ fontSize:16, color: wishCount>0?'var(--brown)':'var(--text-muted)' }}>{wishCount>0?'♥':'♡'}</span>
              {wishCount>0 && (
                <span style={{ position:'absolute', top:3, right:3, background:'var(--gold)', color:'var(--brown-deeper)', borderRadius:'50%', width:14, height:14, fontSize:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontFamily:'Montserrat,sans-serif' }}>{wishCount}</span>
              )}
            </motion.div>
          </Link>

          {/* Account */}
          <Link to={isLoggedIn?'/account':'/login'} title={isLoggedIn?'My Account':'Sign In'}>
            <motion.div style={{ width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: isLoggedIn?'var(--brown)':'transparent', color: isLoggedIn?'var(--ivory)':'var(--text-muted)', fontSize: isLoggedIn?11:18, fontFamily:'Cinzel,serif', fontWeight:600 }}
              whileHover={{ background: isLoggedIn?'var(--brown-dark)':'rgba(106,78,66,0.06)', color: isLoggedIn?'var(--ivory)':'var(--brown)' }}
              transition={{ duration:0.2 }}>
              {isLoggedIn?(user?.avatar||'✦'):'👤'}
            </motion.div>
          </Link>

          {/* Cart */}
          <motion.button onClick={toggleCart} title="Shopping Bag"
            animate={{ scale: cartPulse?[1,1.15,1]:1 }}
            style={{ background:'var(--brown)', border:'none', color:'var(--ivory)', padding:'9px 16px', fontSize:'clamp(8px,0.8vw,10px)', letterSpacing:2, fontFamily:'Montserrat,sans-serif', fontWeight:600, borderRadius:4, display:'flex', alignItems:'center', gap:7, marginLeft:4, whiteSpace:'nowrap' }}
            whileHover={{ background:'var(--brown-dark)', boxShadow:'0 4px 16px rgba(106,78,66,0.3)' }}>
            BAG
            <AnimatePresence>
              {cartCount>0 && (
                <motion.span key={cartCount} initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}
                  style={{ background:'var(--gold)', color:'var(--brown-deeper)', borderRadius:'50%', width:16, height:16, fontSize:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button onClick={() => setMobileOpen(o=>!o)}
            style={{ background:'transparent', border:'1.5px solid rgba(106,78,66,0.25)', color:'var(--brown)', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, borderRadius:4, marginLeft:6 }}
            whileHover={{ borderColor:'var(--brown)' }}
            className="mobile-menu-btn">
            {mobileOpen?'✕':'☰'}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={() => setMobileOpen(false)}
              style={{ position:'fixed', inset:0, background:'rgba(47,37,35,0.4)', zIndex:998 }}/>
            <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}}
              transition={{ duration:0.35, ease:[0.25,0.46,0.45,0.94] }}
              style={{ position:'fixed', top:0, right:0, bottom:0, width:280, background:'var(--ivory)', zIndex:999, padding:'80px 32px 32px', boxShadow:'-8px 0 32px rgba(106,78,66,0.15)', display:'flex', flexDirection:'column' }}>
              {/* Logo in mobile drawer */}
              <div style={{ fontFamily:'Cinzel,serif', fontSize:14, color:'var(--brown)', letterSpacing:3, marginBottom:32, paddingBottom:20, borderBottom:'1px solid rgba(106,78,66,0.1)' }}>
                SUGANDH SHRI
              </div>
              {LINKS.map(link => (
                <Link key={link.label} to={link.to}
                  style={{ display:'block', padding:'13px 0', color: location.pathname===link.to?'var(--brown)':'var(--text-muted)', fontSize:12, letterSpacing:3, fontFamily:'Montserrat,sans-serif', textTransform:'uppercase', fontWeight: location.pathname===link.to?600:400, borderBottom:'1px solid rgba(106,78,66,0.06)' }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ marginTop:24, paddingTop:20, borderTop:'1px solid rgba(106,78,66,0.08)' }}>
                <Link to={isLoggedIn?'/account':'/login'}>
                  <motion.button className="btn-primary" style={{ width:'100%', borderRadius:4, padding:'12px' }} whileHover={{ scale:1.01 }}>
                    {isLoggedIn?'MY ACCOUNT':'SIGN IN'}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile / Desktop visibility styles */}
      <style>{`
        .desktop-nav { display:flex; }
        .mobile-menu-btn { display:none; }
        @media (max-width:900px) {
          .desktop-nav { display:none !important; }
          .mobile-menu-btn { display:flex !important; }
        }
        @media (max-width:480px) {
          .btn-primary { padding:11px 24px !important; font-size:9px !important; }
        }
      `}</style>
    </>
  )
}
