import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { RECIPES } from '../data/recipes'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'

/* ── Letter-by-letter title ── */
function AnimatedTitle({ title }) {
  const lines = title.split('\n')
  return (
    <h1 style={{ lineHeight: 0.88, marginBottom: '2rem' }}>
      {lines.map((line, li) => (
        <div key={li} style={{ overflow: 'hidden', display: 'block' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: 0.3 + li * 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {line.split('').map((char, ci) => (
              <motion.span
                key={ci}
                style={{
                  display: 'inline-block',
                  fontFamily: ci === 0 && li === 1 ? '"Born Ready Slanted", cursive' : '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 300,
                  fontSize: 'clamp(3.5rem, 8vw, 9rem)',
                  color: li === 1 ? '#c4933f' : '#f0eeea',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + li * 0.2 + ci * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </div>
      ))}
    </h1>
  )
}

/* ── Step card ── */
function Step({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        gap: 32,
        paddingTop: 40,
        paddingBottom: 40,
        borderBottom: '1px solid rgba(26,22,20,0.07)',
        alignItems: 'start',
      }}
    >
      <div>
        <span style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: 300,
          color: 'rgba(196,147,63,0.18)',
          lineHeight: 1,
          display: 'block',
        }}>{step.num}</span>
      </div>
      <div>
        <h4 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.5rem',
          fontWeight: 400,
          color: '#1a1614',
          marginBottom: 12,
          lineHeight: 1.2,
        }}>{step.title}</h4>
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: '0.92rem',
          fontWeight: 300,
          color: 'rgba(26,22,20,0.6)',
          lineHeight: 1.85,
        }}>{step.body}</p>
      </div>
    </motion.div>
  )
}

/* ── Video placeholder ── */
function VideoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const [playing, setPlaying] = useState(false)

  return (
    <section ref={ref} style={{
      background: '#08070a',
      padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 8vw, 8rem)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p
          style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: '#c4933f', marginBottom: 16,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Watch it come together
        </motion.p>

        <motion.h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#f0e8d8', marginBottom: '3rem', lineHeight: 1,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          From hands to plate.<br />
          <em style={{ color: '#c4933f' }}>In real time.</em>
        </motion.h3>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            overflow: 'hidden',
            cursor: 'none',
          }}
          onClick={() => setPlaying(true)}
        >
          {/* Thumbnail / overlay */}
          {!playing && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(8,7,10,0.6)',
            }}>
              {/* Play button */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                style={{
                  width: 80, height: 80,
                  borderRadius: '50%',
                  border: '1px solid rgba(196,147,63,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                  background: 'rgba(196,147,63,0.1)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5.14v13.72L19 12 8 5.14z" fill="#c4933f" />
                </svg>
              </motion.div>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
                color: 'rgba(212,184,150,0.45)',
              }}>Add your recipe video here</p>
            </div>
          )}

          {/* Actual video embed goes here */}
          {playing && (
            <iframe
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              src="about:blank"
              title="Recipe video"
              allowFullScreen
            />
          )}
        </motion.div>

        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 10, color: 'rgba(212,184,150,0.3)',
          letterSpacing: '0.15em', marginTop: 16, textAlign: 'right',
        }}>Replace with YouTube / Vimeo embed URL</p>
      </div>
    </section>
  )
}

