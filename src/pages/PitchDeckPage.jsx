import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const F = '"Futura LT Pro", system-ui, sans-serif'
const SERIF = '"Cormorant Garamond", Georgia, serif'

const SLIDES = [
  {
    id: '01',
    phase: 'CURRENT STATE',
    screenshot: '/pitch/01-nav.png',
    annotations: [
      {
        dot: { x: 48, y: 3 },
        label: 'Nav + Category Structure',
        title: 'Navigation Architecture',
        body: 'Story-driven, not campaign-driven. Every category opens a door to a narrative. Speed and accessibility lead — responsive design delivers a consistent experience across all devices.',
      },
      {
        dot: { x: 50, y: 34 },
        label: 'Hero Section',
        title: 'Cinematic Entry',
        body: 'Scroll-driven animation gives the hero its voice. Video, typography and motion unified — this is not a store entrance, it is an invitation into an experience.',
      },
      {
        dot: { x: 50, y: 82 },
        label: 'Product Carousel',
        title: 'Product Discovery',
        body: 'Auto-scroll carousel delivers a premium feel while shortening the path to purchase. The badge system (NEW, LIMITED) establishes an editorial language.',
      },
    ],
  },
  {
    id: '02',
    phase: 'CONTENT-DRIVEN TRANSFORMATION',
    screenshot: '/pitch/02-lifemoments.png',
    annotations: [
      {
        dot: { x: 25, y: 40 },
        label: 'Editorial Grid',
        title: 'We Sell Moments',
        body: 'A 1+2 editorial grid places the product inside a lived moment. The user steps into the scene before they ever think about buying.',
      },
      {
        dot: { x: 20, y: 55 },
        label: 'Video Content',
        title: 'Motion Storytelling',
        body: 'A looping BBQ video alongside static imagery: the platform does not just show — it makes you feel. The speed of emotional connection increases dramatically.',
      },
      {
        dot: { x: 65, y: 50 },
        label: 'Moment Cards',
        title: 'Life Moment = Product',
        body: 'Every moment card creates context. Before the user even asks "where do I drink this wine?", the scene has already been set in their mind.',
      },
    ],
  },
  {
    id: '03',
    phase: 'CONTENT-DRIVEN TRANSFORMATION',
    screenshot: '/pitch/03-lifestyle.png',
    annotations: [
      {
        dot: { x: 50, y: 30 },
        label: 'Editorial Mosaic',
        title: 'Gap-Free Grid',
        body: 'A gap-free 3-column mosaic creates visual depth that keeps users on the page. Every cell opens into a different content universe.',
      },
      {
        dot: { x: 20, y: 45 },
        label: 'Video + Static',
        title: 'Living Content',
        body: 'BBQ, cocktails, wine, spices — video and static imagery presented together give the page a sense that it is alive.',
      },
      {
        dot: { x: 70, y: 60 },
        label: 'Dwell Time',
        title: 'Content = Time on Page',
        body: 'Content depth translates directly into increased dwell time. Users stay not to see a product, but to explore a world.',
      },
    ],
  },
  {
    id: '04',
    phase: '2030 VISION',
    screenshot: '/pitch/04-hero.png',
    annotations: [
      {
        dot: { x: 50, y: 20 },
        label: 'Scroll Animation',
        title: 'Scroll-Driven Experience',
        body: 'Content comes alive as the page scrolls. By 2030, users are not passive consumers — they are inside the experience. Every scroll reveals a new layer.',
      },
      {
        dot: { x: 50, y: 38 },
        label: 'Typography Tone',
        title: 'The Visual Form of Voice',
        body: 'Born Ready Slanted + Cormorant Garamond creates a character. The platform speaks — it does not write ads, it builds an editorial voice.',
      },
      {
        dot: { x: 50, y: 52 },
        label: 'CTA Language',
        title: 'Invitation, Not Command',
        body: '"SHOP NOW" and "DISCOVER" — each speaks to a different user intent. Not purchase pressure, but an invitation to explore.',
      },
    ],
  },
  {
    id: '05',
    phase: '2030 VISION',
    screenshot: '/pitch/05-recipe.png',
    annotations: [
      {
        dot: { x: 40, y: 35 },
        label: 'Recipe Content',
        title: 'Product + Story Bridge',
        body: 'Recipe and cocktail content places the product inside a usage context. The content → product funnel goes far beyond the classic funnel model.',
      },
      {
        dot: { x: 60, y: 55 },
        label: 'Ingredient Link',
        title: 'Ingredient = Product Page',
        body: 'Recipe ingredients link directly to product pages. Before the user asks "where can I find this gin?", the system has already answered.',
      },
      {
        dot: { x: 45, y: 72 },
        label: 'Editorial Style',
        title: 'Selling a Lifestyle',
        body: 'In the 2030 vision, H&R is not a store — it is an editorial platform. Telling the moments of life through stories, fully reflecting its audience.',
      },
    ],
  },
  {
    id: '06',
    phase: 'PLATFORM POWER',
    screenshot: '/pitch/06-products.png',
    annotations: [
      {
        dot: { x: 48, y: 78 },
        label: 'Product Grid',
        title: 'Speed + Quality',
        body: 'A filterable product listing delivers a premium feel while shortening the path to purchase. Natural flow to product discovery — no decision fatigue.',
      },
      {
        dot: { x: 25, y: 72 },
        label: 'Badge System',
        title: 'Editorial Language',
        body: 'NEW, BESTSELLER, LIMITED, BUNDLE — the badge system is not campaign language, it is an editorial voice. Curation over marketing to surface products.',
      },
      {
        dot: { x: 70, y: 88 },
        label: 'Add to Cart',
        title: 'Shortened Path',
        body: 'An "ADD TO CART" action at carousel level lets users purchase without visiting the product detail page. Friction minimized, conversion maximized.',
      },
    ],
  },
]

