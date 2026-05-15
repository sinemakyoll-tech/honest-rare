import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'motion/react'
import RainbowGlassButton from './RainbowGlassButton'

const PROJECTS = [
  {
    num: '01',
    id: 'the-mountain-mule',
    type: 'cocktail',
    tag: 'Cocktail · Mountain Ritual',
    title: 'The Mountain\nMule',
    subtitle: 'Fat-Washed Vodka & Wild Elderflower',
    desc: `Fat-washed vodka sounds complicated. It isn't. You pour the oil in, wait 72 hours, skim it off — and suddenly your vodka tastes like nothing you've had before. Herbal. Soft. Impossibly smooth. Mix it with hand-pressed ginger and wild elderflower. That's it. You've peaked.`,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1920&q=85&auto=format&fit=crop',
    fallback: '#090c15',
    cards: [
      { head: 'What you need', body: '60ml fat-washed vodka\n20ml fresh ginger juice\n15ml elderflower cordial\nMountain mint · Ice' },
      { head: 'The technique', body: 'Mix H&R Biologico with vodka\nChill 72h · Skim & cold-strain\nShake hard over crushed ice' },
      { head: 'Serve', body: 'Chilled copper mug\nFresh mint sprig\nSlice of lime' },
    ],
    flip: true,
  },
  {
    num: '02',
    id: 'carpaccio-di-manzo',
    type: 'recipe',
    tag: 'Recipe · Winter Table',
    title: 'Carpaccio\ndi Manzo',
    subtitle: 'Four ingredients. Zero cooking. All flavour.',
    desc: `This is the dish you make when you want to look like you tried very hard — and didn't try at all. A great piece of beef, a microplane, some rocket, and the best olive oil you'll ever pour. Let it do the talking. Twenty minutes, and everyone thinks you're a chef.`,
    image: 'https://images.unsplash.com/photo-1727243866425-3bf2cbf7480a?w=1920&q=95&auto=format&fit=crop',
    fallback: '#0d1209',
    cards: [
      { head: 'What you need', body: '300g Chianina beef fillet\nHandful of wild rocket\n60g Parmigiano Reggiano\nH&R Riserva · Sea salt · Pepper' },
      { head: 'How to', body: 'Freeze beef 25 min · Slice paper-thin\nArrange on cold plate\nDrizzle Riserva · Shave Parmigiano\nScatter rocket · Serve immediately' },
      { head: 'The oil', body: 'H&R Riserva 2022\nCentennial Frantoio · Chianti\nArtichoke · Fresh Pepper · Dried Fig' },
    ],
    flip: false,
  },
  {
    num: '03',
    id: 'the-alpine-negroni',
    type: 'cocktail',
    tag: 'Cocktail · Après-Ski',
    title: 'The Alpine\nNegroni',
    subtitle: 'We ruined a perfect drink. On purpose.',
    desc: `A Negroni is already perfect. We made it better — smoke the Campari, wash the rim with Affumicato, add an alpine gin that tastes like a pine forest in a glass. Serve over ice you cut yourself, if you're that kind of person. You know who you are.`,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=85&auto=format&fit=crop',
    fallback: '#150a03',
    cards: [
      { head: 'What you need', body: '30ml smoked Campari\n30ml alpine gin\n30ml sweet vermouth\nH&R Affumicato · Orange peel' },
      { head: 'How to', body: 'Smoke Campari with rosemary\nStir all spirits over ice 40 sec\nRim glass with H&R Affumicato\nStrain · Hand-cut ice · Orange peel' },
      { head: 'Serve', body: 'Fireside or après-ski terrace\nLow glass · Hand-cut ice\nFresh rosemary smoke' },
    ],
    flip: true,
  },
]

