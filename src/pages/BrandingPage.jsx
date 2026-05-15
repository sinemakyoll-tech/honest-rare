import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'

const EASE = [0.16, 1, 0.3, 1]

function FadeIn({ children, delay = 0, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
      fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase',
      color: '#c4933f', margin: '0 0 18px',
    }}>{children}</p>
  )
}

function Rule() {
  return <div style={{ width: 48, height: 1, background: 'rgba(196,147,63,0.4)', margin: '22px 0 32px' }} />
}

/* ── Typography specimens ── */
const FONTS = [
  {
    name: 'Cormorant Garamond',
    classification: 'Display Serif · 300 weight · Italic variant',
    specimen: 'Crafted\nWith Care',
    specimenItalic: true,
    usedFor: ['Feature headlines', 'Editorial stories', 'Lifestyle page hero', 'Pull quotes'],
    why: "Cormorant is rooted in the tradition of Garamond — one of the most legible typefaces in print history. Its extreme contrast between thin and thick strokes creates a tactile, almost handcrafted quality on screen. We use the 300 weight (light) because it reads as confident restraint: the brand knows it doesn't need to shout.",
    reasoning: 'German craft culture values understatement. A headline that whispers draws more attention than one that shouts.',
    color: '#f0eeea',
    bg: '#1a1614',
  },
  {
    name: 'Futura LT Pro',
    classification: 'Geometric Sans · Book & Medium · All caps',
    specimen: 'HONEST\nRARE',
    specimenItalic: false,
    usedFor: ['Navigation labels', 'Product tags', 'Section eyebrows', 'Price displays', 'CTAs'],
    why: 'Futura was designed in Germany in 1927 by Paul Renner — the same country and the same craft-first philosophy as our target market. Its geometric precision communicates: we are organised, intentional, and modern. Used exclusively in small sizes and all-caps, it never competes with Cormorant.',
    reasoning: 'Two typefaces in dialogue. Cormorant speaks with warmth; Futura replies with precision. Together they cover every emotional register the brand needs.',
    color: '#1a1614',
    bg: '#f0eeea',
  },
  {
    name: 'Born Ready Slanted',
    classification: 'Display Script · Regular · Italic by design',
    specimen: 'Fire &\nSlow Time',
    specimenItalic: true,
    usedFor: ['Hero campaign moments', 'Lifestyle section titles', '"For Food Enjoyers" banner', 'Special editorial calls'],
    why: 'Born Ready Slanted is the voice that breaks the grid. Where Cormorant is composed and Futura is precise, Born Ready is unscripted — like handwriting on a blackboard menu at a craft bar. Used sparingly and at large scale only, it signals: this moment is different. Pay attention.',
    reasoning: 'A brand with only two voices is predictable. The third voice appears rarely and unexpectedly — which is exactly when it has the most impact.',
    color: '#f0eeea',
    bg: '#0d0b09',
  },
]

/* ── Color swatches ── */
const COLORS = [
  {
    hex: '#f0eeea',
    name: 'Cream',
    role: 'Primary background · Light surfaces',
    why: 'Pure white (#ffffff) is clinical — it belongs in hospitals and spreadsheets. Cream is the colour of good paper, of linen, of the inside of a wine box. It has weight and warmth. Users subconsciously associate it with quality materials and slow craftsmanship.',
    contrast: '#1a1614',
    usedIn: ['Featured Story background', 'Discovery Engine', 'Cart page', 'Recipe cards'],
  },
  {
    hex: '#1a1614',
    name: 'Dark',
    role: 'Primary text · Mid-dark surfaces',
    why: 'Pure black (#000000) is too aggressive for a brand that wants to feel approachable and warm. #1a1614 has a slight red undertone — almost like the inside of a wine barrel. It reads as dark without reading as cold.',
    contrast: '#f0eeea',
    usedIn: ['Body text', 'Navigation', 'Product cards', 'Form inputs'],
  },
  {
    hex: '#c4933f',
    name: 'Gold',
    role: 'Accent · Brand signal · CTAs',
    why: 'This is the most deliberate colour choice. We rejected yellow (cheap), orange (food delivery), and bright gold (bling). #c4933f is the colour of aged whiskey, of a craft beer held up to candlelight, of beeswax on an artisan jar. It signals value without shouting luxury.',
    contrast: '#0d0b09',
    usedIn: ['Section labels', 'Navigation tags', 'Cursor', 'Progress bar', 'Hover accents', 'CTA borders'],
  },
  {
    hex: '#0d0b09',
    name: 'Deep',
    role: 'Dark page backgrounds · Hero sections',
    why: 'One shade darker than the text colour — not black, but nearly. This is the colour of a room lit only by a fireplace. It gives depth and atmosphere to the video-heavy sections of the site. On a screen that goes fully black, video looks flat. On #0d0b09, it breathes.',
    contrast: '#f0eeea',
    usedIn: ['Editorial Mosaic', 'Lifestyle hero', 'For Food Enjoyers', 'Footer'],
  },
]

