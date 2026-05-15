import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import CarouselTrack from './CarouselTrack'

const MAKERS = [
  {
    id: 1,
    name: 'Shearwater Distillery',
    location: 'Hamburg, Germany · Est. 2014',
    badge: 'Independent',
    specialty: 'Small-Batch Gin · 4 Expressions',
    quote: 'We make 2,400 bottles a year. Every single one by hand. You won\'t find us in a supermarket — and that\'s exactly the point.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85&auto=format&fit=crop',
    accent: '#4a6fa5',
  },
  {
    id: 2,
    name: 'Gentle Spirits Co.',
    location: 'Berlin, Germany · Est. 2016',
    badge: 'Family Owned',
    specialty: 'Botanical Spirits · Alcohol-Free Line',
    quote: 'Big brands are optimised for shelves. We\'re optimised for the person who actually drinks it. There\'s a difference — you can taste it.',
    img: 'https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=600&q=85&auto=format&fit=crop',
    accent: '#c4933f',
  },
  {
    id: 3,
    name: 'Feldmann Brauerei',
    location: 'Bamberg, Germany · Est. 1887',
    badge: 'Since 1887',
    specialty: 'Craft Wheat Beer · Seasonal Brews',
    quote: 'Four generations. One recipe we refuse to simplify. Algorithms don\'t recommend us — curious people find us.',
    img: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&q=85&auto=format&fit=crop',
    accent: '#8b6914',
  },
  {
    id: 4,
    name: 'Rare Roasts',
    location: 'Copenhagen, Denmark · Est. 2009',
    badge: 'Single Origin',
    specialty: 'Specialty Coffee · Direct Trade',
    quote: 'We buy from twelve farmers by name. We roast once a week. We sell out every time. This isn\'t scalable — that\'s why it\'s good.',
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=85&auto=format&fit=crop',
    accent: '#5a4a3a',
  },
  {
    id: 5,
    name: 'Vinero Estate',
    location: 'Rhine Valley, Germany · Est. 1987',
    badge: 'Family Estate',
    specialty: 'Natural Wine · 6 ha of Vines',
    quote: 'Our wines don\'t have a marketing budget. They have a terroir. Customers who find us stay for life.',
    img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=85&auto=format&fit=crop',
    accent: '#7a3b4c',
  },
  {
    id: 6,
    name: 'Schwarzwald Spirits',
    location: 'Black Forest, Germany · Est. 2003',
    badge: 'Niche Craft',
    specialty: 'Forest Botanicals · Herbal Bitters',
    quote: 'Everything we use grows within 20 km of our still. No supply chain. No compromise. Just Black Forest in a bottle.',
    img: 'https://images.unsplash.com/photo-1567072235340-de0e1a95b9d0?w=600&q=85&auto=format&fit=crop',
    accent: '#3a6b3a',
  },
]

const LOOP = [...MAKERS, ...MAKERS]

function MakerCard({ maker }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 300,
        marginRight: 20,
        background: '#fff',
        overflow: 'hidden',
        flexShrink: 0,
        cursor: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 16px 48px rgba(26,22,20,0.12)'
          : '0 2px 12px rgba(26,22,20,0.06)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <img
          src={maker.img}
          alt={maker.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.6s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <span style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(26,22,20,0.72)',
          backdropFilter: 'blur(8px)',
          color: '#f0eeea',
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 7, letterSpacing: '0.28em', textTransform: 'uppercase',
          padding: '5px 10px',
        }}>
          {maker.badge}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: maker.accent, marginBottom: 4,
        }}>
          {maker.location}
        </p>
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(26,22,20,0.35)', marginBottom: 8,
        }}>
          {maker.specialty}
        </p>
        <h3 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 500, fontSize: '1.2rem', color: '#1a1614',
          marginBottom: 10, lineHeight: 1.2,
        }}>
          {maker.name}
        </h3>
        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300, fontStyle: 'italic',
          fontSize: '0.95rem', color: 'rgba(26,22,20,0.55)',
          lineHeight: 1.6, marginBottom: 18, flex: 1,
        }}>
          "{maker.quote}"
        </p>
        <Link
          to="/brand"
          style={{
            display: 'inline-block',
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#1a1614', textDecoration: 'none',
            borderBottom: `1px solid ${maker.accent}`,
            paddingBottom: 2,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = maker.accent }}
          onMouseLeave={e => { e.currentTarget.style.color = '#1a1614' }}
        >
          Discover Their Story →
        </Link>
      </div>
    </div>
  )
}

export default function MeetTheMaker() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px'])

  return (
    <section ref={sectionRef} style={{ background: '#f0eeea', padding: '96px 0 80px' }}>
      {/* Header */}
      <motion.div style={{ padding: '0 60px 48px', maxWidth: 720, y: headerY }}>
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
          color: '#c4933f', marginBottom: 10,
        }}>
          900+ Independent Producers
        </p>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300, fontSize: 'clamp(2.2rem, 3vw, 3.2rem)',
          color: '#1a1614', lineHeight: 1.1, margin: '0 0 16px',
        }}>
          Meet the Maker
        </h2>
        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300, fontStyle: 'italic',
          fontSize: '1rem', color: 'rgba(26,22,20,0.45)',
          lineHeight: 1.7, margin: 0,
        }}>
          These aren't brands built for algorithms. They're makers who chose craft over scale — and you won't find them anywhere else.
        </p>
      </motion.div>

      <CarouselTrack duration={52} step={320} paddingLeft={60}>
        {LOOP.map((maker, i) => (
          <MakerCard key={i} maker={maker} />
        ))}
      </CarouselTrack>
    </section>
  )
}
