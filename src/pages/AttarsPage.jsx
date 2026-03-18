// AttarsPage — warm sandalwood theme with real images
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const attars = products.filter(p => p.category === 'Attars')

const processSteps = [
  { num:'01', title:'Botanical Harvest', desc:'Flowers, herbs and woods harvested at peak fragrance — roses at dawn, jasmine at midnight.', img:'https://images.unsplash.com/photo-1490750967868-88df5691cc04?w=400&q=80' },
  { num:'02', title:'Copper Deg Loading', desc:'Botanicals packed into a handcrafted copper deg with water, sealed with clay to prevent any aromatic loss.', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { num:'03', title:'Slow Fire Heating', desc:'A slow wood fire heats the deg for 8–18 hours. Temperature controlled by experienced hands, never instruments.', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
  { num:'04', title:'Steam Condensation', desc:'Aromatic steam travels through a bamboo pipe into a bhapka vessel submerged in cold running river water.', img:'https://images.unsplash.com/photo-1548445929-4f60a497f851?w=400&q=80' },
  { num:'05', title:'Sandalwood Collection', desc:'The bhapka holds pure sandalwood oil, which absorbs the aromatic compounds from the condensing steam.', img:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80' },
  { num:'06', title:'Aging & Bottling', desc:'The attar ages in traditional leather kuppi bottles for months, then is decanted and hand-sealed.', img:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80' },
]

export default function AttarsPage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}
      style={{paddingTop:100,background:'var(--ivory)',minHeight:'100vh'}}>

      {/* Hero */}
      <div style={{position:'relative',height:460,overflow:'hidden',display:'flex',alignItems:'center'}}>
        <div style={{position:'absolute',inset:0}}>
          <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&q=85"
            alt="Traditional attar bottles" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 40%'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to right, rgba(245,241,233,0.97) 0%, rgba(245,241,233,0.75) 50%, rgba(245,241,233,0.3) 100%)'}}/>
        </div>
        <motion.div style={{position:'relative',zIndex:2,padding:'0 64px',maxWidth:600}}
          initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.9}}>
          <span className="section-tag">✦ The Ancient Art</span>
          <h1 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(32px,5vw,60px)',color:'var(--brown-deeper)',marginBottom:18,lineHeight:1.1}}>
            The World of Attars
          </h1>
          <p style={{fontSize:14,color:'var(--text-muted)',lineHeight:1.85,fontFamily:'Lora,serif',marginBottom:24}}>
            <em style={{color:'var(--brown)'}}>Attar</em> — from the Arabic <em>itr</em>, meaning scent — is the world's oldest perfumery tradition, practised in Kannauj for over 5,000 years. Each drop is a conversation between fire, water, copper, and time.
          </p>
          <div style={{width:48,height:1,background:'var(--gold)'}}/>
        </motion.div>
      </div>

      {/* Process section */}
      <div style={{padding:'80px 64px',background:'var(--beige)'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}
          style={{textAlign:'center',marginBottom:52}}>
          <span className="section-tag">✦ Our Method</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(22px,3vw,36px)',color:'var(--brown-deeper)',marginBottom:12}}>The Deg-Bhapka Process</h2>
          <div style={{width:48,height:1,background:'var(--gold)',margin:'0 auto 16px'}}/>
          <p style={{fontSize:14,color:'var(--text-muted)',maxWidth:500,margin:'0 auto',fontFamily:'Lora,serif',fontStyle:'italic'}}>An unbroken chain of craft stretching back centuries. No machines. No shortcuts. Only fire, water, copper, and time.</p>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
          {processSteps.map((step,i) => (
            <motion.div key={step.num} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
              transition={{duration:0.6,delay:i*0.08}} viewport={{once:true}}
              style={{background:'var(--ivory)',borderRadius:8,overflow:'hidden',boxShadow:'var(--shadow-sm)',transition:'box-shadow 0.4s,transform 0.4s'}}
              whileHover={{y:-4,boxShadow:'var(--shadow-lg)'}}>
              <div style={{height:140,overflow:'hidden'}}>
                <motion.img src={step.img} alt={step.title} style={{width:'100%',height:'100%',objectFit:'cover'}} whileHover={{scale:1.05}} transition={{duration:0.5}}/>
              </div>
              <div style={{padding:'22px 20px'}}>
                <div style={{fontFamily:'Cinzel,serif',fontSize:36,color:'rgba(106,78,66,0.12)',marginBottom:8,lineHeight:1}}>{step.num}</div>
                <div style={{fontFamily:'Cinzel,serif',fontSize:15,color:'var(--brown)',marginBottom:8}}>{step.title}</div>
                <p style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.75,fontFamily:'Lora,serif'}}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{padding:'80px 64px',background:'var(--ivory)'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} style={{marginBottom:48}}>
          <span className="section-tag">✦ The Attar Collection</span>
          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(22px,3vw,36px)',color:'var(--brown-deeper)',marginBottom:8}}>Our Attars</h2>
          <p style={{fontSize:14,color:'var(--text-muted)',maxWidth:520,fontFamily:'Lora,serif'}}>Six pure attars, each distilled from rare Indian botanicals using the ancient deg-bhapka method.</p>
          <div style={{width:48,height:1,background:'var(--gold)',marginTop:20}}/>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:24}}>
          {attars.map((p,i) => <ProductCard key={p.id} product={p} index={i}/>)}
        </div>
      </div>

      {/* How to apply */}
      <div style={{padding:'72px 64px',background:'var(--beige)'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center',maxWidth:1000,margin:'0 auto'}}>
          <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
            <div style={{borderRadius:8,overflow:'hidden',boxShadow:'var(--shadow-lg)'}}>
              <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=85"
                alt="Applying attar" style={{width:'100%',height:360,objectFit:'cover'}}/>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
            <span className="section-tag">✦ The Ritual</span>
            <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(20px,3vw,32px)',color:'var(--brown-deeper)',marginBottom:20,lineHeight:1.2}}>The Art of Applying Attar</h2>
            <div style={{width:48,height:1,background:'var(--gold)',marginBottom:24}}/>
            <p style={{fontSize:14,color:'var(--text-muted)',lineHeight:1.9,fontFamily:'Lora,serif',marginBottom:16}}>
              Unlike alcohol-based perfumes, attars are applied directly to warm skin in tiny quantities. The heat of your body activates and slowly evolves the fragrance throughout the day.
            </p>
            {['Inner wrists — pulse points activate the fragrance','Side of the neck — for a warm, intimate trail','Behind the ears — for a subtle, close-skin scent','Inner elbows — long-lasting all-day fragrance'].map((p,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'12px 0',borderBottom:'1px solid rgba(106,78,66,0.08)'}}>
                <span style={{fontFamily:'Cinzel,serif',fontSize:18,color:'rgba(198,167,90,0.5)',minWidth:28}}>0{i+1}</span>
                <span style={{fontSize:13,color:'var(--text-muted)',fontFamily:'Lora,serif'}}>{p}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