/* ── Design Principles ── */
const PRINCIPLES = [
  {
    number: '01',
    title: 'Motion with purpose',
    body: 'Every animation earns its place. Scroll-triggered entrances build anticipation. Hover states reveal depth. Nothing moves just because it can. If removing an animation would make the page feel the same, it should be removed.',
  },
  {
    number: '02',
    title: 'Content first, commerce second',
    body: "A recipe, a ritual, a story — these come before a product recommendation. Users trust a brand's taste before they trust its catalogue. We build the habit of reading before we make the offer to buy.",
  },
  {
    number: '03',
    title: 'Mobile is the primary canvas',
    body: 'Every layout is designed mobile-first. Touch targets, scroll behaviour, overlay panels — all tested on a real thumb before a mouse. The desktop version is an enhancement, not the original.',
  },
  {
    number: '04',
    title: 'Tactile over clinical',
    body: 'Every material choice — cream instead of white, deep dark instead of black, gold instead of yellow — is made to feel like something you could touch. A premium physical product deserves a digital environment that feels physical.',
  },
  {
    number: '05',
    title: 'Editorial depth',
    body: 'Six rooms on the Lifestyle page. Six different content formats. A page visit becomes a journey. We design for dwell time, not bounce rate — because if someone stays, they already trust the brand.',
  },
  {
    number: '06',
    title: 'The culture before the catalogue',
    body: 'Honest & Rare is not a store that happens to have editorial content. It is a cultural institution that happens to sell things. Every design decision votes for that positioning — from the cursor behaviour to the mosaic grid.',
  },
]

