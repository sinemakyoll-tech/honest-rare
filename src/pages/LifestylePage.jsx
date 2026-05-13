import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { RECIPES } from '../data/recipes'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'
import { useIsMobile } from '../hooks/useIsMobile'

const ALL = Object.values(RECIPES)
const FILTERS = ['All', 'Food', 'Cocktail']
const SEP = 'rgba(26,22,20,0.07)'

/* ── Minimal search bar ── */
function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{
      position: 'relative',
      borderBottom: `1px solid ${focused ? '#c4933f' : 'rgba(26,22,20,0.1)'}`,
      transition: 'border-color 0.4s ease',
    }}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search recipes, rituals, ingredients…"
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
          color: '#1a1614',
          padding: '22px 52px 18px 0',
          letterSpacing: '0.02em',
          cursor: 'text',
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(26,22,20,0.3)', fontSize: 20, lineHeight: 1, padding: 0,
          }}
        >×</button>
      )}
      <svg
        width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke={focused ? '#c4933f' : 'rgba(26,22,20,0.22)'}
        strokeWidth="1.5" strokeLinecap="round"
        style={{
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
          transition: 'stroke 0.4s ease', pointerEvents: 'none',
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </div>
  )
}

/* ── Filter tabs ── */
function FilterTabs({ active, onChange, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 22, marginBottom: 18 }}>
      {FILTERS.map((f, i) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase',
            color: active === f ? '#1a1614' : 'rgba(26,22,20,0.3)',
            fontWeight: active === f ? 700 : 400,
            padding: '6px 0 7px',
            marginRight: i < FILTERS.length - 1 ? 28 : 0,
            borderBottom: active === f ? '1px solid #c4933f' : '1px solid transparent',
            transition: 'all 0.25s ease',
          }}
        >{f}</button>
      ))}
      <span style={{
        marginLeft: 'auto',
        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
        fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase',
        color: 'rgba(26,22,20,0.2)',
      }}>{count} {count === 1 ? 'result' : 'results'}</span>
    </div>
  )
}

/* ── Recipe card ── */
function RecipeCard({ recipe, featured, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Link
        to={`/recipe/${recipe.id}`}
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {/* Image */}
        <div style={{
          position: 'relative',
          height: featured ? 'clamp(240px, 36vw, 480px)' : 'clamp(150px, 16vw, 240px)',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url("${recipe.hero}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            animate={{ scale: hovered ? 1.045 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <div style={{
            position: 'absolute', top: 14, left: 14,
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase',
            color: 'rgba(240,238,234,0.9)',
            background: 'rgba(10,9,8,0.48)',
            backdropFilter: 'blur(6px)',
            padding: '4px 10px',
          }}>{recipe.category}</div>
        </div>

        {/* Content */}
        <div style={{
          padding: featured ? 'clamp(18px, 2.5vw, 34px)' : '18px 20px 22px',
          flex: 1, display: 'flex', flexDirection: 'column',
        }}>
          <p style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 8, letterSpacing: '0.38em', textTransform: 'uppercase',
            color: '#c4933f', marginBottom: 10,
          }}>{recipe.tag}</p>

          <h3 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, lineHeight: 0.9,
            fontSize: featured ? 'clamp(1.8rem, 3vw, 3.2rem)' : 'clamp(1.4rem, 1.8vw, 2rem)',
            color: '#1a1614', marginBottom: 12,
            whiteSpace: 'pre-line',
          }}>{recipe.title}</h3>

          <p style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '0.86rem', fontWeight: 300,
            color: 'rgba(26,22,20,0.4)',
            lineHeight: 1.6, flex: 1, marginBottom: 16,
          }}>{recipe.subtitle}</p>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 14,
            borderTop: '1px solid rgba(26,22,20,0.06)',
          }}>
            <div style={{ display: 'flex', gap: 16 }}>
              {[recipe.time, recipe.serves].map((v, i) => (
                <span key={i} style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(26,22,20,0.28)',
                }}>{v}</span>
              ))}
            </div>
            <motion.span
              animate={{ x: hovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: hovered ? '#c4933f' : 'rgba(26,22,20,0.22)',
                transition: 'color 0.25s',
                flexShrink: 0, marginLeft: 12,
              }}
            >Read →</motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Main page ── */
