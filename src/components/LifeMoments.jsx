import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '../hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

const MOMENTS = [
  {
    id: 1,
    tag: 'Summer · Social',
    title: 'The Perfect Barbecue\nGathering',
    description: 'Food, fire, and the finest craft drinks. Discover what pairs best with your next grill night.',
    img: 'https://images.unsplash.com/photo-1544025162-d76538159ee6?w=1600&q=90&auto=format&fit=crop',
    video: '/bbq-loop.mp4',
    featured: true,
  },
  {
    id: 2,
    tag: 'Everyday · Relaxation',
    title: 'After-Work\nEnjoyment',
    description: 'Unwind with a premium craft beer after a long workday.',
    img: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=900&q=85&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 3,
    tag: 'Intimate · Comfort',
    title: 'Cozy\nEvening',
    description: 'A quiet night in. Candlelight, a good film, and a glass worth savouring.',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=85&auto=format&fit=crop',
    featured: false,
  },
]

function FeaturedCard({ moment }) {
  const [hovered, setHovered] = useState(false)
  const containerRef = useRef(null)
  const mediaRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(mediaRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Link
      to="/lifestyle"
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'block', position: 'relative', height: '100%', overflow: 'hidden', textDecoration: 'none', cursor: 'none' }}
    >
      {/* Parallax media wrapper */}
      <div
        ref={mediaRef}
        style={{ position: 'absolute', top: '-12%', left: 0, right: 0, height: '124%' }}
      >
        <video
          autoPlay muted loop playsInline
          poster={moment.img}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        >
          <source src={moment.video} type="video/mp4" />
        </video>
      </div>

      {/* Layered gradients */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(26,22,20,0.55) 0%, transparent 50%, rgba(26,22,20,0.35) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,22,20,0.85) 0%, rgba(26,22,20,0.2) 40%, transparent 70%)',
      }} />

      {/* Top label */}
      <div style={{ position: 'absolute', top: 32, left: 36 }}>
        <span style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'rgba(240,238,234,0.55)',
          borderBottom: '1px solid rgba(196,147,63,0.5)',
          paddingBottom: 4,
        }}>
          {moment.tag}
        </span>
      </div>

      {/* Bottom content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 36px' }}>
        <h3 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 3vw, 3rem)',
          color: '#f0eeea',
          lineHeight: 1.1,
          margin: '0 0 16px',
          whiteSpace: 'pre-line',
        }}>
          {moment.title}
        </h3>
        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300, fontStyle: 'italic',
          fontSize: '1rem', color: 'rgba(240,238,234,0.6)',
          lineHeight: 1.7, marginBottom: 24, maxWidth: 340,
        }}>
          {moment.description}
        </p>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 8, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: '#c4933f',
        }}>
          Explore This Moment
          <span style={{
            display: 'inline-block', height: 1, width: 32,
            background: 'linear-gradient(90deg, rgba(196,147,63,0.85), transparent)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          }} />
        </span>
      </div>
    </Link>
  )
}

function SecondaryCard({ moment }) {
  const [hovered, setHovered] = useState(false)
  const containerRef = useRef(null)
  const mediaRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(mediaRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Link
      to="/lifestyle"
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'block', position: 'relative', height: '100%', overflow: 'hidden', textDecoration: 'none', cursor: 'none' }}
    >
      {/* Parallax media wrapper */}
      <div
        ref={mediaRef}
        style={{ position: 'absolute', top: '-12%', left: 0, right: 0, height: '124%' }}
      >
        <img
          src={moment.img}
          alt={moment.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,22,20,0.8) 0%, rgba(26,22,20,0.1) 60%, transparent 100%)',
      }} />

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px' }}>
        <span style={{
          display: 'block',
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(196,147,63,0.8)', marginBottom: 8,
        }}>
          {moment.tag}
        </span>
        <h3 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)',
          color: '#f0eeea',
          lineHeight: 1.15, margin: 0,
          whiteSpace: 'pre-line',
        }}>
          {moment.title}
        </h3>
      </div>
    </Link>
  )
}

export default function LifeMoments() {
  const isMobile = useIsMobile()
  const featured  = MOMENTS.find(m => m.featured)
  const secondary = MOMENTS.filter(m => !m.featured)

  return (
    <section style={{ background: '#0d0b09', overflow: 'hidden', position: 'relative' }}>
      {/* Section header */}
      <div style={{
        padding: isMobile ? '56px 20px 36px' : '80px 60px 48px',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'flex-end',
        justifyContent: 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 16,
      }}>
        <div>
          <p style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase',
            color: '#c4933f', marginBottom: 12,
          }}>
            Lifestyle
          </p>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: isMobile ? 'clamp(2rem, 8vw, 2.8rem)' : 'clamp(2.4rem, 3.2vw, 3.6rem)',
            color: '#f0eeea', lineHeight: 1.05, margin: 0,
          }}>
            Life Moments
          </h2>
        </div>
        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300, fontStyle: 'italic',
          fontSize: '0.95rem', color: 'rgba(240,238,234,0.35)',
          maxWidth: 260, lineHeight: 1.7, margin: 0,
        }}>
          Explore products through the moments that matter most to you.
        </p>
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 0 56px' }}>
          <div style={{ height: 320 }}>
            <FeaturedCard moment={featured} />
          </div>
          {secondary.map(m => (
            <div key={m.id} style={{ height: 220 }}>
              <SecondaryCard moment={m} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: 2,
          paddingBottom: 80,
          height: 700,
          overflow: 'hidden',
        }}>
          <FeaturedCard moment={featured} />
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 2 }}>
            {secondary.map(m => (
              <SecondaryCard key={m.id} moment={m} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
