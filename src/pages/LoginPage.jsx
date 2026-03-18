// LoginPage — warm sandalwood luxury theme
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, isLoggedIn, loading, error, clearError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from     = location.state?.from || '/'
  const [form, setForm]     = useState({ email:'', password:'' })
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused]   = useState('')

  useEffect(() => { if (isLoggedIn) navigate(from, { replace:true }) }, [isLoggedIn])
  useEffect(() => { clearError() }, []) // eslint-disable-line

  const set = k => e => setForm(f=>({...f,[k]:e.target.value}))

  const handleSubmit = async e => {
    e.preventDefault()
    const ok = await login({ email:form.email, password:form.password })
    if (ok) navigate(from, { replace:true })
  }

  const inp = (key, type='text', placeholder='') => ({
    value: form[key], type: showPass && key==='password' ? 'text' : type,
    onChange: set(key), onFocus:()=>setFocused(key), onBlur:()=>setFocused(''),
    placeholder,
    style:{
      width:'100%', background:'var(--ivory)', fontFamily:'Lora,serif',
      border:`1.5px solid ${focused===key?'var(--brown)':'rgba(106,78,66,0.2)'}`,
      padding:'13px 16px', color:'var(--text-main)', fontSize:14,
      borderRadius:5, outline:'none', transition:'border-color 0.3s',
      boxShadow: focused===key?'0 0 0 3px rgba(106,78,66,0.08)':'none',
    }
  })

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}
      style={{minHeight:'100vh',background:'linear-gradient(135deg,var(--ivory) 0%,var(--beige) 100%)',display:'flex',alignItems:'center',justifyContent:'center',padding:'100px 24px 40px',position:'relative'}}>

      {/* Background image */}
      <div style={{position:'absolute',inset:0,overflow:'hidden',zIndex:0}}>
        <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1600&q=80"
          alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.06}}/>
      </div>

      <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.7,ease:[0.25,0.46,0.45,0.94]}}
        style={{width:'100%',maxWidth:440,background:'var(--ivory)',borderRadius:10,padding:'48px 40px',boxShadow:'0 20px 60px rgba(47,37,35,0.14)',position:'relative',zIndex:1}}>

        {/* Top gold rule */}
        <div style={{height:2,background:'linear-gradient(90deg,transparent,var(--gold),transparent)',marginBottom:36,borderRadius:1}}/>

        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:32}}>
          <Link to="/" style={{textDecoration:'none'}}>
            <div style={{fontFamily:'Cinzel,serif',fontSize:20,color:'var(--brown)',letterSpacing:4,fontWeight:600}}>SUGANDH SHRI</div>
            <div style={{fontSize:8,letterSpacing:5,color:'var(--gold)',fontFamily:'Montserrat,sans-serif',marginTop:3}}>EST. 1887 · KANNAUJ</div>
          </Link>
        </div>

        <h1 style={{fontFamily:'Cinzel,serif',fontSize:22,color:'var(--brown-deeper)',marginBottom:6,textAlign:'center'}}>Welcome Back</h1>
        <p style={{fontSize:12,color:'var(--text-light)',textAlign:'center',letterSpacing:2,marginBottom:28,fontFamily:'Montserrat,sans-serif',textTransform:'uppercase'}}>Sign in to your account</p>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{background:'rgba(180,60,60,0.07)',border:'1px solid rgba(180,60,60,0.25)',padding:'12px 16px',marginBottom:20,fontSize:13,color:'rgba(160,60,60,1)',fontFamily:'Lora,serif',borderRadius:5}}>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:9,letterSpacing:2,color:'var(--text-muted)',textTransform:'uppercase',marginBottom:8,fontFamily:'Montserrat,sans-serif'}}>Email Address</div>
            <input {...inp('email','email','your@email.com')} required autoComplete="email"/>
          </div>

          {/* Password */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:9,letterSpacing:2,color:'var(--text-muted)',textTransform:'uppercase',marginBottom:8,fontFamily:'Montserrat,sans-serif'}}>Password</div>
            <div style={{position:'relative'}}>
              <input {...inp('password','password','Your password')} required autoComplete="current-password" style={{...inp('password','password').style,paddingRight:48}}/>
              <button type="button" onClick={()=>setShowPass(s=>!s)}
                style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'transparent',border:'none',color:'var(--text-light)',fontSize:14}}>
                {showPass?'🙈':'👁'}
              </button>
            </div>
          </div>

          <div style={{textAlign:'right',marginBottom:24}}>
            <Link to="/contact" style={{fontSize:11,color:'var(--text-light)',fontFamily:'Lora,serif',fontStyle:'italic'}}
              onMouseEnter={e=>e.target.style.color='var(--brown)'}
              onMouseLeave={e=>e.target.style.color='var(--text-light)'}>Forgot password?</Link>
          </div>

          <motion.button type="submit" disabled={loading||!form.email||!form.password}
            style={{width:'100%',background:loading||!form.email||!form.password?'rgba(106,78,66,0.25)':'var(--brown)',border:'none',color:loading||!form.email||!form.password?'var(--text-light)':'var(--ivory)',padding:'15px',fontSize:10,letterSpacing:3,fontFamily:'Montserrat,sans-serif',fontWeight:600,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',gap:10,transition:'background 0.3s'}}
            whileHover={(!loading&&form.email&&form.password)?{background:'var(--brown-dark)',boxShadow:'0 6px 24px rgba(106,78,66,0.3)'}:{}} whileTap={(!loading&&form.email&&form.password)?{scale:0.98}:{}}>
            {loading ? (
              <>
                <motion.span animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:'linear'}}
                  style={{width:12,height:12,border:'2px solid rgba(245,241,233,0.3)',borderTopColor:'var(--ivory)',borderRadius:'50%',display:'inline-block'}}/>
                SIGNING IN…
              </>
            ) : 'SIGN IN →'}
          </motion.button>
        </form>

        <div style={{display:'flex',alignItems:'center',gap:16,margin:'24px 0'}}>
          <div style={{flex:1,height:1,background:'rgba(106,78,66,0.1)'}}/><span style={{fontSize:9,color:'var(--text-light)',fontFamily:'Montserrat,sans-serif',letterSpacing:2}}>OR</span><div style={{flex:1,height:1,background:'rgba(106,78,66,0.1)'}}/>
        </div>

        <p style={{textAlign:'center',fontSize:13,color:'var(--text-muted)',fontFamily:'Lora,serif'}}>
          Don't have an account?{' '}
          <Link to="/signup" state={{from}} style={{color:'var(--brown)',fontWeight:600,textDecoration:'none'}}
            onMouseEnter={e=>e.target.style.textDecoration='underline'}
            onMouseLeave={e=>e.target.style.textDecoration='none'}>Create one</Link>
        </p>

        <div style={{height:2,background:'linear-gradient(90deg,transparent,var(--gold),transparent)',marginTop:36,borderRadius:1}}/>
      </motion.div>
    </motion.div>
  )
}
