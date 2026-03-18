// HomePage — sandalwood luxury redesign
import { motion } from 'framer-motion'
import { Link }   from 'react-router-dom'
import HeroSection    from '../components/HeroSection'
import CollectionGrid from '../components/CollectionGrid'
import BestSellers    from '../components/BestSellers'
import StorySection   from '../components/StorySection'
import FragranceNotes from '../components/FragranceNotes'
import Testimonials   from '../components/Testimonials'
import Newsletter     from '../components/Newsletter'

const marqueeItems = ['Pure Attars · Kannauj','Luxury Perfumes','Essential Oils','Aged Oud','Mysore Sandalwood','Jasmine Mogra','Deg-Bhapka Craft','Est. 1887']

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div style={{ background:'var(--beige)', borderTop:'1px solid rgba(106,78,66,0.1)', borderBottom:'1px solid rgba(106,78,66,0.1)', padding:'14px 0', overflow:'hidden' }}>
      <motion.div style={{ display:'flex', gap:'clamp(30px,5vw,64px)', whiteSpace:'nowrap' }}
        animate={{ x:[0,-(marqueeItems.length*180)] }} transition={{ duration:28, repeat:Infinity, ease:'linear' }}>
        {doubled.map((item,i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'clamp(16px,2.5vw,28px)', flexShrink:0 }}>
            <span style={{ fontSize:10, letterSpacing:'clamp(2px,0.4vw,4px)', color:'var(--text-muted)', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif' }}>{item}</span>
            <span style={{ color:'var(--gold)', fontSize:12 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function HomePage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}>
      <HeroSection/>
      <MarqueeStrip/>
      <CollectionGrid/>
      <BestSellers/>
      <StorySection/>
      <FragranceNotes/>
      <Testimonials/>
      <Newsletter/>
    </motion.div>
  )
}