export default function LifestylePage() {
  const [query, setQuery]         = useState('')
  const [activeFilter, setFilter] = useState('All')
  const [videoReady, setVideoReady] = useState(false)
  const isMobile                  = useIsMobile()
  const headerRef                 = useRef(null)
  const inView                    = useInView(headerRef, { once: true, margin: '-60px' })

  useEffect(() => {
    const t = setTimeout(() => setVideoReady(true), 2200)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return ALL.filter(r => {
      const matchSearch = !q ||
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.tag.toLowerCase().includes(q) ||
        r.intro.toLowerCase().includes(q)
      const matchFilter = activeFilter === 'All' || r.category === activeFilter
      return matchSearch && matchFilter
    })
  }, [query, activeFilter])

  return (
    <>
      <Cursor />
      <Nav top={36} />

      {/* ── Hero with YouTube background ── */}
      <section ref={headerRef} style={{
        background: '#f0eeea',
        padding: 'clamp(8rem, 15vw, 13rem) clamp(1.5rem, 8vw, 8rem) clamp(4rem, 8vw, 7rem)',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(26,22,20,0.07)',
      }}>
        {/* YouTube background video */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/m4o54JgYbV4?autoplay=1&mute=1&loop=1&playlist=m4o54JgYbV4&start=235&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0&cc_load_policy=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 'max(100%, 177.78vh)',
              height: 'calc(max(100%, 56.25vw) + 200px)',
              transform: 'translate(-50%, calc(-50% - 100px))',
              pointerEvents: 'none',
              border: 'none',
            }}
          />
          {/* Blocks Chrome media session overlay */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
        </div>
        {/* Cream overlay — starts fully opaque, fades after autoplay begins */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: '#f0eeea',
          opacity: videoReady ? 0.62 : 1,
          transition: 'opacity 1.4s ease',
        }} />

        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.6em', textTransform: 'uppercase',
              color: '#c4933f', marginBottom: '2.5rem',
            }}
          >The Journal · Honest &amp; Rare</motion.p>

          <h1 style={{ lineHeight: 0.95, marginBottom: '2.5rem' }}>
            {['What you bring home,', 'is who you are.'].map((line, li) => (
              <div key={li} style={{ overflow: 'hidden', paddingBottom: '0.55em', marginBottom: '-0.55em' }}>
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 1.05, delay: 0.1 + li * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 300,
                    fontSize: li === 0 ? 'clamp(2rem, 5.6vw, 6.8rem)' : 'clamp(2.8rem, 7.5vw, 9rem)',
                    letterSpacing: '0.06em',
                    whiteSpace: li === 0 ? 'nowrap' : 'normal',
                    color: li === 1 ? '#c4933f' : '#1a1614',
                    fontStyle: li === 1 ? 'italic' : 'normal',
                    display: 'block',
                  }}>{line}</span>
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.42 }}
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '0.88rem', fontWeight: 300,
              color: 'rgba(26,22,20,0.45)',
              lineHeight: 1.8, margin: '0 auto',
              maxWidth: '44ch',
            }}
          >
            Built around the table. Drinks that demand attention.
            Dishes that don't apologise. {ALL.length} stories, and counting.
          </motion.p>
        </div>
      </section>

      {/* ── Content area ── */}
      <section style={{ background: '#f0eeea', minHeight: '60vh' }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem) clamp(5rem, 10vw, 9rem)',
        }}>
          <SearchBar value={query} onChange={setQuery} />
          <FilterTabs active={activeFilter} onChange={setFilter} count={filtered.length} />

          <div style={{ width: '100%', height: 1, background: 'rgba(26,22,20,0.06)', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }} />

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '7rem 2rem' }}
              >
                <p style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  color: 'rgba(26,22,20,0.2)', marginBottom: 14,
                }}>Nothing here yet.</p>
                <p style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '0.88rem', fontWeight: 300,
                  color: 'rgba(26,22,20,0.3)',
                }}>Try a different search or clear the filter.</p>
              </motion.div>
            ) : isMobile ? (
              <motion.div
                key="mobile-stack"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 1, background: SEP }}
              >
                {filtered.map((r, i) => <RecipeCard key={r.id} recipe={r} featured={false} index={i} />)}
              </motion.div>
            ) : filtered.length === 1 ? (
              <motion.div key="single" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ maxWidth: 620 }}>
                <RecipeCard recipe={filtered[0]} featured={false} index={0} />
              </motion.div>
            ) : (
              <motion.div
                key="editorial"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', gap: 1, background: SEP, alignItems: 'stretch' }}
              >
                {/* Featured 2/3 */}
                <div style={{ flex: 2 }}>
                  <RecipeCard recipe={filtered[0]} featured index={0} />
                </div>
                {/* Sidebar 1/3 */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {filtered.slice(1).map((r, i) => (
                    <RecipeCard key={r.id} recipe={r} featured={false} index={i + 1} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  )
}
