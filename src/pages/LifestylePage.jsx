import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useSpring, AnimatePresence } from 'motion/react'
import { RECIPES } from '../data/recipes'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'
import LifestyleProjects from '../components/LifestyleProjects'
import { useIsMobile } from '../hooks/useIsMobile'

const ALL = Object.values(RECIPES)
const SEP = 'rgba(26,22,20,0.07)'
const TRENDING_IDS = [ALL[1]?.id, ALL[3]?.id].filter(Boolean)

function norm(str = '') {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/æ/gi, 'ae').replace(/œ/gi, 'oe').replace(/ø/gi, 'o')
    .replace(/ß/gi, 'ss').replace(/þ/gi, 'th').replace(/ð/gi, 'd')
}

function getReadTime(recipe) {
  const text = [recipe.intro, recipe.story, ...(recipe.steps || []).map(s => s.body)]
    .filter(Boolean).join(' ')
  return Math.max(3, Math.ceil(text.split(/\s+/).length / 200))
}

/* ── Reading progress bar ── */
function ReadingProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 2, background: 'linear-gradient(90deg, #c4933f 0%, #d4b896 100%)',
      transformOrigin: '0%', scaleX, zIndex: 9999, pointerEvents: 'none',
    }} />
  )
}

/* ── Search bar ── */
function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false)
  const active = focused || !!value

  return (
    <div
      style={{
        position: 'relative',
        background: active ? 'rgba(196,147,63,0.07)' : 'transparent',
        borderBottom: `1px solid ${active ? '#c4933f' : 'rgba(26,22,20,0.18)'}`,
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search recipes, rituals, ingredients…"
        style={{
          width: '100%', background: 'transparent', border: 'none', outline: 'none',
          fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic',
          fontWeight: 300, fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
          color: active ? '#1a1614' : 'rgba(26,22,20,0.45)',
          padding: '22px 48px 18px 0',
          letterSpacing: '0.02em', cursor: 'text',
          transition: 'color 0.4s ease',
        }}
      />
      {value && (
        <button onClick={() => onChange('')} style={{
          position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(26,22,20,0.35)', fontSize: 20, lineHeight: 1, padding: 0,
        }}>×</button>
      )}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke={active ? '#c4933f' : 'rgba(26,22,20,0.3)'}
        strokeWidth="1.5" strokeLinecap="round"
        style={{
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
          transition: 'stroke 0.4s ease', pointerEvents: 'none',
        }}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    </div>
  )
}

/* ── Recipe card (with reading time + trending) ── */
function RecipeCard({ recipe, featured, index, trending }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const [hovered, setHovered] = useState(false)
  const readTime = getReadTime(recipe)

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{
          position: 'relative',
          height: featured ? 'clamp(240px, 36vw, 480px)' : 'clamp(150px, 16vw, 240px)',
          overflow: 'hidden', flexShrink: 0,
        }}>
          <motion.div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("${recipe.hero}")`, backgroundSize: 'cover', backgroundPosition: 'center',
          }} animate={{ scale: hovered ? 1.045 : 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <div style={{
            position: 'absolute', top: 14, left: 14,
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase',
            color: 'rgba(240,238,234,0.9)', background: 'rgba(10,9,8,0.48)',
            backdropFilter: 'blur(6px)', padding: '4px 10px',
          }}>{recipe.category}</div>
          {trending && (
            <div style={{
              position: 'absolute', top: 14, right: 14,
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase',
              color: '#c4933f', background: 'rgba(240,238,234,0.94)', padding: '4px 10px',
            }}>↑ Trending</div>
          )}
        </div>
        <div style={{ padding: featured ? 'clamp(18px, 2.5vw, 34px)' : '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.38em', textTransform: 'uppercase', color: '#c4933f', marginBottom: 10 }}>{recipe.tag}</p>
          <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, lineHeight: 0.9, fontSize: featured ? 'clamp(1.8rem, 3vw, 3.2rem)' : 'clamp(1.4rem, 1.8vw, 2rem)', color: '#1a1614', marginBottom: 12, whiteSpace: 'pre-line' }}>{recipe.title}</h3>
          <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: '0.86rem', fontWeight: 300, color: 'rgba(26,22,20,0.4)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{recipe.subtitle}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(26,22,20,0.06)' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              {[recipe.time, recipe.serves].map((v, i) => (
                <span key={i} style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.28)' }}>{v}</span>
              ))}
              <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(196,147,63,0.65)' }}>{readTime} min read</span>
            </div>
            <motion.span animate={{ x: hovered ? 5 : 0 }} transition={{ duration: 0.3 }}
              style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: hovered ? '#c4933f' : 'rgba(26,22,20,0.22)', transition: 'color 0.25s', flexShrink: 0, marginLeft: 12 }}
            >Read →</motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Magazine grid ── */
function MagazineGrid({ recipes, isMobile }) {
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: SEP }}>
        {recipes.map((r, i) => <RecipeCard key={r.id} recipe={r} featured={false} index={i} trending={TRENDING_IDS.includes(r.id)} />)}
      </div>
    )
  }

  const rows = []
  let i = 0, rowIndex = 0

  while (i < recipes.length) {
    const pattern = rowIndex % 3
    if (pattern === 0) {
      rows.push(
        <motion.div key={`row-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: rowIndex * 0.06 }}
          style={{ display: 'flex', gap: 1, alignItems: 'stretch' }}>
          <div style={{ flex: 60, minWidth: 0 }}><RecipeCard recipe={recipes[i]} featured index={i} trending={TRENDING_IDS.includes(recipes[i]?.id)} /></div>
          {recipes[i + 1] && <div style={{ flex: 40, minWidth: 0 }}><RecipeCard recipe={recipes[i + 1]} featured index={i + 1} trending={TRENDING_IDS.includes(recipes[i + 1]?.id)} /></div>}
        </motion.div>
      )
      i += 2
    } else if (pattern === 1) {
      rows.push(
        <motion.div key={`row-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: rowIndex * 0.06 }}
          style={{ display: 'flex', gap: 1, alignItems: 'stretch' }}>
          {[recipes[i], recipes[i + 1], recipes[i + 2]].filter(Boolean).map((r, j) => (
            <div key={r.id} style={{ flex: 1, minWidth: 0 }}><RecipeCard recipe={r} featured={false} index={i + j} trending={TRENDING_IDS.includes(r.id)} /></div>
          ))}
        </motion.div>
      )
      i += 3
    } else {
      rows.push(
        <motion.div key={`row-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: rowIndex * 0.06 }}
          style={{ display: 'flex', gap: 1, alignItems: 'stretch' }}>
          {recipes[i + 1] && <div style={{ flex: 40, minWidth: 0 }}><RecipeCard recipe={recipes[i]} featured index={i} trending={TRENDING_IDS.includes(recipes[i]?.id)} /></div>}
          <div style={{ flex: recipes[i + 1] ? 60 : 100, minWidth: 0 }}><RecipeCard recipe={recipes[i + 1] || recipes[i]} featured index={i + 1} trending={TRENDING_IDS.includes((recipes[i + 1] || recipes[i])?.id)} /></div>
        </motion.div>
      )
      i += 2
    }
    rowIndex++
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 1, background: SEP }}>
      {rows}
    </motion.div>
  )
}