/* ── Card stack — cream editorial cards ── */
function CardStack({ cards, flip = false }) {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)

  const stackPose = [
    { rotate: -8,  x: -10, y:   8, scale: 1,    zIndex: 1 },
    { rotate:  2,  x:   4, y:   2, scale: 1,    zIndex: 2 },
    { rotate: 11,  x:  14, y:  -3, scale: 1,    zIndex: 3 },
  ]
  const fanPose = [
    { rotate: -18, x: -185, y:  28, scale: 1,   zIndex: 2 },
    { rotate:   0, x:    0, y: -18, scale: 1,   zIndex: 3 },
    { rotate:  18, x:  185, y:  28, scale: 1,   zIndex: 2 },
  ]
  const openPoseLeft = [
    { rotate: -2, x: -240, y:  8, scale: 0.88, zIndex: 1 },
    { rotate:  0, x:  -30, y: -8, scale: 0.88, zIndex: 3 },
    { rotate:  2, x:  180, y:  8, scale: 0.88, zIndex: 1 },
  ]
  const openPoseRight = [
    { rotate: -2, x: -180, y:  8, scale: 0.88, zIndex: 1 },
    { rotate:  0, x:   30, y: -8, scale: 0.88, zIndex: 3 },
    { rotate:  2, x:  240, y:  8, scale: 0.88, zIndex: 1 },
  ]
  const openPose = flip ? openPoseLeft : openPoseRight

  const getPose = (i) => {
    if (open)    return openPose[i]
    if (hovered) return fanPose[i]
    return stackPose[i]
  }

  return (
    <div
      style={{ position: 'relative', width: 260, height: 380, overflow: 'visible', cursor: 'none' }}
      onMouseEnter={() => { if (!open) setHovered(true) }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { setOpen(o => !o); setHovered(false) }}
    >
      {cards.map((card, i) => {
        const pose = getPose(i)
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 252, height: 358,
              padding: '24px 22px',
              left: '50%', top: '50%',
              marginLeft: -126, marginTop: -179,
              display: 'flex', flexDirection: 'column',
              zIndex: pose.zIndex,
              background: '#f0eeea',
              border: '1px solid rgba(196,147,63,0.22)',
              boxShadow: open
                ? '0 24px 80px rgba(0,0,0,0.45)'
                : '0 16px 56px rgba(0,0,0,0.38)',
            }}
            animate={{ rotate: pose.rotate, x: pose.x, y: pose.y, scale: pose.scale }}
            transition={{ type: 'spring', stiffness: 240, damping: 28, mass: 0.9 }}
            whileHover={open ? {
              scale: pose.scale * 1.04, y: pose.y - 10,
              transition: { type: 'spring', stiffness: 420, damping: 32 },
            } : {}}
          >
            {/* Gold top rule */}
            <div style={{ width: 24, height: 1, background: '#c4933f', marginBottom: 14, opacity: 0.6 }} />

            <p style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase',
              color: '#c4933f', marginBottom: 14,
            }}>{card.head}</p>

            <div style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.75,
              color: '#1a1614',
              flex: 1,
            }}>
              {card.body.split('\n').map((line, j) => (
                <span key={j} style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{line}</span>
              ))}
            </div>

            {i === 2 && !hovered && !open && (
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.18)', textAlign: 'center', margin: 0,
              }}>hover · click</p>
            )}
            {i === 1 && open && (
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.18)', textAlign: 'center', margin: 0,
              }}>click to close</p>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── Full-viewport panel — clean geometric split ── */
