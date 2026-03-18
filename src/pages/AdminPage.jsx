// ============================================================
// AdminPage.jsx  /admin
// Complete admin dashboard — orders, users, stats
// Only accessible to users with role='admin'
// ============================================================
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ── API helper ───────────────────────────────────────────────
async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem('ss_auth_token')
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type':'application/json', ...(token ? { Authorization:`Bearer ${token}` } : {}) },
    ...opts,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

// ── Status badge ─────────────────────────────────────────────
const STATUS_COLORS = {
  pending:    { bg:'rgba(198,167,90,0.15)',  color:'#9A7A2E' },
  confirmed:  { bg:'rgba(106,78,66,0.12)',   color:'#6A4E42' },
  packed:     { bg:'rgba(74,50,40,0.12)',    color:'#4A3228' },
  dispatched: { bg:'rgba(100,80,60,0.15)',   color:'#6A5040' },
  delivered:  { bg:'rgba(60,100,60,0.15)',   color:'#3a6a3a' },
  cancelled:  { bg:'rgba(160,60,60,0.12)',   color:'#a03c3c' },
}
function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.pending
  return (
    <span style={{ background:c.bg, color:c.color, padding:'3px 12px', borderRadius:20, fontSize:10, fontFamily:'Montserrat,sans-serif', letterSpacing:1, fontWeight:600, textTransform:'uppercase', whiteSpace:'nowrap' }}>
      {status}
    </span>
  )
}