/* ── Editorial mosaic cell ── */
function MosaicCell({ area, tag, title, desc, media, isVideo, videoSrc, large, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', gridArea: area, cursor: 'none' }}
    >
      {/* Media */}
      {isVideo ? (
        <video autoPlay muted loop playsInline poster={media}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${media}")`, backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
      )}

      {/* Always-on bottom gradient */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,8,6,0.88) 0%, rgba(10,8,6,0.18) 45%, transparent 70%)',
        transition: 'opacity 0.5s', opacity: hovered ? 0 : 1 }} />

      {/* Hover overlay — full dark wash */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,6,0.72)',
        transition: 'opacity 0.45s ease', opacity: hovered ? 1 : 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
        padding: '28px 30px' }}>
        <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7, letterSpacing: '0.5em',
          textTransform: 'uppercase', color: '#c4933f', marginBottom: 14,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'transform 0.45s ease 0.05s' }}>
          {tag}
        </span>
        <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, lineHeight: 1.05,
          fontSize: large ? 'clamp(2rem, 3vw, 3.2rem)' : 'clamp(1.35rem, 1.8vw, 2rem)',
          color: '#f0e8d8', margin: '0 0 14px', whiteSpace: 'pre-line',
          transform: hovered ? 'translateY(0)' : 'translateY(10px)', transition: 'transform 0.45s ease 0.08s' }}>
          {title}
        </h3>
        <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: '0.78rem', fontWeight: 300,
          color: 'rgba(240,232,216,0.55)', lineHeight: 1.75, maxWidth: 300,
          transform: hovered ? 'translateY(0)' : 'translateY(12px)', transition: 'transform 0.45s ease 0.12s',
          opacity: hovered ? 1 : 0 }}>
          {desc}
        </p>
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10,
          opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease 0.2s' }}>
          <span style={{ display: 'block', height: 1, width: 28, background: '#c4933f' }} />
          <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7,
            letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c4933f' }}>Read</span>
        </div>
      </div>

      {/* Default bottom label — tag + title */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 24px 20px',
        opacity: hovered ? 0 : 1, transition: 'opacity 0.3s', pointerEvents: 'none' }}>
        <span style={{ display: 'block', fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7,
          letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(196,147,63,0.85)', marginBottom: 6 }}>
          {tag}
        </span>
        <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, lineHeight: 1.05,
          fontSize: large ? 'clamp(1.9rem, 2.8vw, 3rem)' : 'clamp(1.15rem, 1.5vw, 1.7rem)',
          color: '#f0e8d8', margin: 0, whiteSpace: 'pre-line' }}>
          {title}
        </h3>
      </div>
    </motion.div>
  )
}