export default function BrandingPage() {
  return (
    <>
      <Cursor />
      <Nav />

      {/* Hero */}
      <section style={{ background: '#0d0b09', paddingTop: 'clamp(8rem, 14vw, 12rem)', paddingBottom: 'clamp(5rem, 8vw, 8rem)', paddingLeft: 'clamp(1.5rem, 6vw, 7rem)', paddingRight: 'clamp(1.5rem, 6vw, 7rem)' }}>
        <FadeIn>
          <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#c4933f', margin: '0 0 20px' }}>
            Brand Identity System
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 7rem)', color: '#f0eeea', lineHeight: 0.95, margin: '0 0 28px', letterSpacing: '-0.01em' }}>
            The Language<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(240,238,234,0.3)' }}>of Honest & Rare</em>
          </h1>
        </FadeIn>
        <FadeIn delay={0.18}>
          <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: 'rgba(240,238,234,0.5)', maxWidth: 560, lineHeight: 1.65 }}>
            Every typeface, every colour, every spacing decision — chosen deliberately. This page explains the why behind each choice.
          </p>
        </FadeIn>
      </section>

      {/* ── TYPOGRAPHY ── */}
      <section style={{ background: '#f0eeea', padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 6vw, 7rem)' }}>
        <FadeIn>
          <SectionLabel>Typography</SectionLabel>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 4rem)', color: '#1a1614', lineHeight: 1.0, margin: 0 }}>
            Three voices,<br /><em style={{ color: 'rgba(26,22,20,0.35)' }}>one brand.</em>
          </h2>
          <Rule />
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FONTS.map((f, i) => (
            <FadeIn key={f.name} delay={i * 0.08}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: f.bg, minHeight: 420 }}>
                {/* Specimen */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(2.5rem, 4vw, 4rem)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(196,147,63,0.75)', margin: '0 0 24px' }}>
                    {f.classification}
                  </p>
                  <div style={{
                    fontFamily: f.name === 'Futura LT Pro' ? '"Futura LT Pro", system-ui, sans-serif' : f.name === 'Born Ready Slanted' ? '"Born Ready Slanted", serif' : '"Cormorant Garamond", Georgia, serif',
                    fontWeight: f.name === 'Futura LT Pro' ? 500 : 300,
                    fontStyle: f.specimenItalic ? 'italic' : 'normal',
                    fontSize: 'clamp(3rem, 6vw, 6.5rem)',
                    color: f.color,
                    lineHeight: 0.95,
                    whiteSpace: 'pre-line',
                    letterSpacing: f.name === 'Futura LT Pro' ? '0.08em' : '-0.01em',
                  }}>
                    {f.specimen}
                  </div>
                </div>

                {/* Rationale */}
                <div style={{ padding: 'clamp(2.5rem, 4vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c4933f', margin: '0 0 12px' }}>
                      {f.name}
                    </p>
                    <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)', color: f.color, lineHeight: 1.75, margin: '0 0 24px', opacity: 0.75 }}>
                      {f.why}
                    </p>
                    <div style={{ padding: '14px 18px', borderLeft: '2px solid rgba(196,147,63,0.5)', background: 'rgba(196,147,63,0.06)', marginBottom: 28 }}>
                      <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: '1rem', color: f.color, margin: 0, lineHeight: 1.6, opacity: 0.8 }}>
                        "{f.reasoning}"
                      </p>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7.5, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(196,147,63,0.6)', margin: '0 0 10px' }}>
                      Used for
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {f.usedFor.map(u => (
                        <span key={u} style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: f.color, opacity: 0.5, padding: '4px 10px', border: '1px solid rgba(196,147,63,0.2)' }}>
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── COLORS ── */}
      <section style={{ background: '#1a1614', padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 6vw, 7rem)' }}>
        <FadeIn>
          <SectionLabel>Colour System</SectionLabel>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 4rem)', color: '#f0eeea', lineHeight: 1.0, margin: 0 }}>
            A palette that<br /><em style={{ color: 'rgba(240,238,234,0.28)' }}>earns trust.</em>
          </h2>
          <Rule />
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {COLORS.map((c, i) => (
            <FadeIn key={c.hex} delay={i * 0.07}>
              <div style={{ background: c.hex, minHeight: 380, display: 'grid', gridTemplateRows: 'auto 1fr' }}>
                {/* Swatch bar */}
                <div style={{ height: 120, background: c.hex, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '0 32px 20px', borderBottom: '1px solid rgba(128,128,128,0.12)' }}>
                  <div>
                    <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: c.contrast, opacity: 0.4, margin: '0 0 4px' }}>
                      {c.name}
                    </p>
                    <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: '2rem', color: c.contrast, margin: 0, letterSpacing: '0.05em' }}>
                      {c.hex}
                    </p>
                  </div>
                </div>

                {/* Rationale */}
                <div style={{ padding: '28px 32px 32px', background: c.hex }}>
                  <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7.5, letterSpacing: '0.4em', textTransform: 'uppercase', color: c.contrast, opacity: 0.38, margin: '0 0 8px' }}>
                    {c.role}
                  </p>
                  <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)', color: c.contrast, opacity: 0.65, lineHeight: 1.75, margin: '0 0 20px' }}>
                    {c.why}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {c.usedIn.map(u => (
                      <span key={u} style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.contrast, opacity: 0.35, padding: '3px 9px', border: `1px solid ${c.contrast}22` }}>
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── DESIGN PRINCIPLES ── */}
      <section style={{ background: '#f0eeea', padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 6vw, 7rem)' }}>
        <FadeIn>
          <SectionLabel>Design Principles</SectionLabel>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 4rem)', color: '#1a1614', lineHeight: 1.0, margin: 0 }}>
            The decisions<br /><em style={{ color: 'rgba(26,22,20,0.28)' }}>behind the decisions.</em>
          </h2>
          <Rule />
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {PRINCIPLES.map((p, i) => (
            <FadeIn key={p.number} delay={i * 0.06}>
              <div style={{ background: '#1a1614', padding: 'clamp(2rem, 3vw, 3rem)', height: '100%' }}>
                <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(3rem, 5vw, 5rem)', color: 'rgba(196,147,63,0.15)', lineHeight: 1, margin: '0 0 20px' }}>
                  {p.number}
                </p>
                <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.2rem, 1.6vw, 1.5rem)', color: '#f0eeea', margin: '0 0 16px', lineHeight: 1.2 }}>
                  {p.title}
                </h3>
                <div style={{ width: 28, height: 1, background: 'rgba(196,147,63,0.4)', margin: '0 0 16px' }} />
                <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(0.88rem, 1.05vw, 1rem)', color: 'rgba(240,238,234,0.5)', lineHeight: 1.75, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section style={{ background: '#0d0b09', padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 7rem)', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#c4933f', margin: '0 0 24px' }}>
            The Foundation
          </p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 5rem)', color: '#f0eeea', lineHeight: 1.05, margin: '0 auto 20px', maxWidth: 800 }}>
            Consistency is culture.<br />
            <em style={{ color: 'rgba(240,238,234,0.28)' }}>Every detail votes for the brand.</em>
          </h2>
        </FadeIn>
      </section>

      <Footer />
    </>
  )
}
