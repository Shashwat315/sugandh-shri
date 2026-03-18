import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy, useEffect, useRef, useState, Component } from 'react'

import { CartProvider }     from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider }     from './context/AuthContext'

import AnnouncementBar from './components/AnnouncementBar'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import CartDrawer      from './components/CartDrawer'
import SearchOverlay   from './components/SearchOverlay'
import FloatingActions from './components/FloatingActions'
import LoadingScreen   from './components/LoadingScreen'
import CookieConsent   from './components/CookieConsent'
import ScrollToTop     from './components/ScrollToTop'
import Toast           from './components/Toast'

const HomePage          = lazy(() => import('./pages/HomePage'))
const ShopPage          = lazy(() => import('./pages/ShopPage'))
const AttarsPage        = lazy(() => import('./pages/AttarsPage'))
const PerfumesPage      = lazy(() => import('./pages/PerfumesPage'))
const AboutPage         = lazy(() => import('./pages/AboutPage'))
const ContactPage       = lazy(() => import('./pages/ContactPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const WishlistPage      = lazy(() => import('./pages/WishlistPage'))
const CheckoutPage      = lazy(() => import('./pages/CheckoutPage'))
const CartPage          = lazy(() => import('./pages/CartPage'))
const GiftSetsPage      = lazy(() => import('./pages/GiftSetsPage'))
const OrderTrackingPage = lazy(() => import('./pages/OrderTrackingPage'))
const ScentQuizPage     = lazy(() => import('./pages/ScentQuizPage'))
const LoginPage         = lazy(() => import('./pages/LoginPage'))
const SignupPage         = lazy(() => import('./pages/SignupPage'))
const AccountPage       = lazy(() => import('./pages/AccountPage'))
const EssentialOilsPage = lazy(() => import('./pages/EssentialOilsPage'))
const ReturnPolicyPage  = lazy(() => import('./pages/ReturnPolicyPage'))
const AdminPage         = lazy(() => import('./pages/AdminPage'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'))

// Page loader — warm ivory theme
function PageLoader() {
  return (
    <div style={{ minHeight:'80vh', background:'var(--ivory)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ display:'flex', gap:10 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:'var(--brown)', opacity:0.3, animation:`dotP 1.2s ${i*0.2}s ease-in-out infinite` }}/>
        ))}
      </div>
      <style>{`@keyframes dotP { 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }`}</style>
    </div>
  )
}

// Error boundary — warm ivory theme
class PageErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(err) { return { error: err } }
  componentDidCatch(err, info) { console.error('Page crash:', err, info) }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight:'70vh', background:'var(--ivory)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:20, padding:40 }}>
          <div style={{ fontFamily:'Cinzel,serif', fontSize:28, color:'var(--brown)' }}>Sugandh Shri</div>
          <p style={{ color:'var(--text-muted)', fontSize:13, maxWidth:460, textAlign:'center', lineHeight:1.8, fontFamily:'Lora,serif' }}>
            This page encountered an error. Press F12 → Console to see details.
          </p>
          <pre style={{ fontSize:11, color:'var(--text-light)', background:'var(--beige)', padding:'12px 16px', border:'1px solid rgba(106,78,66,0.15)', maxWidth:540, overflow:'auto', fontFamily:'monospace', lineHeight:1.6, borderRadius:6 }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button onClick={() => { this.setState({ error:null }); window.history.back() }}
            style={{ border:'1.5px solid var(--brown)', color:'var(--brown)', background:'transparent', padding:'10px 28px', fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, cursor:'pointer', borderRadius:4 }}>
            ← GO BACK
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Warm gold cursor (desktop only)
function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const s    = useRef({ mx:0, my:0, rx:0, ry:0, frame:null })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const onMove = e => { s.current.mx = e.clientX; s.current.my = e.clientY }
    document.addEventListener('mousemove', onMove)

    const tick = () => {
      s.current.rx += (s.current.mx - s.current.rx) * 0.12
      s.current.ry += (s.current.my - s.current.ry) * 0.12
      if (dot.current)  { dot.current.style.left = `${s.current.mx-4}px`; dot.current.style.top = `${s.current.my-4}px` }
      if (ring.current) { ring.current.style.left = `${s.current.rx-14}px`; ring.current.style.top = `${s.current.ry-14}px` }
      s.current.frame = requestAnimationFrame(tick)
    }
    tick()

    const grow   = () => { if(dot.current) dot.current.style.transform='scale(2)'; if(ring.current) ring.current.style.transform='scale(1.5)' }
    const shrink = () => { if(dot.current) dot.current.style.transform=''; if(ring.current) ring.current.style.transform='' }
    const attach = () => document.querySelectorAll('button,a').forEach(el => {
      el.removeEventListener('mouseenter',grow); el.removeEventListener('mouseleave',shrink)
      el.addEventListener('mouseenter',grow); el.addEventListener('mouseleave',shrink)
    })
    attach()
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList:true, subtree:true })
    return () => { document.removeEventListener('mousemove',onMove); cancelAnimationFrame(s.current.frame); mo.disconnect() }
  }, [])

  return (
    <>
      <div ref={dot}  style={{ position:'fixed', width:8,  height:8,  background:'var(--brown)', borderRadius:'50%', pointerEvents:'none', zIndex:99999, top:0, left:0, transition:'transform 0.15s' }}/>
      <div ref={ring} style={{ position:'fixed', width:28, height:28, border:'1.5px solid rgba(106,78,66,0.45)', borderRadius:'50%', pointerEvents:'none', zIndex:99998, top:0, left:0, transition:'transform 0.18s' }}/>
    </>
  )
}

