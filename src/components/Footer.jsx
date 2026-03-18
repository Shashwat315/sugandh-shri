// Footer — deep earth luxury, fully responsive
import { motion } from 'framer-motion'
import { Link }   from 'react-router-dom'

const cols = {
  Shop:    [{l:'Attars',to:'/attars'},{l:'Perfumes',to:'/perfumes'},{l:'Essential Oils',to:'/essential-oils'},{l:'Gift Sets',to:'/gift-sets'},{l:'Scent Quiz',to:'/scent-quiz'}],
  House:   [{l:'Our Heritage',to:'/about'},{l:'The Craft',to:'/about'},{l:'Wholesale',to:'/contact'},{l:'Press & Media',to:'/contact'}],
  Support: [{l:'Track My Order',to:'/track-order'},{l:'Contact Us',to:'/contact'},{l:'FAQ',to:'/contact'},{l:'Return & Refund Policy',to:'/return-policy'},{l:'Shipping Policy',to:'/return-policy'}],
}

export default function Footer() {
  return (
    <footer style={{ background:'var(--brown-deeper)', color:'var(--ivory)' }}>
      {/* Newsletter band */}
      <div style={{ borderBottom:'1px solid rgba(245,241,233,0.07)', padding:'clamp(28px,4vw,48px) clamp(16px,5vw,64px)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:24, flexWrap:'wrap', background:'rgba(0,0,0,0.12)' }}>
        <div>
          <div style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(14px,2vw,18px)', color:'var(--ivory)', marginBottom:6 }}>Join the House of Sugandh Shri</div>
          <p style={{ fontSize:12, color:'rgba(245,241,233,0.5)', fontFamily:'Lora,serif', fontStyle:'italic' }}>New launches, rare finds, and heritage stories.</p>
        </div>
        <Link to="/contact">
          <motion.button style={{ border:'1.5px solid rgba(198,167,90,0.5)', color:'var(--gold)', background:'transparent', padding:'10px 24px', fontSize:9, letterSpacing:3, fontFamily:'Montserrat,sans-serif', borderRadius:4, whiteSpace:'nowrap' }}
            whileHover={{ background:'rgba(198,167,90,0.1)', borderColor:'var(--gold)' }}>SUBSCRIBE →</motion.button>
        </Link>
      </div>

      {/* Main */}
      <div style={{ padding:'clamp(40px,5vw,56px) clamp(16px,5vw,64px) clamp(28px,3vw,40px)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(clamp(150px,18vw,200px),1fr))', gap:'clamp(28px,4vw,48px)', marginBottom:'clamp(28px,4vw,48px)' }}>
          {/* Brand col */}
          <div style={{ gridColumn:'span 1' }}>
            <Link to="/" style={{ textDecoration:'none' }}>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(13px,1.5vw,17px)', color:'var(--ivory)', letterSpacing:'clamp(2px,0.4vw,4px)', fontWeight:600, marginBottom:4 }}>SUGANDH SHRI</div>
              <div style={{ fontSize:'clamp(6px,0.6vw,7px)', letterSpacing:'clamp(2px,0.5vw,5px)', color:'var(--gold)', fontFamily:'Montserrat,sans-serif', marginBottom:18 }}>EST. 1887 · KANNAUJ · INDIA</div>
            </Link>
            <p style={{ fontSize:12, color:'rgba(245,241,233,0.45)', lineHeight:1.85, fontFamily:'Lora,serif', maxWidth:220, marginBottom:20, fontStyle:'italic' }}>
              Preserving the sacred art of Indian perfumery since 1887.
            </p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {['IN','FB','PT','YT'].map(s=>(
                <motion.div key={s} style={{ width:30, height:30, border:'1px solid rgba(245,241,233,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(245,241,233,0.4)', fontSize:8, fontWeight:700, fontFamily:'Montserrat,sans-serif', borderRadius:3 }}
                  whileHover={{ borderColor:'var(--gold)', color:'var(--gold)' }}>{s}</motion.div>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(cols).map(([title,links])=>(
            <div key={title}>
              <div style={{ fontSize:9, letterSpacing:3, color:'var(--gold)', textTransform:'uppercase', marginBottom:18, fontFamily:'Montserrat,sans-serif', fontWeight:600 }}>{title}</div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {links.map(({l,to})=>(
                  <li key={l}>
                    <Link to={to} style={{ fontSize:12, color:'rgba(245,241,233,0.45)', fontFamily:'Lora,serif', transition:'color 0.2s' }}
                      onMouseEnter={e=>e.target.style.color='rgba(245,241,233,0.85)'}
                      onMouseLeave={e=>e.target.style.color='rgba(245,241,233,0.45)'}>{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div style={{ borderTop:'1px solid rgba(245,241,233,0.06)', paddingTop:24, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:20, marginBottom:24 }}>
          {[{label:'Distillery',value:'Near Flower Mandi, Kannauj, U.P. 209726'},{label:'Phone',value:'+91 98765 43210'},{label:'Email',value:'care@sugandhshri.com'}].map(item=>(
            <div key={item.label}>
              <div style={{ fontSize:8, letterSpacing:2, color:'var(--gold)', textTransform:'uppercase', marginBottom:4, fontFamily:'Montserrat,sans-serif' }}>{item.label}</div>
              <div style={{ fontSize:11, color:'rgba(245,241,233,0.45)', fontFamily:'Lora,serif' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(245,241,233,0.05)', paddingTop:18, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div style={{ fontSize:9, color:'rgba(245,241,233,0.2)', fontFamily:'Montserrat,sans-serif', letterSpacing:1 }}>
            © 2025 SUGANDH SHRI ATTAR MAHAL · ALL RIGHTS RESERVED
          </div>
          <div style={{ display:'flex', gap:'clamp(10px,2vw,20px)', flexWrap:'wrap' }}>
            {[['Privacy','/contact'],['Terms','/contact'],['Returns','/return-policy'],['Sitemap','/']].map(([l,to])=>(
              <Link key={l} to={to} style={{ fontSize:9, color:'rgba(245,241,233,0.2)', fontFamily:'Montserrat,sans-serif', letterSpacing:0.5, transition:'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='rgba(245,241,233,0.55)'}
                onMouseLeave={e=>e.target.style.color='rgba(245,241,233,0.2)'}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
