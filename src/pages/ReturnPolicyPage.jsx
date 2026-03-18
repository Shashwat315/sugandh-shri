// ============================================================
// ReturnPolicyPage.jsx  /return-policy
// Complete returns, refund and shipping policy
// ============================================================
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '30-Day Return Policy',
    icon: '↩',
    content: [
      'We want you to be completely satisfied with your Sugandh Shri purchase. If for any reason you are not happy, we accept returns within 30 days of delivery, provided the product is unused, unopened, and in its original packaging with all seals intact.',
      'To initiate a return, please email us at care@sugandhshri.com with your order number and reason for return. Our team will respond within 24 hours with return instructions.',
      'Please note: Due to the personal and intimate nature of fragrance products, we cannot accept returns on opened or used items unless the product is damaged or defective upon arrival.',
    ],
  },
  {
    title: 'Refund Process',
    icon: '₹',
    content: [
      'Once we receive your returned item and verify its condition, we will process your refund within 5–7 business days. Refunds are issued to the original payment method.',
      'For Razorpay payments: Refunds will appear in your bank account within 5–7 business days after we initiate the process.',
      'For UPI payments: Refunds are typically credited within 2–3 business days.',
      'Original shipping charges are non-refundable unless the return is due to our error (wrong item shipped, damaged product, etc.).',
    ],
  },
  {
    title: 'Damaged or Defective Products',
    icon: '⚠',
    content: [
      'We take exceptional care in packaging every order. However, if your product arrives damaged or defective, please contact us within 48 hours of delivery.',
      'Send photographs of the damaged product and packaging to care@sugandhshri.com. We will arrange a replacement or full refund at no cost to you, including return shipping.',
      'We ask that you retain the original packaging until the matter is resolved, as it helps us file claims with our shipping partners.',
    ],
  },
  {
    title: 'Exchange Policy',
    icon: '⇄',
    content: [
      'We offer exchanges for unopened products within 30 days of delivery. If you would like to exchange one fragrance for another, please contact us and we will guide you through the process.',
      'Exchange shipping charges are borne by the customer unless the exchange is due to our error.',
      'Exchange products are subject to availability at the time of the exchange request.',
    ],
  },
  {
    title: 'Shipping Policy',
    icon: '📦',
    content: [
      'We offer free shipping on all orders above ₹1,999 within India. Orders below ₹1,999 are charged ₹149 for shipping.',
      'Domestic orders are typically dispatched within 1–2 business days and delivered within 3–7 business days, depending on location.',
      'International orders are shipped via tracked courier services and typically arrive within 7–14 business days. International customers are responsible for any customs duties or taxes in their country.',
      'We ship to over 40 countries. All orders include a tracking number sent via email upon dispatch.',
    ],
  },
  {
    title: 'Non-Returnable Items',
    icon: '✗',
    content: [
      'Opened or used fragrance products cannot be returned due to hygiene and quality control reasons.',
      'Products with broken seals, tampered packaging, or missing labels are not eligible for return.',
      'Custom-engraved or personalised items cannot be returned or exchanged.',
      'Gift sets that have been partially opened or where individual items have been used are not eligible for full returns.',
    ],
  },
  {
    title: 'How to Contact Us',
    icon: '✉',
    content: [
      'Email: care@sugandhshri.com — We respond to all return and refund queries within 24 hours on working days.',
      'WhatsApp: +91 98765 43210 — Available 10am–7pm IST, Monday to Saturday.',
      'Please have your order number ready when you contact us. You can find it in your order confirmation email.',
    ],
  },
]

export default function ReturnPolicyPage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}
      style={{paddingTop:100, background:'var(--ivory)', minHeight:'100vh'}}>

      {/* Header */}
      <div style={{padding:'64px 64px 48px',borderBottom:'1px solid rgba(106,78,66,0.1)',background:'var(--beige)'}}>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.8}}>
          <span className="section-tag">✦ Customer Care</span>
          <h1 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(28px,4vw,48px)',color:'var(--brown-deeper)',marginBottom:16}}>
            Return, Refund & Shipping Policy
          </h1>
          <p style={{fontSize:15,color:'var(--text-muted)',lineHeight:1.85,maxWidth:600,fontFamily:'Lora,serif',marginBottom:16}}>
            At Sugandh Shri, we stand behind the quality of every product we make. If something is not right, we will make it right — no questions asked.
          </p>
          <div style={{width:48,height:1,background:'var(--gold)'}}/>
        </motion.div>
      </div>

      {/* Quick summary cards */}
      <div style={{padding:'48px 64px',background:'var(--ivory)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,marginBottom:64}}>
          {[
            { icon:'↩', title:'30-Day Returns', desc:'On unopened products in original packaging' },
            { icon:'₹', title:'Full Refunds', desc:'Processed within 5–7 business days' },
            { icon:'📦', title:'Free Shipping', desc:'On all orders above ₹1,999' },
            { icon:'🌍', title:'Ships Worldwide', desc:'To 40+ countries with tracking' },
          ].map((c,i) => (
            <motion.div key={c.title} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1*i,duration:0.6}}
              style={{background:'var(--beige)',borderRadius:8,padding:'24px',textAlign:'center',boxShadow:'var(--shadow-sm)'}}>
              <div style={{fontSize:28,marginBottom:12}}>{c.icon}</div>
              <div style={{fontFamily:'Cinzel,serif',fontSize:14,color:'var(--brown)',marginBottom:6}}>{c.title}</div>
              <p style={{fontSize:11,color:'var(--text-light)',fontFamily:'Lora,serif',lineHeight:1.6}}>{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Policy sections */}
        <div style={{maxWidth:800,margin:'0 auto'}}>
          {sections.map((section,i) => (
            <motion.div key={section.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
              transition={{duration:0.6,delay:i*0.05}} viewport={{once:true}}
              style={{marginBottom:40,paddingBottom:40,borderBottom:'1px solid rgba(106,78,66,0.08)'}}>
              <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16}}>
                <div style={{width:40,height:40,background:'rgba(198,167,90,0.12)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color:'var(--gold)',flexShrink:0}}>
                  {section.icon}
                </div>
                <h2 style={{fontFamily:'Cinzel,serif',fontSize:18,color:'var(--brown-deeper)'}}>{section.title}</h2>
              </div>
              <div style={{paddingLeft:56}}>
                {section.content.map((para,j) => (
                  <p key={j} style={{fontSize:14,color:'var(--text-muted)',lineHeight:1.85,fontFamily:'Lora,serif',marginBottom:12}}>
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.7}} viewport={{once:true}}
          style={{maxWidth:800,margin:'0 auto',textAlign:'center',padding:'40px',background:'var(--beige)',borderRadius:8,boxShadow:'var(--shadow-sm)'}}>
          <div style={{fontFamily:'Cinzel,serif',fontSize:20,color:'var(--brown-deeper)',marginBottom:12}}>Have a Question?</div>
          <p style={{fontSize:14,color:'var(--text-muted)',fontFamily:'Lora,serif',marginBottom:24}}>Our customer care team is happy to help with any return or shipping query.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/contact">
              <motion.button className="btn-primary" style={{borderRadius:4}} whileHover={{scale:1.02}} whileTap={{scale:0.98}}>
                Contact Us
              </motion.button>
            </Link>
            <Link to="/shop">
              <motion.button className="btn-outline" style={{borderRadius:4}} whileHover={{scale:1.02}} whileTap={{scale:0.98}}>
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