// ── Stat card ────────────────────────────────────────────────
function StatCard({ label, value, sub, icon }) {
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
      style={{ background:'var(--beige)', borderRadius:8, padding:'24px 28px', boxShadow:'var(--shadow-sm)' }}>
      <div style={{ fontSize:28, marginBottom:10 }}>{icon}</div>
      <div style={{ fontFamily:'Cinzel,serif', fontSize:28, color:'var(--brown)', marginBottom:4, lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:9, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif', marginBottom:4 }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:'var(--text-light)', fontFamily:'Lora,serif', fontStyle:'italic' }}>{sub}</div>}
    </motion.div>
  )
}

// ── Order detail modal ───────────────────────────────────────
function OrderModal({ order, onClose, onStatusChange }) {
  const [status, setStatus] = useState(order.status)
  const [saving, setSaving] = useState(false)

  const saveStatus = async () => {
    setSaving(true)
    try {
      await apiFetch(`/api/admin/orders/${order.id}/status`, {
        method:'PUT', body:JSON.stringify({ status })
      })
      onStatusChange(order.id, status)
      onClose()
    } catch(e) { alert(e.message) }
    finally { setSaving(false) }
  }

  const addr = typeof order.shipping_address === 'string'
    ? JSON.parse(order.shipping_address || '{}')
    : (order.shipping_address || {})

  const items = typeof order.items === 'string'
    ? JSON.parse(order.items || '[]')
    : (order.items || [])

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}
      style={{ position:'fixed',inset:0,background:'rgba(47,37,35,0.65)',backdropFilter:'blur(8px)',zIndex:3000,display:'flex',alignItems:'center',justifyContent:'center',padding:20,overflowY:'auto' }}>
      <motion.div initial={{opacity:0,scale:0.94,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.96}}
        onClick={e=>e.stopPropagation()}
        style={{ background:'var(--ivory)',borderRadius:10,width:'100%',maxWidth:620,maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 80px rgba(47,37,35,0.3)' }}>

        {/* Header */}
        <div style={{ padding:'24px 28px',borderBottom:'1px solid rgba(106,78,66,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',background:'var(--beige)',borderRadius:'10px 10px 0 0' }}>
          <div>
            <div style={{ fontFamily:'Cinzel,serif',fontSize:16,color:'var(--brown-deeper)' }}>{order.order_number}</div>
            <div style={{ fontSize:10,color:'var(--text-light)',fontFamily:'Montserrat,sans-serif',marginTop:3,letterSpacing:1 }}>
              {new Date(order.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'})}
            </div>
          </div>
          <button onClick={onClose} style={{ background:'var(--ivory)',border:'none',width:32,height:32,borderRadius:'50%',fontSize:14,color:'var(--text-muted)',display:'flex',alignItems:'center',justifyContent:'center' }}>✕</button>
        </div>

        <div style={{ padding:'24px 28px' }}>
          {/* Customer */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:9,letterSpacing:3,color:'var(--gold)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:10 }}>Customer</div>
            <div style={{ fontSize:14,color:'var(--text-main)',fontFamily:'Lora,serif',marginBottom:2 }}>{order.customer_name || addr.fullName || 'Guest'}</div>
            <div style={{ fontSize:12,color:'var(--text-light)',fontFamily:'Montserrat,sans-serif' }}>{order.customer_email || '—'}</div>
          </div>

          {/* Shipping address */}
          {addr.address && (
            <div style={{ marginBottom:20,padding:'14px 16px',background:'var(--beige)',borderRadius:6 }}>
              <div style={{ fontSize:9,letterSpacing:3,color:'var(--gold)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:8 }}>Shipping Address</div>
              <div style={{ fontSize:13,color:'var(--text-muted)',fontFamily:'Lora,serif',lineHeight:1.7 }}>
                {addr.fullName}<br/>
                {addr.address}{addr.city ? `, ${addr.city}` : ''}{addr.state ? `, ${addr.state}` : ''}<br/>
                {addr.pinCode} · {addr.phone}
              </div>
            </div>
          )}

          {/* Items */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:9,letterSpacing:3,color:'var(--gold)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:10 }}>Items Ordered</div>
            {items.map((item,i) => (
              <div key={i} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(106,78,66,0.07)' }}>
                <div>
                  <div style={{ fontSize:13,color:'var(--text-main)',fontFamily:'Lora,serif' }}>{item.name}</div>
                  <div style={{ fontSize:10,color:'var(--text-light)',fontFamily:'Montserrat,sans-serif',marginTop:2 }}>Qty: {item.qty} × ₹{Number(item.price).toLocaleString('en-IN')}</div>
                </div>
                <div style={{ fontFamily:'Cinzel,serif',fontSize:14,color:'var(--brown)' }}>₹{Number(item.subtotal||item.price*item.qty).toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ padding:'14px 16px',background:'var(--beige)',borderRadius:6,marginBottom:20 }}>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
              <span style={{ fontSize:12,color:'var(--text-muted)',fontFamily:'Lora,serif' }}>Subtotal</span>
              <span style={{ fontSize:12,color:'var(--text-main)',fontFamily:'Cinzel,serif' }}>₹{Number(order.subtotal).toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:10 }}>
              <span style={{ fontSize:12,color:'var(--text-muted)',fontFamily:'Lora,serif' }}>Shipping</span>
              <span style={{ fontSize:12,color:order.shipping==0?'var(--brown)':'var(--text-main)',fontFamily:'Montserrat,sans-serif' }}>{order.shipping==0?'FREE':`₹${order.shipping}`}</span>
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',paddingTop:10,borderTop:'1px solid rgba(106,78,66,0.12)' }}>
              <span style={{ fontFamily:'Cinzel,serif',fontSize:14,color:'var(--brown-deeper)' }}>Total</span>
              <span style={{ fontFamily:'Cinzel,serif',fontSize:20,color:'var(--brown)' }}>₹{Number(order.total).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Payment */}
          {order.payment_id && (
            <div style={{ marginBottom:20,fontSize:11,color:'var(--text-light)',fontFamily:'Montserrat,sans-serif',letterSpacing:1 }}>
              PAYMENT ID: {order.payment_id}
            </div>
          )}

          {/* Status update */}
          <div>
            <div style={{ fontSize:9,letterSpacing:3,color:'var(--gold)',textTransform:'uppercase',fontFamily:'Montserrat,sans-serif',marginBottom:10 }}>Update Order Status</div>
            <div style={{ display:'flex',gap:10,flexWrap:'wrap' }}>
              {['pending','confirmed','packed','dispatched','delivered','cancelled'].map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  style={{ padding:'8px 16px',border:`1.5px solid ${status===s?'var(--brown)':'rgba(106,78,66,0.2)'}`,background:status===s?'var(--brown)':'transparent',color:status===s?'var(--ivory)':'var(--text-muted)',fontSize:9,letterSpacing:2,fontFamily:'Montserrat,sans-serif',borderRadius:4,textTransform:'uppercase',transition:'all 0.2s' }}>
                  {s}
                </button>
              ))}
            </div>
            <motion.button onClick={saveStatus} disabled={saving||status===order.status}
              style={{ marginTop:16,width:'100%',background:saving||status===order.status?'rgba(106,78,66,0.2)':'var(--brown)',border:'none',color:saving||status===order.status?'var(--text-light)':'var(--ivory)',padding:'13px',fontSize:10,letterSpacing:2,fontFamily:'Montserrat,sans-serif',fontWeight:600,borderRadius:5,transition:'background 0.3s' }}
              whileHover={(!saving&&status!==order.status)?{background:'var(--brown-dark)'}:{}}>
              {saving?'SAVING…':'SAVE STATUS'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Admin Page ──────────────────────────────────────────
export default function AdminPage() {
  const { user, isLoggedIn, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [tab,        setTab]        = useState('orders')
  const [stats,      setStats]      = useState(null)
  const [orders,     setOrders]     = useState([])
  const [users,      setUsers]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [search,     setSearch]     = useState('')

  // Auth guard
  useEffect(() => {
    if (!authLoading && !isLoggedIn) navigate('/login', { state:{ from:'/admin' }, replace:true })
    if (!authLoading && isLoggedIn && user?.role !== 'admin') navigate('/', { replace:true })
  }, [authLoading, isLoggedIn, user, navigate])

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const data = await apiFetch('/api/admin/stats')
      setStats(data)
    } catch(e) { setError(e.message) }
  }, [])

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const params = statusFilter !== 'all' ? `?status=${statusFilter}` : ''
      const data = await apiFetch(`/api/admin/orders${params}`)
      setOrders(data.orders || [])
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }, [statusFilter])

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await apiFetch('/api/admin/users')
      setUsers(data.users || [])
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    if (isLoggedIn && user?.role === 'admin') {
      fetchStats()
      if (tab === 'orders') fetchOrders()
      else if (tab === 'users') fetchUsers()
    }
  }, [tab, isLoggedIn, user, fetchOrders, fetchUsers, fetchStats])

  useEffect(() => { if (tab === 'orders') fetchOrders() }, [statusFilter])

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status:newStatus } : o))
    fetchStats()
  }

  const filteredOrders = orders.filter(o =>
    !search || o.order_number?.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_email?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredUsers = users.filter(u =>
    !search || u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  if (authLoading) return null
  if (!isLoggedIn || user?.role !== 'admin') return null

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{ paddingTop:76, minHeight:'100vh', background:'var(--ivory)' }}>

      {/* Header */}
      <div style={{ padding:'32px clamp(16px,4vw,48px) 24px', background:'var(--beige)', borderBottom:'1px solid rgba(106,78,66,0.1)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
          <div>
            <span className="section-tag">✦ Admin Panel</span>
            <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(22px,4vw,36px)', color:'var(--brown-deeper)' }}>
              Sugandh Shri Dashboard
            </h1>
          </div>
          <div style={{ fontSize:12, color:'var(--text-muted)', fontFamily:'Lora,serif' }}>
            Logged in as <strong style={{ color:'var(--brown)' }}>{user?.name}</strong>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ margin:'16px clamp(16px,4vw,48px)', padding:'12px 16px', background:'rgba(160,60,60,0.08)', border:'1px solid rgba(160,60,60,0.25)', borderRadius:6, fontSize:13, color:'rgba(140,50,50,1)', fontFamily:'Lora,serif' }}>
          {error}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div style={{ padding:'28px clamp(16px,4vw,48px)', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(clamp(140px,18vw,200px),1fr))', gap:16 }}>
          <StatCard icon="📦" label="Total Orders"   value={stats.totalOrders}                    sub={`${stats.pendingOrders} pending`}/>
          <StatCard icon="₹"  label="Total Revenue"  value={`₹${Number(stats.totalRevenue||0).toLocaleString('en-IN')}`} sub="all time"/>
          <StatCard icon="👥" label="Customers"      value={stats.totalUsers}                     sub="registered users"/>
          <StatCard icon="📅" label="Today's Orders" value={stats.todayOrders}                    sub={`₹${Number(stats.todayRevenue||0).toLocaleString('en-IN')} today`}/>
        </div>
      )}

      {/* Tabs */}
      <div style={{ padding:'0 clamp(16px,4vw,48px)', borderBottom:'1px solid rgba(106,78,66,0.1)', display:'flex', gap:0 }}>
        {[{id:'orders',label:'📦 Orders'},{id:'users',label:'👥 Customers'}].map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSearch('') }}
            style={{ padding:'14px 24px', border:'none', background:'transparent', borderBottom:`2px solid ${tab===t.id?'var(--brown)':'transparent'}`, color:tab===t.id?'var(--brown)':'var(--text-light)', fontFamily:'Montserrat,sans-serif', fontSize:11, letterSpacing:2, textTransform:'uppercase', fontWeight:tab===t.id?600:400, transition:'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding:'24px clamp(16px,4vw,48px)' }}>

        {/* Filters & Search */}
        <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder={tab==='orders'?'Search order number or customer…':'Search customer name or email…'}
            style={{ flex:1, minWidth:200, fontSize:13, padding:'10px 16px' }}/>

          {tab==='orders' && (
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {['all','pending','confirmed','packed','dispatched','delivered','cancelled'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  style={{ padding:'8px 14px', border:`1.5px solid ${statusFilter===s?'var(--brown)':'rgba(106,78,66,0.2)'}`, background:statusFilter===s?'var(--brown)':'transparent', color:statusFilter===s?'var(--ivory)':'var(--text-muted)', fontSize:9, letterSpacing:1, fontFamily:'Montserrat,sans-serif', borderRadius:4, textTransform:'uppercase', transition:'all 0.2s', whiteSpace:'nowrap' }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <button onClick={() => { fetchStats(); tab==='orders'?fetchOrders():fetchUsers() }}
            style={{ padding:'9px 18px', background:'var(--beige)', border:'1.5px solid rgba(106,78,66,0.2)', color:'var(--text-muted)', fontSize:11, fontFamily:'Montserrat,sans-serif', borderRadius:4, whiteSpace:'nowrap' }}>
            ↻ Refresh
          </button>
        </div>

        {/* Orders Table */}
        {tab === 'orders' && (
          loading ? (
            <div style={{ textAlign:'center', padding:60 }}>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:32, color:'rgba(106,78,66,0.1)', marginBottom:12 }}>✦</div>
              <p style={{ color:'var(--text-light)', fontFamily:'Lora,serif' }}>Loading orders…</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div style={{ textAlign:'center', padding:60 }}>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:32, color:'rgba(106,78,66,0.1)', marginBottom:12 }}>✦</div>
              <p style={{ color:'var(--text-light)', fontFamily:'Lora,serif' }}>No orders found</p>
            </div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:700 }}>
                <thead>
                  <tr style={{ borderBottom:'2px solid rgba(106,78,66,0.12)' }}>
                    {['Order #','Date','Customer','Items','Total','Status','Action'].map(h => (
                      <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:8, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif', fontWeight:600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order,i) => {
                    const items = typeof order.items==='string' ? JSON.parse(order.items||'[]') : (order.items||[])
                    return (
                      <motion.tr key={order.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}}
                        style={{ borderBottom:'1px solid rgba(106,78,66,0.06)', transition:'background 0.2s' }}
                        onMouseEnter={e=>e.currentTarget.style.background='var(--beige)'}
                        onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                        <td style={{ padding:'12px 14px', fontFamily:'Cinzel,serif', fontSize:12, color:'var(--brown)' }}>{order.order_number}</td>
                        <td style={{ padding:'12px 14px', fontSize:11, color:'var(--text-light)', fontFamily:'Montserrat,sans-serif', whiteSpace:'nowrap' }}>
                          {new Date(order.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                        </td>
                        <td style={{ padding:'12px 14px' }}>
                          <div style={{ fontSize:13, color:'var(--text-main)', fontFamily:'Lora,serif' }}>{order.customer_name||'Guest'}</div>
                          <div style={{ fontSize:10, color:'var(--text-light)', fontFamily:'Montserrat,sans-serif' }}>{order.customer_email||''}</div>
                        </td>
                        <td style={{ padding:'12px 14px', fontSize:12, color:'var(--text-muted)', fontFamily:'Lora,serif' }}>
                          {items.length} item{items.length!==1?'s':''}
                          {items[0] && <span style={{ color:'var(--text-light)',fontSize:10,display:'block' }}>{items[0].name}{items.length>1?` +${items.length-1} more`:''}</span>}
                        </td>
                        <td style={{ padding:'12px 14px', fontFamily:'Cinzel,serif', fontSize:14, color:'var(--brown)', whiteSpace:'nowrap' }}>
                          ₹{Number(order.total).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding:'12px 14px' }}><StatusBadge status={order.status}/></td>
                        <td style={{ padding:'12px 14px' }}>
                          <motion.button onClick={() => setSelectedOrder(order)}
                            style={{ background:'var(--brown)', color:'var(--ivory)', border:'none', padding:'7px 16px', fontSize:9, letterSpacing:2, fontFamily:'Montserrat,sans-serif', borderRadius:4, whiteSpace:'nowrap' }}
                            whileHover={{ background:'var(--brown-dark)' }}>
                            VIEW
                          </motion.button>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* Users Table */}
        {tab === 'users' && (
          loading ? (
            <div style={{ textAlign:'center', padding:60 }}>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:32, color:'rgba(106,78,66,0.1)', marginBottom:12 }}>✦</div>
              <p style={{ color:'var(--text-light)', fontFamily:'Lora,serif' }}>Loading customers…</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ textAlign:'center', padding:60 }}>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:32, color:'rgba(106,78,66,0.1)', marginBottom:12 }}>✦</div>
              <p style={{ color:'var(--text-light)', fontFamily:'Lora,serif' }}>No customers yet</p>
            </div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:600 }}>
                <thead>
                  <tr style={{ borderBottom:'2px solid rgba(106,78,66,0.12)' }}>
                    {['Customer','Email','Phone','Orders','Total Spent','Joined','Role'].map(h => (
                      <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:8, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif', fontWeight:600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u,i) => (
                    <motion.tr key={u.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}}
                      style={{ borderBottom:'1px solid rgba(106,78,66,0.06)', transition:'background 0.2s' }}
                      onMouseEnter={e=>e.currentTarget.style.background='var(--beige)'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding:'12px 14px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--brown)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Cinzel,serif', fontSize:11, color:'var(--ivory)', flexShrink:0 }}>
                            {u.name?.split(' ').map(w=>w[0]).join('').slice(0,2)}
                          </div>
                          <span style={{ fontSize:13, color:'var(--text-main)', fontFamily:'Lora,serif' }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:'12px 14px', fontSize:12, color:'var(--text-muted)', fontFamily:'Montserrat,sans-serif' }}>{u.email}</td>
                      <td style={{ padding:'12px 14px', fontSize:12, color:'var(--text-light)', fontFamily:'Montserrat,sans-serif' }}>{u.phone||'—'}</td>
                      <td style={{ padding:'12px 14px', fontSize:13, color:'var(--text-main)', fontFamily:'Cinzel,serif', textAlign:'center' }}>{u.order_count||0}</td>
                      <td style={{ padding:'12px 14px', fontFamily:'Cinzel,serif', fontSize:13, color:'var(--brown)' }}>
                        {u.total_spent ? `₹${Number(u.total_spent).toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td style={{ padding:'12px 14px', fontSize:11, color:'var(--text-light)', fontFamily:'Montserrat,sans-serif', whiteSpace:'nowrap' }}>
                        {new Date(u.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                      </td>
                      <td style={{ padding:'12px 14px' }}>
                        <span style={{ background: u.role==='admin'?'rgba(198,167,90,0.2)':'rgba(106,78,66,0.1)', color: u.role==='admin'?'var(--gold)':'var(--text-light)', padding:'3px 10px', borderRadius:20, fontSize:9, fontFamily:'Montserrat,sans-serif', letterSpacing:1, textTransform:'uppercase' }}>
                          {u.role}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* Order detail modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onStatusChange={handleStatusChange}/>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
