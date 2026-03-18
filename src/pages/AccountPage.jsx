// ============================================================
// AccountPage.jsx  /account
// User dashboard — profile, orders, wishlist summary.
// Protected: redirects to /login if not logged in.
// ============================================================
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  if (!isLoggedIn) {
    navigate('/login', { state: { from: '/account' }, replace: true })
    return null
  }
  return children
}

export default function AccountPage() {
  return <ProtectedRoute><AccountDashboard /></ProtectedRoute>
}

function AccountDashboard() {
  const { user, logout, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab]     = useState('profile')
  const [editing, setEditing] = useState(false)
  const [form, setForm]   = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [saved, setSaved]  = useState(false)

  const handleLogout = () => { logout(); navigate('/') }

  const handleSave = () => {
    updateProfile({ name: form.name, phone: form.phone })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const tabs = ['profile', 'orders', 'addresses']

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--ivory)' }}>

      {/* Header */}
      <div style={{ padding: '50px 60px 30px', borderBottom: '1px solid rgba(198,167,90,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 9, letterSpacing: 5, color: '#C6A75A', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>✦ Your Account</span>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px,4vw,42px)', color: 'var(--text-main)', marginBottom: 6 }}>
              Welcome, {user?.name?.split(' ')[0]}
            </h1>
            <p style={{ fontSize: 11, color: '#4A3A34', letterSpacing: 1 }}>{user?.email}</p>
          </div>
          {/* Avatar */}
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(198,167,90,0.1)', border: '1px solid rgba(198,167,90,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cinzel, serif', fontSize: 20, color: '#C6A75A' }}>
            {user?.avatar || user?.name?.slice(0,2).toUpperCase()}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '60vh' }}>
        {/* Sidebar */}
        <aside style={{ borderRight: '1px solid rgba(198,167,90,0.08)', padding: '32px 0' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ width: '100%', textAlign: 'left', padding: '14px 32px', background: 'transparent', border: 'none', color: tab === t ? '#C6A75A' : '#4A3A34', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', borderLeft: `2px solid ${tab === t ? '#C6A75A' : 'transparent'}`, transition: 'all 0.2s' }}>
              {t}
            </button>
          ))}
          <div style={{ padding: '20px 32px 0', marginTop: 16, borderTop: '1px solid rgba(198,167,90,0.06)' }}>
            <button onClick={handleLogout}
              style={{ background: 'transparent', border: 'none', color: '#4A3A34', fontSize: 10, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif', textAlign: 'left', padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#C6A75A'}
              onMouseLeave={e => e.target.style.color = '#4A3A34'}>
              SIGN OUT →
            </button>
          </div>
        </aside>

        {/* Content */}
        <div style={{ padding: '40px 60px' }}>
          <AnimatePresence mode="wait">

            {/* Profile tab */}
            {tab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: 'var(--text-main)' }}>Profile Details</h2>
                  {!editing ? (
                    <motion.button onClick={() => setEditing(true)}
                      style={{ border: '1px solid rgba(198,167,90,0.3)', color: '#C6A75A', background: 'transparent', padding: '8px 20px', fontSize: 9, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif' }}
                      whileHover={{ background: 'rgba(198,167,90,0.07)', borderColor: '#C6A75A' }}>
                      EDIT PROFILE
                    </motion.button>
                  ) : null}
                </div>

                {saved && (
                  <div style={{ background: 'rgba(198,167,90,0.08)', border: '1px solid rgba(198,167,90,0.3)', padding: '12px 16px', marginBottom: 24, fontSize: 11, color: '#C6A75A', fontFamily: 'Montserrat, sans-serif' }}>
                    ✓ Profile updated successfully
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', value: editing ? form.name : user?.name },
                    { label: 'Email Address', key: 'email', type: 'email', value: user?.email, disabled: true },
                    { label: 'Phone Number', key: 'phone', type: 'tel', value: editing ? form.phone : (user?.phone || '—') },
                    { label: 'Member Since', key: 'joined', type: 'text', value: new Date(user?.joinedAt).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' }), disabled: true },
                  ].map(field => (
                    <div key={field.key}>
                      <div style={{ fontSize: 8, letterSpacing: 2, color: '#6A4E42', textTransform: 'uppercase', marginBottom: 8 }}>{field.label}</div>
                      {editing && !field.disabled ? (
                        <input type={field.type} value={form[field.key] || ''} onChange={e => setForm(f => ({...f, [field.key]: e.target.value}))}
                          style={{ width: '100%', background: 'rgba(198,167,90,0.04)', border: '1px solid rgba(198,167,90,0.25)', padding: '11px 14px', color: 'var(--text-main)', fontSize: 13, fontFamily: 'Montserrat, sans-serif', outline: 'none' }} />
                      ) : (
                        <div style={{ fontSize: 13, color: field.disabled ? '#3A2C24' : '#F5F1E9', padding: '11px 0', borderBottom: '1px solid rgba(198,167,90,0.06)' }}>{field.value}</div>
                      )}
                    </div>
                  ))}
                </div>

                {editing && (
                  <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                    <motion.button onClick={handleSave}
                      style={{ background: '#C6A75A', border: 'none', color: '#0B0B0B', padding: '12px 32px', fontSize: 9, letterSpacing: 3, fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                      whileHover={{ background: '#E8D5A3' }}>
                      SAVE CHANGES
                    </motion.button>
                    <motion.button onClick={() => { setEditing(false); setForm({ name: user?.name, phone: user?.phone }) }}
                      style={{ background: 'transparent', border: '1px solid rgba(198,167,90,0.2)', color: '#6A4E42', padding: '12px 28px', fontSize: 9, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif' }}
                      whileHover={{ borderColor: 'rgba(198,167,90,0.5)' }}>
                      CANCEL
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Orders tab */}
            {tab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: 'var(--text-main)', marginBottom: 32 }}>Order History</h2>
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 48, color: 'rgba(198,167,90,0.1)', marginBottom: 20 }}>✦</div>
                  <p style={{ fontSize: 13, color: '#4A3A34', marginBottom: 24 }}>You haven't placed any orders yet.</p>
                  <Link to="/shop">
                    <motion.button style={{ border: '1px solid rgba(198,167,90,0.3)', color: '#C6A75A', background: 'transparent', padding: '12px 32px', fontSize: 9, letterSpacing: 3, fontFamily: 'Montserrat, sans-serif' }}
                      whileHover={{ background: 'rgba(198,167,90,0.07)', borderColor: '#C6A75A' }}>
                      EXPLORE FRAGRANCES →
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Addresses tab */}
            {tab === 'addresses' && (
              <motion.div key="addresses" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: 'var(--text-main)', marginBottom: 32 }}>Saved Addresses</h2>
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 48, color: 'rgba(198,167,90,0.1)', marginBottom: 20 }}>⊕</div>
                  <p style={{ fontSize: 13, color: '#4A3A34', marginBottom: 24 }}>No saved addresses yet. Addresses are saved automatically when you checkout.</p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