/* ── For Food Enjoyers — full-bleed video banner ── */
function ForFoodEnjoyers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const FOOD_RECIPES = ALL.filter(r => r.category === 'Food')
  const shown = (FOOD_RECIPES.length >= 3 ? FOOD_RECIPES : ALL).slice(0, 3)

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0d0b09' }}>
      {/* Full-bleed video */}
      <div style={{ position: 'relative', height: 'clamp(520px, 80vh, 900px)', overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=90&auto=format&fit=crop"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        >
          <source src="/bbq-loop.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,11,9,0.82) 0%, rgba(13,11,9,0.3) 60%, rgba(13,11,9,0.55) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, #0d0b09 0%, transparent 100%)' }} />

        {/* Text content */}
        <div ref={ref} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(2rem, 5vw, 5rem) clamp(2rem, 6vw, 6rem) clamp(3rem, 6vw, 5.5rem)' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#c4933f', marginBottom: 18 }}
          >
            Curated for the table
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: '"Born Ready Slanted", serif', fontWeight: 400, fontSize: 'clamp(3.5rem, 9vw, 9rem)', color: '#f0eeea', lineHeight: 0.92, margin: '0 0 20px', letterSpacing: '-0.01em' }}
          >
            For Food<br />
            <span style={{ color: 'rgba(240,238,234,0.28)' }}>Enjoyers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.22 }}
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)', color: 'rgba(240,238,234,0.6)', maxWidth: 520, lineHeight: 1.6 }}
          >
            Dishes that deserve a great drink. Moments worth slowing down for.
          </motion.p>
        </div>

        {/* Side label */}
        <div style={{ position: 'absolute', right: 'clamp(1.5rem, 4vw, 4rem)', top: '50%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ display: 'block', width: 48, height: 1, background: 'rgba(240,238,234,0.2)' }} />
          <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.3)' }}>Food · Craft</span>
          <span style={{ display: 'block', width: 48, height: 1, background: 'rgba(240,238,234,0.2)' }} />
        </div>
      </div>

      {/* Recipe cards below video */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#0d0b09', padding: '2px 0' }}>
        {shown.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18 + i * 0.1 }}
          >
            <Link to={`/recipe/${r.id}`} style={{ display: 'block', position: 'relative', height: 300, overflow: 'hidden', textDecoration: 'none', cursor: 'pointer' }}>
              <div
                style={{ position: 'absolute', inset: 0, backgroundImage: `url(${r.hero})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.7s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,11,9,0.88) 0%, rgba(13,11,9,0.1) 55%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px' }}>
                <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c4933f', margin: '0 0 8px' }}>
                  {r.category || 'Recipe'} · {r.difficulty || 'Easy'}
                </p>
                <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400, fontSize: '1.35rem', color: '#f0eeea', margin: 0, lineHeight: 1.2 }}>
                  {r.title}
                </h3>
              </div>
              <div style={{ position: 'absolute', top: 20, left: 20, fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.45)', background: 'rgba(13,11,9,0.55)', padding: '5px 10px', backdropFilter: 'blur(8px)' }}>
                0{i + 1}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ── Editorial mosaic ── */
function EditorialMosaic() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const CELLS = [
    { area: 'bbq',      tag: 'Summer · Social',        title: 'Fire &\nSlow Time',           desc: 'Smoke, embers, craft beer in hand. The ritual of a grill night done right.',          media: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=90&auto=format&fit=crop', isVideo: true, videoSrc: '/fire-loop.mp4', large: true,  delay: 0 },
    { area: 'beer',     tag: 'Craft · Germany',         title: 'Small Batch\nBrewing',         desc: 'From Franconian cellars to your glass — unfiltered, uncompromised.',                   media: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&q=90&auto=format&fit=crop', isVideo: false,               delay: 0.06 },
    { area: 'spirits',  tag: 'Spirits · Independent',   title: 'Distilled\nWith Purpose',      desc: 'Every drop tells the story of a maker who chose craft over scale.',                   media: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=90&auto=format&fit=crop', isVideo: false,               delay: 0.12 },
    { area: 'afterwork',tag: 'Everyday · Ritual',       title: 'After-Work\nUnwind',           desc: 'The moment the day earns its reward. A craft beer worth the wait.',                   media: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=1200&q=90&auto=format&fit=crop', isVideo: false,               delay: 0.05 },
    { area: 'wine',     tag: 'Social · Evening',        title: 'Gathered Around\nthe Table',   desc: 'The wines that make a room feel smaller and a night feel longer.',                    media: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=90&auto=format&fit=crop', isVideo: false,               delay: 0.10 },
    { area: 'morning',  tag: 'Morning · Ritual',        title: 'Before the\nDay Begins',       desc: 'Espresso, silence, and the first honest moment of the day.',                         media: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=90&auto=format&fit=crop', isVideo: false,               delay: 0.08 },
    { area: 'cocktail', tag: 'Cocktail · Evening',      title: 'Craft in\nEvery Glass',        desc: 'Seasonal botanicals, hand-pressed citrus, and spirits that actually have something to say.', media: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1600&q=90&auto=format&fit=crop', isVideo: true, videoSrc: '/bg-cocktail.mp4', large: true, delay: 0.09 },
    { area: 'evening',  tag: 'Night · Social',          title: 'Last Call\nof the Evening',    desc: 'The bar, the conversation, the drink worth lingering over.',                          media: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&q=90&auto=format&fit=crop', isVideo: false,               delay: 0.14 },
    { area: 'maker',    tag: 'Artisan · Craft',         title: 'Made by\nHand',               desc: 'The people behind the product — independent, obsessive, and worth knowing.',         media: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=90&auto=format&fit=crop', isVideo: false,               delay: 0.18 },
    { area: 'food',     tag: 'Gourmet · Discovery',     title: 'Table Worth\nRemembering',     desc: 'Rare ingredients, independent makers, dishes that deserve great wine.',               media: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90&auto=format&fit=crop', isVideo: false,               delay: 0.22 },
  ]

  return (
    <section style={{ background: '#0d0b09' }}>
      <div ref={ref} style={{ padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem) clamp(2.5rem, 4vw, 4rem)' }}>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.48em', textTransform: 'uppercase', color: '#c4933f', marginBottom: 14 }}>Moments</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2.2rem, 3.5vw, 4rem)', color: '#f0e8d8', lineHeight: 1.05, margin: 0 }}>
          Life through the lens<br /><em style={{ fontStyle: 'italic', color: '#d4b896' }}>of honest makers.</em>
        </motion.h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateAreas: `
          "bbq  bbq      beer    spirits"
          "bbq  bbq      afterwork  wine"
          "morning  cocktail  cocktail  evening"
          "maker  food  food  food"
        `,
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '255px 255px 300px 265px',
        gap: 2,
      }}>
        {CELLS.map(cell => <MosaicCell key={cell.area} {...cell} />)}
      </div>

      {/* Click for more */}
      <motion.div
        initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 5rem)' }}
      >
        <Link to="/bestseller" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 22, cursor: 'none' }}
          onMouseEnter={e => { e.currentTarget.querySelector('span.line').style.width = '80px'; e.currentTarget.querySelector('span.label').style.color = '#c4933f' }}
          onMouseLeave={e => { e.currentTarget.querySelector('span.line').style.width = '48px'; e.currentTarget.querySelector('span.label').style.color = 'rgba(240,238,234,0.45)' }}
        >
          <span className="line" style={{ display: 'block', height: 1, width: 48, background: 'rgba(196,147,63,0.4)', transition: 'width 0.4s ease' }} />
          <span className="label" style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.45)', transition: 'color 0.4s ease' }}>
            Explore All
          </span>
          <span className="line" style={{ display: 'block', height: 1, width: 48, background: 'rgba(196,147,63,0.4)', transition: 'width 0.4s ease' }} />
        </Link>
      </motion.div>
    </section>
  )
}

/* ── ROOM 2: Featured Story (The Salon) ── */
function FeaturedStory({ isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [hovered, setHovered] = useState(false)
  const featured = ALL[0]
  if (!featured) return null
  const readTime = getReadTime(featured)

  return (
    <section style={{ background: '#f0eeea', overflow: 'hidden' }}>
      {/* Header strip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 2.5rem)',
        padding: 'clamp(2.2rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 5rem) clamp(1.5rem, 2.5vw, 2rem)',
        borderTop: '1px solid rgba(26,22,20,0.06)',
      }}>
        <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#c4933f', margin: 0, flexShrink: 0 }}>
          Editor's Choice
        </p>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,22,20,0.08)' }} />
        {!isMobile && (
          <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(26,22,20,0.32)', margin: 0, flexShrink: 0 }}>
            May 2026
          </p>
        )}
      </div>

      {/* Main feature — replace image src with /lifestyle-salon.jpg when ready */}
      <Link to={`/recipe/${featured.id}`}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ display: 'block', textDecoration: 'none' }}
      >
        <div ref={ref} style={{
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: isMobile ? undefined : '1.2fr 0.8fr',
          flexDirection: isMobile ? 'column' : undefined,
        }}>
          {/* Image */}
          <div style={{ position: 'relative', height: isMobile ? '62vw' : 'clamp(460px, 60vh, 720px)', overflow: 'hidden' }}>
            <motion.div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url("${featured.hero}")`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} animate={{ scale: hovered ? 1.04 : 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,8,6,0.28) 0%, transparent 55%)' }} />
            {/* Ghost number */}
            <div style={{
              position: 'absolute', bottom: 12, left: 20,
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(7rem, 16vw, 14rem)', fontWeight: 300,
              color: 'rgba(240,238,234,0.09)', lineHeight: 1,
              userSelect: 'none', letterSpacing: '-0.05em',
            }}>01</div>
          </div>

          {/* Text panel */}
          <div style={{
            padding: isMobile
              ? 'clamp(2rem, 6vw, 3rem) clamp(1.5rem, 5vw, 2.5rem)'
              : 'clamp(4rem, 7vw, 6rem) clamp(3rem, 6vw, 5rem)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            background: '#f0eeea',
          }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.48em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)', marginBottom: 'clamp(1rem, 2vw, 1.6rem)' }}>
              {featured.tag}
            </motion.p>

            <div style={{ overflow: 'hidden', marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              <motion.h2 initial={{ y: '110%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 1.05, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, lineHeight: 0.9, fontSize: 'clamp(2.8rem, 5.5vw, 6.5rem)', color: '#1a1614', margin: 0, whiteSpace: 'pre-line' }}>
                {featured.title}
              </motion.h2>
            </div>

            <motion.span initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.7, delay: 0.42 }}
              style={{ display: 'block', width: 48, height: 1, background: '#c4933f', transformOrigin: 'left', marginBottom: 'clamp(1.2rem, 2.5vw, 2rem)' }} />

            <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
              style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontWeight: 300, fontSize: 'clamp(0.85rem, 1vw, 0.93rem)', color: 'rgba(26,22,20,0.48)', lineHeight: 1.95, maxWidth: '40ch', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
              {featured.intro}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.62 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
                {[featured.time, featured.serves, `${readTime} min read`].map((v, idx) => (
                  <span key={idx} style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: idx === 2 ? '#c4933f' : 'rgba(26,22,20,0.28)' }}>{v}</span>
                ))}
              </div>
              <motion.span animate={{ x: hovered ? 7 : 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: hovered ? '#c4933f' : '#1a1614', transition: 'color 0.3s', borderBottom: '1px solid currentColor', paddingBottom: 2 }}>
                Read the story →
              </motion.span>
            </motion.div>
          </div>
        </div>
      </Link>
      <div style={{ height: 1, background: 'rgba(26,22,20,0.06)' }} />
    </section>
  )
}

