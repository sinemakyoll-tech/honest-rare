import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const F = '"Futura LT Pro", system-ui, sans-serif'
const SERIF = '"Cormorant Garamond", Georgia, serif'

const SLIDES = [
  {
    id: '01',
    phase: 'HOMEPAGE',
    screenshot: '/pitch/01-nav.png',
    annotations: [
      {
        dot: { x: 48, y: 3 },
        label: 'Nav + Category Structure',
        title: 'Navigation Architecture',
        body: 'Story-driven, not campaign-driven. To minimize cognitive load and maximize visual immersion, the navigation header is hidden upon entry. As the user interacts and scrolls, it elegantly fades in and locks at the top as a sticky element. Every category opens a door to a lifestyle narrative, maintaining quick access without disrupting the premium, high-art editorial layout.',
      },
      {
        dot: { x: 50, y: 34 },
        label: 'Hero Section',
        title: 'Cinematic Entry',
        body: 'Scroll-driven animation gives the hero its voice. By replacing traditional, cluttered e-commerce entry points with a full-screen, cinematic 8K video, we establish an immediate emotional connection. This is not a store entrance; it is an invitation into a curated lifestyle. The combination of hidden navigation and raw atmospheric motion triggers curiosity, transforming a passive visitor into an active explorer.',
      },
      {
        dot: { x: 50, y: 82 },
        label: 'Product Carousel',
        title: 'Product Discovery',
        body: 'A dynamic, auto-scroll carousel delivers a premium feel while bridging the gap between digital storytelling and commerce. Strategically positioned right below the hero section, it establishes first contact by highlighting limited or independent craft products. By introducing products exactly when user attention and emotional engagement are at their peak, it shortens the path to purchase through natural, high-intent discovery.',
      },
    ],
  },
  {
    id: '02',
    phase: 'EDITORIAL PLATFORM',
    screenshot: '/pitch/02-lifestyle.png',
    scrollable: true,
    annotations: [
      {
        dot: { x: 50, y: 12 },
        label: 'Cinematic Immersion',
        title: '8K Visual Authority',
        body: 'The journey begins with a full-screen, high-definition 8K hero video that serves as a powerful statement of intent: Honest & Rare is an editorial platform first. By utilizing high-tier cinematic technology, we establish an immediate image of a tech-forward brand with deep-rooted editorial strength. This immersive entry point is designed to lower cognitive resistance and immediately envelop the user in a world of curated craft, setting a premium tone that prioritizes atmosphere over immediate transaction.',
      },
      {
        dot: { x: 20, y: 52 },
        label: 'Cultural Resonance',
        title: 'The Global Gastronomy Slider',
        body: 'Directly below the immersion phase, we feature a dynamic slider showcasing real-time global gastronomy trends — such as the recent "Matcha" wave or high-art recipes like "Carpaccio di Manzo." This section functions as a high-art digital magazine, keeping the platform relevant and socially connected. By integrating trending digital narratives into our ecosystem, we extend time-on-site and provide users with actionable lifestyle value, transforming the platform into a daily destination for inspiration.',
      },
      {
        dot: { x: 55, y: 82 },
        label: 'Contextual Commerce',
        title: 'Dynamic Selection & Future Roadmap',
        body: 'The "This Week\'s Picks for You" carousel serves as the strategic bridge between inspiration and purchase, curating products that naturally complement the editorial stories read above. Looking forward, our UX roadmap includes an interactive "Product Pinning" strategy — allowing users to hover over lifestyle imagery and transition directly from a recipe to a purchase. This ecosystem ensures that the connection to the brand is emotional, while the path to conversion is friction-free and entirely contextual.',
      },
    ],
  },
  {
    id: '03',
    phase: 'CONTENT-COMMERCE BRIDGE',
    screenshot: '/pitch/05-recipe.png',
    annotations: [
      {
        dot: { x: 22, y: 10 },
        label: 'Recipe Content',
        title: 'Product + Story Bridge',
        body: 'Recipe and cocktail content places the product inside a usage context. The content → product funnel goes far beyond the classic funnel model.',
      },
      {
        dot: { x: 55, y: 28 },
        label: 'Ingredient Link',
        title: 'Ingredient = Product Page',
        body: 'Recipe ingredients link directly to product pages. Before the user asks "where can I find this gin?", the system has already answered.',
      },
      {
        dot: { x: 72, y: 68 },
        label: 'Life Moments',
        title: 'Selling a Lifestyle',
        body: 'In the 2030 vision, H&R is not a store — it is an editorial platform. Telling the moments of life through stories, fully reflecting its audience.',
      },
    ],
  },
  {
    id: '04',
    phase: 'PLATFORM POWER',
    screenshot: '/pitch/04-brand.png',
    annotations: [
      {
        dot: { x: 30, y: 8 },
        label: 'Maker-Centric Storytelling',
        title: 'Humanizing the Transaction',
        body: 'Instead of using a generic category title, we lead with "Feldmann Brauerei" and its heritage to shift the focus from "buying a product" to "supporting a maker." By explicitly stating "Family-owned since 1887" and "Six generations of tradition," we provide immediate social proof and historical validation for the brand\'s "Independent" and "Rare" claims. This editorial approach serves two critical UX purposes: Trust-Based Transparency — using keywords like "unfiltered" and "uncompromising" directly addresses the health-conscious consumer\'s need for authenticity and raw quality. Emotional Anchoring — it transforms the grid into a narrative chapter. Before the user sees a single price tag, they have already internalized the brewery\'s philosophy, making the subsequent purchase an act of connection rather than a simple exchange.',
      },
      {
        dot: { x: 55, y: 45 },
        label: 'Product Card Architecture',
        title: 'Minimalist Transparency & Conversion',
        body: 'To accommodate today\'s highly health-conscious consumers, we provide deeply detailed product information that perfectly reflects Honest & Rare\'s premium brand identity. To balance this rich depth of information, the product card UI is kept clean, minimal, and strictly shopping-oriented, ensuring a friction-free visual layout. Positioned strategically right after the initial immersion carousel, the product grid introduces the purchasing phase at the perfect cognitive moment — guiding users toward a smooth, high-intent conversion only after the core brand perception has been fully established.',
      },
      {
        dot: { x: 16, y: 58 },
        label: 'Discovery & Precision Filtering',
        title: 'The Curated Educational Guide',
        body: 'Our filtering system is designed to provide users with absolute granular control, allowing them to navigate through the complex world of craft products with surgical precision. Beyond its functional utility, the sidebar serves as a vital navigational guide for new visitors, educating them on the nuances of styles, regions, and sensory profiles. By offering exhaustive detail — from alcohol content to specific taste notes — we eliminate the "paradox of choice," ensuring that the right user is matched with the right product every time. This transforms the traditional search process into a guided discovery experience that builds both user confidence and brand authority.',
      },
    ],
  },
  {
    id: '05',
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
  const [ssScrollTop, setSsScrollTop] = useState(0)
  const [imgNaturalSize, setImgNaturalSize] = useState({ w: 1440, h: 3000 })
  const slide = SLIDES[current]
  const touchStartX = useRef(null)
  const ssContainerRef = useRef(null)
  const scrollableRef = useRef(false)

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

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) {
      if (delta > 0) setCurrent(c => Math.min(c + 1, SLIDES.length - 1))
      else setCurrent(c => Math.max(c - 1, 0))
    }
    touchStartX.current = null
  }

  useEffect(() => {
    setSsScrollTop(0)
    setImgNaturalSize({ w: 1440, h: 3000 })
    if (ssContainerRef.current) ssContainerRef.current.scrollTop = 0
    scrollableRef.current = !!SLIDES[current].scrollable
  }, [current])

  useEffect(() => {
    let cooldown = false
    const onWheel = (e) => {
      if (scrollableRef.current) return
      if (cooldown) return
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(delta) < 15) return
      cooldown = true
      setTimeout(() => { cooldown = false }, 700)
      setCurrent(c => delta > 0 ? Math.min(c + 1, SLIDES.length - 1) : Math.max(c - 1, 0))
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
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

  const displayedImgH = slide.scrollable
    ? ssW * (imgNaturalSize.h / imgNaturalSize.w)
    : innerH

  const dotPositions = slide.annotations.map((a) => ({
    x: PAD_H + ssW * (a.dot.x / 100),
    y: slide.scrollable
      ? PAD_V + displayedImgH * (a.dot.y / 100) - ssScrollTop
      : PAD_V + innerH * (a.dot.y / 100),
  }))

  const cardCenters = slide.annotations.map((_, i) =>
    PAD_V + i * (cardH + cardGap) + cardH / 2
  )

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      background: '#0c0a08', position: 'relative',
      fontFamily: F, cursor: 'default',
    }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 65% 55% at 38% 50%, rgba(196,147,63,0.05) 0%, transparent 100%)',
      }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 48px', zIndex: 30,
      }}>
        <span style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(212,184,150,0.3)', textTransform: 'uppercase' }}>
          Honest & Rare — UX Strategy
        </span>
        <motion.span key={slide.phase} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(196,147,63,0.75)', textTransform: 'uppercase' }}>
          {slide.phase}
        </motion.span>
        <span style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(212,184,150,0.3)', textTransform: 'uppercase' }}>
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
            {slide.scrollable ? (
              <>
                <div ref={ssContainerRef} onScroll={e => setSsScrollTop(e.currentTarget.scrollTop)}
                  style={{ position: 'absolute', inset: 0, overflowY: 'auto', scrollbarWidth: 'none', zIndex: 1 }}>
                  <img src={slide.screenshot} alt=""
                    onLoad={e => setImgNaturalSize({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
                    style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                {/* Bottom fade — scroll hint */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 2, pointerEvents: 'none',
                  background: 'linear-gradient(to top, rgba(26,22,20,0.6) 0%, transparent 100%)',
                }} />
              </>
            ) : (
              <img src={slide.screenshot} alt="" onError={e => { e.target.style.display = 'none' }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 1 }} />
            )}

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
                  background: 'rgba(196,147,63,0.04)',
                  border: '1px solid rgba(196,147,63,0.22)',
                  borderRadius: 50,
                  padding: '16px 24px',
                  display: 'flex', flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <p style={{ fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(196,147,63,0.8)', marginBottom: 7, flexShrink: 0 }}>
                  {ann.label}
                </p>
                <h3 style={{
                  fontFamily: SERIF, fontWeight: 300,
                  fontSize: 'clamp(0.88rem, 1.2vw, 1.15rem)',
                  color: '#f8f7f4', lineHeight: 1.1, marginBottom: 8, flexShrink: 0,
                }}>
                  {ann.title}
                </h3>
                <div style={{ width: 20, height: 1, background: 'rgba(196,147,63,0.4)', marginBottom: 8, flexShrink: 0 }} />
                <div className="pitch-card-body" style={{ flex: 1 }}>
                  <p style={{ fontWeight: 300, fontSize: '0.64rem', lineHeight: 1.65, color: 'rgba(212,184,150,0.45)', letterSpacing: '0.01em' }}>
                    {ann.body}
                  </p>
                </div>
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
              const inView = !slide.scrollable || (dy >= PAD_V - pinOuter && dy <= PAD_V + innerH + pinOuter)
              if (!inView) return null
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
              const inView = !slide.scrollable || (dy >= PAD_V - half && dy <= PAD_V + innerH + half)
              if (!inView) return null
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
            background: i === current ? '#c4933f' : 'rgba(196,147,63,0.18)',
            border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {current > 0 && (
        <button onClick={() => setCurrent(c => c - 1)} style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(212,184,150,0.25)', fontSize: 18, padding: 10, zIndex: 30,
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(196,147,63,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(212,184,150,0.25)'}
        >←</button>
      )}
      {current < SLIDES.length - 1 && (
        <button onClick={() => setCurrent(c => c + 1)} style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(212,184,150,0.25)', fontSize: 18, padding: 10, zIndex: 30,
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(196,147,63,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(212,184,150,0.25)'}
        >→</button>
      )}
    </div>
  )
}
