// ============================================================
// SignupPage.jsx  /signup
// Luxury registration page with full validation.
// ============================================================
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

function PasswordStrength({ password }) {
  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'One uppercase letter',  pass: /[A-Z]/.test(password) },
    { label: 'One number',            pass: /[0-9]/.test(password) },
  ]
  if (!password) return null
  return (
    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {checks.map(c => (
        <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: c.pass ? '#C6A75A' : '#4A3A34' }}>{c.pass ? '✓' : '○'}</span>
          <span style={{ fontSize: 9, color: c.pass ? '#C6A75A' : '#4A3A34', letterSpacing: 0.5 }}>{c.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function SignupPage() {
  const { signup, isLoggedIn, loading, error, clearError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from     = location.state?.from || '/'

  const [form, setForm]         = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPass, setShowPass]   = useState(false)
  const [focused, setFocused]     = useState('')
  const [agree, setAgree]         = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => { if (isLoggedIn) navigate(from, { replace: true }) }, [isLoggedIn, navigate, from])
  useEffect(() => { clearError() }, []) // eslint-disable-line

  const set = key => e => {
    setForm(f => ({ ...f, [key]: e.target.value }))
    if (fieldErrors[key]) setFieldErrors(fe => ({ ...fe, [key]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim())                   errs.name     = 'Full name is required'
    if (!form.email.includes('@'))           errs.email    = 'Enter a valid email'
    if (form.phone && !/^\+?[\d\s-]{8,}$/.test(form.phone)) errs.phone = 'Enter a valid phone number'
    if (form.password.length < 8)            errs.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm)      errs.confirm  = 'Passwords do not match'
    if (!agree)                              errs.agree    = 'You must accept the terms'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return
    const ok = await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password })
    if (ok) navigate(from, { replace: true })
  }

  const inputStyle = key => ({
    width: '100%',
    background: 'rgba(198,167,90,0.04)',
    border: `1px solid ${fieldErrors[key] ? 'rgba(220,80,80,0.5)' : focused === key ? 'rgba(198,167,90,0.5)' : 'rgba(198,167,90,0.15)'}`,
    padding: '13px 16px',
    color: 'var(--text-main)',
    fontSize: 13,
    fontFamily: 'Montserrat, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s',
    letterSpacing: 0.5,
  })

  const canSubmit = form.name && form.email && form.password && form.confirm && agree && !loading

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', background: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 40px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(198,167,90,0.05) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: '100%', maxWidth: 480, background: 'var(--beige)', border: '1px solid rgba(198,167,90,0.12)', padding: '48px 44px' }}
      >
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C6A75A, transparent)', marginBottom: 36 }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 20, color: '#C6A75A', letterSpacing: 4, fontWeight: 600 }}>SUGANDH SHRI</div>
            <div style={{ fontSize: 8, letterSpacing: 5, color: '#4A3A34', fontFamily: 'Montserrat, sans-serif', marginTop: 4 }}>EST. 1887 · KANNAUJ</div>
          </Link>
        </div>

        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: 'var(--text-main)', marginBottom: 6, textAlign: 'center' }}>Create Account</h1>
        <p style={{ fontSize: 11, color: '#4A3A34', textAlign: 'center', letterSpacing: 2, marginBottom: 32 }}>JOIN THE HOUSE OF SUGANDH SHRI</p>

        {/* Server error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ background: 'rgba(220,80,80,0.08)', border: '1px solid rgba(220,80,80,0.3)', padding: '12px 16px', marginBottom: 20, fontSize: 12, color: 'rgba(220,120,120,1)', fontFamily: 'Montserrat, sans-serif' }}>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 8, letterSpacing: 2, color: focused === 'name' ? '#C6A75A' : '#6A4E42', textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.3s' }}>Full Name *</div>
            <input type="text" value={form.name} onChange={set('name')}
              onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
              placeholder="Priya Sharma" required autoComplete="name" style={inputStyle('name')} />
            {fieldErrors.name && <div style={{ fontSize: 10, color: 'rgba(220,100,100,0.9)', marginTop: 5 }}>{fieldErrors.name}</div>}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 8, letterSpacing: 2, color: focused === 'email' ? '#C6A75A' : '#6A4E42', textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.3s' }}>Email Address *</div>
            <input type="email" value={form.email} onChange={set('email')}
              onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
              placeholder="your@email.com" required autoComplete="email" style={inputStyle('email')} />
            {fieldErrors.email && <div style={{ fontSize: 10, color: 'rgba(220,100,100,0.9)', marginTop: 5 }}>{fieldErrors.email}</div>}
          </div>

          {/* Phone (optional) */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 8, letterSpacing: 2, color: focused === 'phone' ? '#C6A75A' : '#6A4E42', textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.3s' }}>Phone Number <span style={{ color: '#3A2C24' }}>(Optional)</span></div>
            <input type="tel" value={form.phone} onChange={set('phone')}
              onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
              placeholder="+91 98765 43210" autoComplete="tel" style={inputStyle('phone')} />
            {fieldErrors.phone && <div style={{ fontSize: 10, color: 'rgba(220,100,100,0.9)', marginTop: 5 }}>{fieldErrors.phone}</div>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 8, letterSpacing: 2, color: focused === 'password' ? '#C6A75A' : '#6A4E42', textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.3s' }}>Password *</div>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')}
                onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                placeholder="Min. 8 characters" required autoComplete="new-password"
                style={{ ...inputStyle('password'), paddingRight: 48 }} />
              <button type="button" onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#4A3A34', fontSize: 14 }}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            <PasswordStrength password={form.password} />
            {fieldErrors.password && <div style={{ fontSize: 10, color: 'rgba(220,100,100,0.9)', marginTop: 5 }}>{fieldErrors.password}</div>}
          </div>

          {/* Confirm password */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 8, letterSpacing: 2, color: focused === 'confirm' ? '#C6A75A' : '#6A4E42', textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.3s' }}>Confirm Password *</div>
            <input type="password" value={form.confirm} onChange={set('confirm')}
              onFocus={() => setFocused('confirm')} onBlur={() => setFocused('')}
              placeholder="Repeat your password" required autoComplete="new-password" style={inputStyle('confirm')} />
            {fieldErrors.confirm && <div style={{ fontSize: 10, color: 'rgba(220,100,100,0.9)', marginTop: 5 }}>{fieldErrors.confirm}</div>}
          </div>

          {/* Terms checkbox */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'none' }}>
              <div onClick={() => setAgree(a => !a)}
                style={{ width: 16, height: 16, border: `1px solid ${agree ? '#C6A75A' : 'rgba(198,167,90,0.3)'}`, background: agree ? 'rgba(198,167,90,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all 0.2s', cursor: 'none' }}>
                {agree && <span style={{ fontSize: 10, color: '#C6A75A' }}>✓</span>}
              </div>
              <span style={{ fontSize: 11, color: '#4A3A34', lineHeight: 1.6 }}>
                I agree to the{' '}
                <Link to="/contact" style={{ color: '#C6A75A', textDecoration: 'none' }}>Terms of Service</Link>
                {' '}and{' '}
                <Link to="/contact" style={{ color: '#C6A75A', textDecoration: 'none' }}>Privacy Policy</Link>
              </span>
            </label>
            {fieldErrors.agree && <div style={{ fontSize: 10, color: 'rgba(220,100,100,0.9)', marginTop: 5 }}>{fieldErrors.agree}</div>}
          </div>

          {/* Submit */}
          <motion.button type="submit" disabled={!canSubmit}
            style={{
              width: '100%', background: canSubmit ? '#C6A75A' : 'rgba(198,167,90,0.2)',
              border: 'none', color: canSubmit ? '#0B0B0B' : '#4A3A34',
              padding: '15px', fontSize: 10, letterSpacing: 3,
              fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
            whileHover={canSubmit ? { background: '#E8D5A3' } : {}}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ width: 12, height: 12, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#0B0B0B', borderRadius: '50%', display: 'inline-block' }} />
                CREATING ACCOUNT…
              </>
            ) : 'CREATE ACCOUNT →'}
          </motion.button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(198,167,90,0.1)' }} />
          <span style={{ fontSize: 9, color: '#3A2C24', letterSpacing: 2 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(198,167,90,0.1)' }} />
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#4A3A34' }}>
          Already have an account?{' '}
          <Link to="/login" state={{ from }} style={{ color: '#C6A75A', textDecoration: 'none', fontWeight: 500, letterSpacing: 1 }}>Sign in</Link>
        </p>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C6A75A, transparent)', marginTop: 36 }} />
      </motion.div>
    </motion.div>
  )
}