/* ── ROOM 3: AI Curated Strip (The Gallery) ── */
function AIPickCard({ recipe, image, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const readTime = getReadTime(recipe)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ flexShrink: 0, width: 'clamp(240px, 22vw, 310px)' }}
    >
      <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ position: 'relative', height: 'clamp(310px, 32vw, 430px)', overflow: 'hidden' }}>
          <motion.div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.04) 55%, transparent 100%)' }} />

          {/* Read time badge */}
          <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.85)', background: 'rgba(10,8,6,0.52)', backdropFilter: 'blur(8px)', padding: '4px 9px' }}>
            {readTime} min
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 22px 24px' }}>
            <span style={{ display: 'block', fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(196,147,63,0.9)', marginBottom: 9 }}>{recipe.tag}</span>
            <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, lineHeight: 1.0, fontSize: 'clamp(1.4rem, 2vw, 1.85rem)', color: '#f0e8d8', margin: 0, whiteSpace: 'pre-line' }}>{recipe.title}</h3>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(240,238,234,0.07)', padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,232,216,0.2)' }}>{recipe.category}</span>
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }}
            style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 12, color: hovered ? '#c4933f' : 'rgba(240,232,216,0.22)', transition: 'color 0.25s' }}>→</motion.span>
        </div>
      </Link>
    </motion.div>
  )
}