function ProjectPanel({ project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const isFlip = project.flip

  return (
    <div ref={ref} style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: project.fallback }}>

      {/* Image — only in its 56% visible area, so backgroundPosition: center is accurate */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        [isFlip ? 'left' : 'right']: 0,
        width: '56%',
        backgroundImage: `url("${project.image}")`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        zIndex: 0,
      }} />

      {/* Thin edge vignette blending image into dark panel */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        [isFlip ? 'right' : 'left']: '44%',
        width: 100,
        background: isFlip
          ? 'linear-gradient(to left, rgba(10,8,6,0.9) 0%, transparent 100%)'
          : 'linear-gradient(to right, rgba(10,8,6,0.9) 0%, transparent 100%)',
        zIndex: 1,
      }} />

      {/* Solid dark text panel */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        [isFlip ? 'right' : 'left']: 0,
        width: '44%',
        background: '#0d0b09',
        zIndex: 2,
        overflow: 'hidden',
      }}>
        {/* Ghost number — architectural decoration */}
        <div style={{
          position: 'absolute',
          bottom: -60,
          [isFlip ? 'left' : 'right']: -24,
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(9rem, 18vw, 18rem)', fontWeight: 300,
          color: 'rgba(240,238,234,0.04)', lineHeight: 1,
          userSelect: 'none', letterSpacing: '-0.06em', pointerEvents: 'none',
        }}>{project.num}</div>
      </div>

      {/* Content layer */}
      <div style={{
        position: 'relative', zIndex: 3,
        display: 'flex',
        flexDirection: isFlip ? 'row-reverse' : 'row',
        minHeight: '100vh',
        alignItems: 'stretch',
      }}>
        {/* Text panel */}
        <div style={{
          width: '44%', flexShrink: 0,
          padding: 'clamp(5rem, 9vw, 7.5rem) clamp(2.5rem, 5vw, 4.5rem)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {/* Meta line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            <span style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.5em',
              color: '#c4933f',
            }}>{project.num}</span>
            <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg, rgba(196,147,63,0.6), transparent)' }} />
            <span style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 8, letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(212,184,150,0.38)',
            }}>{project.tag}</span>
          </motion.div>

          {/* Title */}
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, lineHeight: 0.9, fontSize: 'clamp(3.2rem, 7vw, 7.5rem)', color: '#f0e8d8', margin: '0 0 clamp(1.4rem, 2.5vw, 2rem)', whiteSpace: 'pre-line' }}>
            {project.title.split('\n').map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.span style={{ display: 'block' }}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 1.05, delay: 0.1 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <em style={{ fontStyle: 'italic', color: '#d4b896' }}>{line}</em>
                    : line
                  }
                </motion.span>
              </div>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.36 }}
            style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(212,184,150,0.5)', margin: '0 0 clamp(1.4rem, 2.5vw, 2rem)',
            }}
          >{project.subtitle}</motion.p>

          {/* Gold rule */}
          <motion.span
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.44 }}
            style={{ display: 'block', width: 64, height: 1, background: 'linear-gradient(90deg, rgba(196,147,63,0.85) 0%, rgba(196,147,63,0.2) 70%, transparent 100%)', transformOrigin: 'left', marginBottom: 'clamp(1.4rem, 2.5vw, 2rem)' }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.52 }}
            style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: '0.9rem', color: 'rgba(240,232,216,0.38)',
              lineHeight: 1.9, maxWidth: '36ch', margin: '0 0 clamp(2.5rem, 4vw, 3.5rem)',
            }}
          >{project.desc}</motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.68 }}
          >
            <RainbowGlassButton
              as={Link}
              to={`/recipe/${project.id}`}
              style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: '#f0e8d8',
                padding: '14px 36px',
              }}
            >
              Full Recipe →
            </RainbowGlassButton>
          </motion.div>
        </div>

        {/* Card stack — floats over the image side */}
        <div style={{
          flex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'visible',
        }}>
          <motion.div
            style={{ overflow: 'visible' }}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <CardStack cards={project.cards} flip={isFlip} />
          </motion.div>
        </div>
      </div>

      {/* Mobile layout override */}
      <style>{`
        @media (max-width: 768px) {
          .lifestyle-panel-content {
            flex-direction: column !important;
          }
          .lifestyle-panel-text {
            width: 100% !important;
            padding: 3rem 1.75rem !important;
          }
          .lifestyle-panel-cards {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ── Minimal nav button ── */
function NavBtn({ onClick, direction }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        top: '50%', transform: 'translateY(-50%)',
        [direction === 'left' ? 'left' : 'right']: 'clamp(1rem, 3vw, 2.5rem)',
        background: 'none', border: 'none', cursor: 'none',
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 0', zIndex: 20, outline: 'none',
      }}
    >
      {direction === 'left' && (
        <motion.div animate={{ x: hovered ? -6 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="40" height="1" viewBox="0 0 40 1">
            <defs>
              <linearGradient id="prev-grad" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor={hovered ? '#c4933f' : 'rgba(212,184,150,0.5)'} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <line x1="40" y1="0.5" x2="0" y2="0.5" stroke="url(#prev-grad)" strokeWidth="1" style={{ transition: 'all 0.25s' }} />
          </svg>
          <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: hovered ? '#c4933f' : 'rgba(212,184,150,0.35)', transition: 'color 0.25s' }}>Prev</span>
        </motion.div>
      )}
      {direction === 'right' && (
        <motion.div animate={{ x: hovered ? 6 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: hovered ? '#c4933f' : 'rgba(212,184,150,0.35)', transition: 'color 0.25s' }}>Next</span>
          <svg width="40" height="1" viewBox="0 0 40 1">
            <defs>
              <linearGradient id="next-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={hovered ? '#c4933f' : 'rgba(212,184,150,0.5)'} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <line x1="0" y1="0.5" x2="40" y2="0.5" stroke="url(#next-grad)" strokeWidth="1" style={{ transition: 'all 0.25s' }} />
          </svg>
        </motion.div>
      )}
    </button>
  )
}

/* ── Section ── */
export default function LifestyleProjects() {
  const headerRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next) => {
    setDir(next > current ? 1 : -1)
    setCurrent(next)
  }
  const prev = () => go(current === 0 ? PROJECTS.length - 1 : current - 1)
  const next = () => go(current === PROJECTS.length - 1 ? 0 : current + 1)

  return (
    <section id="lifestyle">

      {/* Section divider */}
      <div ref={headerRef} style={{
        background: '#0d0b09',
        borderTop: '1px solid rgba(240,238,234,0.05)',
        borderBottom: '1px solid rgba(240,238,234,0.05)',
        padding: '22px clamp(1.5rem, 6vw, 6rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.2)', margin: 0 }}>
          Journal · Recipes & Rituals
        </p>
        <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontWeight: 300, fontSize: '0.76rem', color: 'rgba(240,238,234,0.22)', margin: 0, maxWidth: 380, textAlign: 'right', lineHeight: 1.75 }}>
          The best food is inseparable from where you are, who you're with, and what you've just come in from.
        </p>
      </div>

      {/* Slider */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <ProjectPanel project={PROJECTS[current]} />
          </motion.div>
        </AnimatePresence>

        {/* Minimal nav buttons */}
        <NavBtn onClick={prev} direction="left" />
        <NavBtn onClick={next} direction="right" />

        {/* Timeline navigation */}
        <div style={{
          position: 'absolute', bottom: 'clamp(1.5rem, 3vw, 2.5rem)', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 0, zIndex: 20,
        }}>
          {PROJECTS.map((p, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{ background: 'none', border: 'none', cursor: 'none', padding: '8px 0', display: 'flex', alignItems: 'center', outline: 'none' }}
            >
              {/* Number */}
              <span style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 8, letterSpacing: '0.35em',
                color: i === current ? 'rgba(212,184,150,0.9)' : 'rgba(212,184,150,0.22)',
                transition: 'color 0.4s',
                paddingRight: 10,
              }}>{p.num}</span>
              {/* Track segment */}
              <div style={{ width: 40, height: 1, position: 'relative', marginRight: i < PROJECTS.length - 1 ? 10 : 0 }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(212,184,150,0.12)' }} />
                <motion.div
                  style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: '#c4933f', transformOrigin: 'left' }}
                  animate={{ scaleX: i === current ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

    </section>
  )
}