/* ── Main page ── */
export default function RecipePage() {
  const { id } = useParams()
  const recipe = RECIPES[id]

  if (!recipe) return <Navigate to="/" replace />

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <>
      <Cursor />
      <div style={{
        background: '#1a1614', color: 'rgba(240,238,234,0.65)',
        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
        fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 32, padding: '10px 20px', height: 36,
      }}>
        <span>✦ Quality instead of quantity</span>
        <span className="ann-hide">✦ 9,500 independent products</span>
        <span className="ann-hide">✦ No mainstream</span>
      </div>
      <Nav top={36} />

      <main style={{ paddingTop: 36 }}>

        {/* ── Hero ── */}
        <section ref={heroRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
          {/* Parallax image */}
          <motion.div
            style={{ position: 'absolute', inset: 0, scale: 1.15, y: heroY }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url("${recipe.hero}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
          </motion.div>

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,7,10,0.5) 0%, rgba(8,7,10,0.3) 40%, rgba(8,7,10,0.75) 100%)',
          }} />

          {/* Content */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(2rem, 8vw, 7rem)',
              paddingBottom: 'clamp(4rem, 10vw, 8rem)',
              opacity: heroOpacity,
            }}
          >
            <motion.p
              style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.45em',
                textTransform: 'uppercase', color: '#c4933f', marginBottom: '1.5rem',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {recipe.tag}
            </motion.p>

            <AnimatedTitle title={recipe.title} />

            <motion.p
              style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: '0.9rem', fontWeight: 300,
                color: 'rgba(240,238,234,0.6)',
                letterSpacing: '0.08em', marginBottom: '3rem',
                maxWidth: '50ch',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {recipe.subtitle}
            </motion.p>

            {/* Meta pills */}
            <motion.div
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
            >
              {[
                { label: 'Time', value: recipe.time },
                { label: 'Serves', value: recipe.serves },
                { label: 'Level', value: recipe.difficulty },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '8px 18px',
                  backdropFilter: 'blur(12px)',
                  background: 'rgba(255,255,255,0.06)',
                }}>
                  <p style={{
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase',
                    color: 'rgba(240,238,234,0.4)', marginBottom: 3,
                  }}>{label}</p>
                  <p style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1rem', color: '#f0eeea', fontWeight: 300,
                  }}>{value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{
              position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10,
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          >
            <span style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
              color: 'rgba(240,238,234,0.3)',
            }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(196,147,63,0.6) 0%, transparent 100%)' }}
            />
          </motion.div>
        </section>

        {/* ── Intro ── */}
        <IntroSection recipe={recipe} />

        {/* ── Ingredients ── */}
        <IngredientsSection recipe={recipe} />

        {/* ── Video ── */}
        <VideoSection />

        {/* ── Method ── */}
        <MethodSection recipe={recipe} />

        {/* ── Pairing + Oil ── */}
        <PairingSection recipe={recipe} />

        {/* ── Related ── */}
        <RelatedSection currentId={recipe.id} />

        {/* ── Back CTA ── */}
        <div style={{
          background: '#f0eeea',
          borderTop: '1px solid rgba(26,22,20,0.07)',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: 'rgba(26,22,20,0.3)', marginBottom: '2rem',
          }}>More from the journal</p>
          <Link to="/lifestyle" className="btn-primary">All Recipes &amp; Rituals</Link>
        </div>
      </main>

      <Footer />
    </>
  )
}

function IntroSection({ recipe }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} style={{
      background: '#1a1614',
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 8vw, 10rem)',
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <motion.div
          style={{ width: 48, height: 1, background: '#c4933f', opacity: 0.5, marginBottom: '3rem' }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
        <motion.p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            color: '#f0e8d8',
            lineHeight: 1.45,
            marginBottom: '3rem',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {recipe.intro}
        </motion.p>
        <motion.p
          style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: '0.92rem', fontWeight: 300,
            color: 'rgba(240,232,216,0.45)',
            lineHeight: 1.9, maxWidth: '60ch',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {recipe.story}
        </motion.p>
      </div>
    </section>
  )
}