function AICuratedStrip({ isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const picks = ALL.slice(1)

  const onMouseDown = (e) => {
    setIsDragging(true)
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }
  const onMouseUp = () => setIsDragging(false)
  const onMouseLeave = () => setIsDragging(false)
  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
  }

  return (
    <section ref={ref} style={{ background: '#1a1614', padding: 'clamp(3rem, 6vw, 5rem) 0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 clamp(1.5rem, 5vw, 5rem)', marginBottom: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c4933f', border: '1px solid rgba(196,147,63,0.28)', padding: '4px 10px' }}>
              ✦ Curated
            </span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(1.9rem, 3.2vw, 3.2rem)', color: '#f0e8d8', lineHeight: 1.05, margin: 0 }}>
            This week's picks<br /><em style={{ fontStyle: 'italic', color: '#d4b896' }}>for you.</em>
          </motion.h2>
        </div>
        {!isMobile && (
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: '0.76rem', fontWeight: 300, color: 'rgba(240,232,216,0.25)', maxWidth: '24ch', textAlign: 'right', lineHeight: 1.9 }}>
            Drag to explore ←→<br />Updated weekly
          </motion.p>
        )}
      </div>

      {/* Scrollable strip */}
      <div ref={scrollRef}
        onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}
        style={{ display: 'flex', gap: 2, overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', padding: `0 clamp(1.5rem, 5vw, 5rem)`, cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}>
        {picks.map((recipe, i) => (
          <AIPickCard key={recipe.id} recipe={recipe} image={recipe.hero} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}

/* ── Mood filter tabs ── */
function MoodFilter({ active, onChange }) {
  const MOODS = [
    { key: 'ALL', label: 'All Stories' },
    { key: 'Cocktail', label: 'Cocktails' },
    { key: 'Food', label: 'Food' },
  ]

  return (
    <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
      {MOODS.map(m => (
        <button key={m.key} onClick={() => onChange(m.key)} style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase',
          background: 'none', border: 'none', cursor: 'pointer', padding: '12px 24px 10px',
          color: active === m.key ? '#1a1614' : 'rgba(26,22,20,0.28)',
          borderBottom: active === m.key ? '1px solid #c4933f' : '1px solid rgba(26,22,20,0.08)',
          transition: 'color 0.25s, border-color 0.25s', flexShrink: 0,
        }}>{m.label}</button>
      ))}
      <div style={{ flex: 1, borderBottom: '1px solid rgba(26,22,20,0.08)' }} />
      <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.22)', padding: '12px 0 10px', borderBottom: '1px solid rgba(26,22,20,0.08)', flexShrink: 0, alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
        {ALL.length} stories
      </span>
    </div>
  )
}

/* ── Main page ── */
export default function LifestylePage() {
  const [query, setQuery] = useState('')
  const [activeMood, setActiveMood] = useState('ALL')
  const isMobile = useIsMobile()
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-60px' })

  const filtered = useMemo(() => {
    const q = norm(query.trim())
    return ALL.filter(r => {
      const matchesSearch = !q ||
        norm(r.title).includes(q) ||
        norm(r.subtitle).includes(q) ||
        norm(r.tag).includes(q) ||
        norm(r.intro).includes(q)
      const matchesMood = activeMood === 'ALL' || r.category === activeMood
      return matchesSearch && matchesMood
    })
  }, [query, activeMood])

  return (
    <>
      <ReadingProgressBar />
      <Cursor />
      <Nav top={0} showToggle={false} />

      {/* ── ROOM 1: THE ATRIUM — Hero ── */}
      <section ref={headerRef} style={{ background: '#f0eeea', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <video autoPlay muted loop playsInline style={{ position: 'absolute', top: '50%', left: '50%', width: 'max(100%, 177.78vh)', height: 'max(100%, 56.25vw)', transform: 'translate(-50%, -50%)', objectFit: 'cover', pointerEvents: 'none' }}>
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(240,238,234,0.62)' }} />

        <div style={{ maxWidth: 1400, width: '100%', padding: '0 clamp(1.5rem, 8vw, 8rem)', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
            style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.6em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.5)', marginBottom: '2.5rem' }}>
            The Journal · Honest &amp; Rare
          </motion.p>

          <h1 style={{ lineHeight: 0.95, marginBottom: '2.5rem' }}>
            {['What you bring home,', 'is who you are.'].map((line, li) => (
              <div key={li} style={{ overflow: li === 1 ? 'visible' : 'hidden', paddingBottom: '0.55em', marginBottom: '-0.55em' }}>
                <motion.span style={{ display: 'block' }}
                  initial={{ y: '110%', opacity: li === 1 ? 0 : 1 }}
                  animate={inView ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 1.05, delay: 0.1 + li * 0.15, ease: [0.16, 1, 0.3, 1] }}>
                  <span className={li === 0 ? 'lifestyle-first-line' : ''} style={{
                    fontFamily: li === 1 ? '"Born Ready Slanted", cursive' : '"Cormorant Garamond", Georgia, serif',
                    fontWeight: li === 1 ? 400 : 300, fontStyle: 'normal',
                    fontSize: li === 0 ? 'clamp(2rem, 5.6vw, 6.8rem)' : 'clamp(2.8rem, 7.5vw, 9rem)',
                    letterSpacing: li === 1 ? '-0.01em' : '0.06em',
                    whiteSpace: li === 0 ? 'nowrap' : 'normal',
                    color: '#1a1614', display: 'block',
                  }}>{line}</span>
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.42 }}
            style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(26,22,20,0.45)', lineHeight: 1.8, margin: '0 auto', maxWidth: '44ch' }}>
            Built around the table. Drinks that demand attention. Dishes that don't apologise. {ALL.length} stories, and counting.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.2 }}
          style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}>
          <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)' }}>Scroll</span>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(196,147,63,0.5) 0%, transparent 100%)' }} />
        </motion.div>
      </section>

      {/* ── ROOM 2: THE SALON — Featured Story ── */}
      <FeaturedStory isMobile={isMobile} />

      {/* ── ROOM 3: THE GALLERY — AI Curated Strip ── */}
      <AICuratedStrip isMobile={isMobile} />

      {/* ── ROOM 4: THE GREAT HALL — Editorial Mosaic ── */}
      <EditorialMosaic />

      {/* ── ROOM 5: THE CHAMBERS — Full Viewport Panels ── */}
      <LifestyleProjects />

      {/* ── ROOM 5.5: FOR FOOD ENJOYERS — Video Banner ── */}
      <ForFoodEnjoyers />

      {/* ── ROOM 6: THE ARCHIVE — Discovery Engine ── */}
      <section style={{ background: '#f0eeea', minHeight: '60vh' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem) clamp(6rem, 12vw, 10rem)' }}>

          {/* Archive heading */}
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', borderBottom: '1px solid rgba(26,22,20,0.06)', paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#c4933f', marginBottom: 10 }}>
              The Archive
            </p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2.2rem, 4vw, 4rem)', color: '#1a1614', lineHeight: 1.0, margin: 0 }}>
              Every story,<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(26,22,20,0.38)' }}>every ritual.</em>
            </h2>
          </div>

          <MoodFilter active={activeMood} onChange={setActiveMood} />
          <SearchBar value={query} onChange={setQuery} />
          <div style={{ width: '100%', height: 1, background: 'rgba(26,22,20,0.06)', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }} />

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '7rem 2rem' }}>
                <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'rgba(26,22,20,0.2)', marginBottom: 14 }}>Nothing here yet.</p>
                <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(26,22,20,0.3)' }}>Try a different filter or clear the search.</p>
              </motion.div>
            ) : isMobile ? (
              <motion.div key="mobile-stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 1, background: SEP }}>
                {filtered.map((r, i) => <RecipeCard key={r.id} recipe={r} featured={false} index={i} trending={TRENDING_IDS.includes(r.id)} />)}
              </motion.div>
            ) : filtered.length === 1 ? (
              <motion.div key="single" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: 620 }}>
                <RecipeCard recipe={filtered[0]} featured={false} index={0} trending={TRENDING_IDS.includes(filtered[0].id)} />
              </motion.div>
            ) : (
              <MagazineGrid key={`grid-${activeMood}`} recipes={filtered} isMobile={isMobile} />
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  )
}