// Figma Frame 5: 1872×1080 — screenshot 1184px, gap 151px, card 537px
const PAD_H = 48
const PAD_V = 80
const SS_W_RATIO = 1184 / 1872   // 0.6325
const GAP_RATIO  = 151  / 1872   // 0.0807
const PIN_R_OUTER = 56 / 1080    // relative to innerH
const PIN_R_INNER = 29 / 1080
const CARD_GAP_RATIO = 34 / 1080

export default function PitchDeckPage() {
  const [current, setCurrent] = useState(0)
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight })
  const slide = SLIDES[current]

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setCurrent(c => Math.min(c + 1, SLIDES.length - 1))
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setCurrent(c => Math.max(c - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const innerW   = size.w - PAD_H * 2
  const innerH   = size.h - PAD_V * 2
  const ssW      = innerW * SS_W_RATIO
  const cardGap  = innerH * CARD_GAP_RATIO
  const cardLeft = PAD_H + innerW * (SS_W_RATIO + GAP_RATIO)   // card panel left edge
  const ssRight  = PAD_H + ssW                                  // screenshot right edge
  const pinOuter = Math.round(innerH * PIN_R_OUTER)
  const pinInner = Math.round(innerH * PIN_R_INNER)
  const cardH    = (innerH - cardGap * 2) / 3

  const dotPositions = slide.annotations.map((a, i) => ({
    x: PAD_H + ssW * (a.dot.x / 100),
    y: PAD_V + innerH * (a.dot.y / 100),
  }))

  const cardCenters = slide.annotations.map((_, i) =>
    PAD_V + i * (cardH + cardGap) + cardH / 2
  )

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      background: '#1a1614', position: 'relative',
      fontFamily: F, cursor: 'default',
    }}>

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 48px', zIndex: 30,
      }}>
        <span style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(240,238,234,0.22)', textTransform: 'uppercase' }}>
          Honest & Rare — UX Strategy
        </span>
        <motion.span key={slide.phase} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(196,147,63,0.6)', textTransform: 'uppercase' }}>
          {slide.phase}
        </motion.span>
        <span style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(240,238,234,0.22)', textTransform: 'uppercase' }}>
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={slide.id}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', height: '100%', display: 'flex', padding: `${PAD_V}px ${PAD_H}px`, gap: 0, position: 'relative' }}
        >

          {/* Screenshot */}
          <div style={{
            flex: `0 0 ${SS_W_RATIO * 100}%`, height: '100%',
            position: 'relative', borderRadius: 10, overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(160deg, #1a1614 0%, #251f1b 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: SERIF, fontSize: '1.2rem', color: 'rgba(196,147,63,0.18)', letterSpacing: '0.1em' }}>
                Honest & Rare
              </span>
            </div>
            <img src={slide.screenshot} alt="" onError={e => { e.target.style.display = 'none' }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 1 }} />

          </div>

          {/* Right — 3 cards, gap from Figma ratio */}
          <div style={{
            flex: 1, height: '100%',
            paddingLeft: cardLeft - ssRight,
            display: 'flex', flexDirection: 'column', gap: cardGap,
          }}>
            {slide.annotations.map((ann, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
                style={{
                  flex: 1,
                  background: 'rgba(248,247,244,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRadius: 50,
                  padding: '18px 28px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}
              >
                <p style={{ fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(196,147,63,0.8)', marginBottom: 8 }}>
                  {ann.label}
                </p>
                <h3 style={{
                  fontFamily: SERIF, fontWeight: 300,
                  fontSize: 'clamp(0.95rem, 1.3vw, 1.25rem)',
                  color: '#f8f7f4', lineHeight: 1.1, marginBottom: 10,
                }}>
                  {ann.title}
                </h3>
                <div style={{ width: 20, height: 1, background: 'rgba(196,147,63,0.4)', marginBottom: 10 }} />
                <p style={{ fontWeight: 300, fontSize: '0.68rem', lineHeight: 1.75, color: 'rgba(248,247,244,0.5)', letterSpacing: '0.01em' }}>
                  {ann.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* SVG — lines + pins */}
          <svg style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            overflow: 'visible', pointerEvents: 'none', zIndex: 20,
          }}>
            {/* Lines */}
            {slide.annotations.map((_, i) => {
              const dx = dotPositions[i]?.x ?? 0
              const dy = dotPositions[i]?.y ?? 0
              const cy = cardCenters[i] ?? 0
              const angle = Math.atan2(cy - dy, ssRight - dx)
              const sx = dx + Math.cos(angle) * (pinOuter / 2)
              const sy = dy + Math.sin(angle) * (pinOuter / 2)
              return (
                <g key={`line-${i}`}>
                  <motion.path
                    d={`M ${sx} ${sy} L ${ssRight} ${cy}`}
                    fill="none" stroke="rgba(26,22,20,0.85)" strokeWidth="1" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.35 }}
                  />
                  <motion.path
                    d={`M ${ssRight} ${cy} L ${cardLeft} ${cy}`}
                    fill="none" stroke="rgba(248,247,244,0.75)" strokeWidth="1" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.1, duration: 0.3 }}
                  />
                </g>
              )
            })}
            {/* Pins on top of lines */}
            {slide.annotations.map((_, i) => {
              const dx = dotPositions[i]?.x ?? 0
              const dy = dotPositions[i]?.y ?? 0
              const half = pinOuter / 2
              return (
                <motion.image
                  key={`pin-${i}`}
                  href="/deck-assets/pin.png"
                  x={dx - half} y={dy - half}
                  width={pinOuter} height={pinOuter}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ transformOrigin: `${dx}px ${dy}px` }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                />
              )
            })}
          </svg>

        </motion.div>
      </AnimatePresence>

      {/* Dot nav */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 8, alignItems: 'center', zIndex: 30,
      }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 20 : 6, height: 6, borderRadius: 3,
            background: i === current ? '#c4933f' : 'rgba(240,238,234,0.18)',
            border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {current > 0 && (
        <button onClick={() => setCurrent(c => c - 1)} style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(240,238,234,0.22)', fontSize: 18, padding: 10, zIndex: 30,
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,238,234,0.65)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,234,0.22)'}
        >←</button>
      )}
      {current < SLIDES.length - 1 && (
        <button onClick={() => setCurrent(c => c + 1)} style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(240,238,234,0.22)', fontSize: 18, padding: 10, zIndex: 30,
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,238,234,0.65)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,234,0.22)'}
        >→</button>
      )}
    </div>
  )
}