function IngredientsSection({ recipe }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} style={{
      background: '#f8f7f5',
      padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 8vw, 10rem)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p
          style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: '#c4933f', marginBottom: 12,
          }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Ingredients
        </motion.p>
        <motion.h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#1a1614', marginBottom: '3.5rem', lineHeight: 1,
          }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          What you'll need.
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 2,
        }}>
          {recipe.ingredients.map((ing, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              style={{
                display: 'flex', gap: 20, alignItems: 'baseline',
                padding: '18px 0',
                borderBottom: '1px solid rgba(26,22,20,0.07)',
              }}
            >
              <span style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.15rem', fontWeight: 300, color: '#c4933f',
                minWidth: 80, flexShrink: 0,
              }}>{ing.qty}</span>
              <span style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: '0.88rem', fontWeight: 300,
                color: 'rgba(26,22,20,0.7)', lineHeight: 1.5,
              }}>{ing.item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MethodSection({ recipe }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section ref={ref} style={{
      background: '#fff',
      padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 8vw, 10rem)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p
          style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: '#c4933f', marginBottom: 12,
          }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Method
        </motion.p>
        <motion.h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#1a1614', marginBottom: '1rem', lineHeight: 1,
          }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          How to make it.
        </motion.h2>
        <motion.p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: '0.88rem', color: 'rgba(26,22,20,0.4)',
          letterSpacing: '0.1em', marginBottom: '3rem',
        }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Follow the steps. Trust the process.
        </motion.p>

        <div>
          {recipe.steps.map((step, i) => (
            <Step key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RelatedSection({ currentId }) {
  const related = Object.values(RECIPES).filter(r => r.id !== currentId)
  const [hovered, setHovered] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section ref={ref} style={{ background: '#f8f7f5', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 8vw, 10rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: 16 }}
        >
          <div>
            <p style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase',
              color: '#c4933f', marginBottom: 10,
            }}>Continue reading</p>
            <h3 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300, lineHeight: 0.92,
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              color: '#1a1614',
            }}>More from{'\n'}the Journal.</h3>
          </div>
          <Link to="/lifestyle" style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)',
            textDecoration: 'none', borderBottom: '1px solid rgba(26,22,20,0.15)',
            paddingBottom: 2, transition: 'color 0.25s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#c4933f'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.35)'}
          >See all →</Link>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1, background: 'rgba(26,22,20,0.07)' }}>
          {related.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.12 }}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ background: '#fff' }}
            >
              <Link to={`/recipe/${r.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                {/* Image */}
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <motion.div
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `url("${r.hero}")`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }}
                    animate={{ scale: hovered === r.id ? 1.05 : 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase',
                    color: 'rgba(240,238,234,0.9)',
                    background: 'rgba(10,9,8,0.48)',
                    backdropFilter: 'blur(6px)',
                    padding: '4px 10px',
                  }}>{r.category}</div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 22px 24px' }}>
                  <p style={{
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 8, letterSpacing: '0.38em', textTransform: 'uppercase',
                    color: '#c4933f', marginBottom: 10,
                  }}>{r.tag}</p>
                  <h4 style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 300, lineHeight: 0.92,
                    fontSize: 'clamp(1.4rem, 2vw, 2rem)',
                    color: '#1a1614', marginBottom: 10,
                    whiteSpace: 'pre-line',
                  }}>{r.title}</h4>
                  <p style={{
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: '0.86rem', fontWeight: 300,
                    color: 'rgba(26,22,20,0.4)', lineHeight: 1.55,
                    marginBottom: 16,
                  }}>{r.subtitle}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <motion.span
                      animate={{ x: hovered === r.id ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
                        color: hovered === r.id ? '#c4933f' : 'rgba(26,22,20,0.22)',
                        transition: 'color 0.25s',
                      }}
                    >Read →</motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PairingSection({ recipe }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} style={{
      background: '#08070a',
      padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 8vw, 10rem)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

        {/* Pairing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: '#c4933f', marginBottom: 12,
          }}>Pairing</p>
          <h3 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            color: '#f0e8d8', marginBottom: '1.5rem', lineHeight: 1.1,
          }}>{recipe.pairing.title}</h3>
          <p style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: '0.9rem', fontWeight: 300,
            color: 'rgba(240,232,216,0.45)', lineHeight: 1.85,
          }}>{recipe.pairing.body}</p>
        </motion.div>

        {/* Oil card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            border: '1px solid rgba(196,147,63,0.2)',
            padding: '36px 32px',
            background: 'rgba(196,147,63,0.04)',
          }}
        >
          <p style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: '#c4933f', marginBottom: 20,
          }}>The star ingredient</p>
          <h4 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, fontSize: '1.8rem',
            color: '#f0e8d8', marginBottom: 8, lineHeight: 1.1,
          }}>{recipe.oil.name}</h4>
          <p style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, letterSpacing: '0.25em',
            color: 'rgba(212,184,150,0.45)', marginBottom: 24,
          }}>{recipe.oil.origin}</p>
          <div style={{ width: 36, height: 1, background: 'rgba(196,147,63,0.4)', marginBottom: 24 }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {recipe.oil.notes.split(' · ').map(note => (
              <span key={note} style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#c4933f', border: '1px solid rgba(196,147,63,0.3)',
                padding: '4px 10px',
              }}>{note}</span>
            ))}
          </div>
          <Link to="/bestseller" style={{
            display: 'inline-block', marginTop: 28,
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#c4933f',
            textDecoration: 'none', borderBottom: '1px solid rgba(196,147,63,0.35)',
            paddingBottom: 2, cursor: 'none',
          }}>Shop this product →</Link>
        </motion.div>
      </div>
    </section>
  )
}