function AppRoutes({ searchOpen, setSearchOpen }) {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top:0, behavior:'smooth' }) }, [location.pathname])
  useEffect(() => {
    const h = e => { if((e.metaKey||e.ctrlKey)&&e.key==='k') { e.preventDefault(); setSearchOpen(true) } }
    window.addEventListener('keydown',h); return () => window.removeEventListener('keydown',h)
  }, [setSearchOpen])

  return (
    <>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <Suspense fallback={<PageLoader/>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"               element={<HomePage/>} />
            <Route path="/shop"           element={<ShopPage/>} />
            <Route path="/attars"         element={<AttarsPage/>} />
            <Route path="/perfumes"       element={<PerfumesPage/>} />
            <Route path="/essential-oils" element={<EssentialOilsPage/>} />
            <Route path="/about"          element={<AboutPage/>} />
            <Route path="/contact"        element={<ContactPage/>} />
            <Route path="/product/:slug"  element={<ProductDetailPage/>} />
            <Route path="/wishlist"       element={<WishlistPage/>} />
            <Route path="/cart"           element={<CartPage/>} />
            <Route path="/checkout"       element={<CheckoutPage/>} />
            <Route path="/gift-sets"      element={<GiftSetsPage/>} />
            <Route path="/track-order"    element={<OrderTrackingPage/>} />
            <Route path="/scent-quiz"     element={<ScentQuizPage/>} />
            <Route path="/login"          element={<LoginPage/>} />
            <Route path="/signup"         element={<SignupPage/>} />
            <Route path="/account"        element={<AccountPage/>} />
            <Route path="/return-policy"  element={<ReturnPolicyPage/>} />
            <Route path="/admin"           element={<AdminPage/>} />
            <Route path="*"              element={<NotFoundPage/>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}

export default function App() {
  const [loading, setLoading]     = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast]         = useState('')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3500)
    return () => clearTimeout(t)
  }, [])

  return (
    <PageErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AnimatePresence>
                {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)}/>}
              </AnimatePresence>

              {!loading && (
                <PageErrorBoundary>
                  <CustomCursor/>
                  <AnnouncementBar/>
                  <Navbar onSearchOpen={() => setSearchOpen(true)}/>
                  <CartDrawer/>
                  <FloatingActions/>
                  <CookieConsent/>
                  <ScrollToTop/>
                  <main style={{ minHeight:'100vh' }}>
                    <AppRoutes searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
                  </main>
                  <Footer/>
                  <Toast message={toast}/>
                </PageErrorBoundary>
              )}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </PageErrorBoundary>
  )
}
