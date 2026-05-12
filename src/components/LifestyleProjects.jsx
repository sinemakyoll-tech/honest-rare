import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'

const PROJECTS = [
  {
    num: '01',
    type: 'cocktail',
    tag: 'Cocktail · Mountain Ritual',
    title: 'The Mountain\nMule',
    subtitle: 'Oil-Washed Vodka & Wild Elderflower',
    desc: `H&R Biologico-washed vodka, hand-pressed ginger, and wild elderflower. Served in a chilled copper mug with mountain mint. The infusion rounds every edge into something herbal, warm, and entirely unrepeatable.`,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1920&q=85&auto=format&fit=crop',
    fallback: '#090c15',
    cards: [
      { head: 'The Oil', body: 'H&R Biologico\nNocellara · Sicily' },
      { head: 'Technique', body: 'Fat-Washed Vodka\n72hr infusion, cold-strained' },
      { head: 'Occasion', body: 'Mountain Terrace\nGolden Hour' },
    ],
    flip: true,
  },
  {
    num: '02',
    type: 'recipe',
    tag: 'Recipe · Winter Table',
    title: 'Carpaccio\ndi Manzo',
    subtitle: 'with Aged Riserva',
    desc: `Paper-thin Chianina beef laid over rocket, topped with shaved Parmigiano. The Riserva is drizzled last — its bitterness cuts through the richness, its fruitiness lifts every bite. A four-ingredient dish with a hundred layers of meaning.`,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1920&q=85&auto=format&fit=crop',
    fallback: '#0d1209',
    cards: [
      { head: 'The Oil', body: 'H&R Riserva 2022\nCentennial Frantoio · Chianti' },
      { head: 'Tasting Notes', body: 'Artichoke · Almond\nFresh Pepper · Dried Fig' },
      { head: 'Preparation', body: '20 minutes\nServes 4' },
    ],
    flip: false,
  },
  {
    num: '03',
    type: 'cocktail',
    tag: 'Cocktail · Après-Ski',
    title: 'The Alpine\nNegroni',
    subtitle: 'smoked over Wild Rosemary',
    desc: `Smoked Campari, alpine gin, and a wash of H&R Affumicato across the rim. The oak-smoked oil clings to the glass — adding a whisper of the forest to every bitter, beautiful sip. Served over hand-cut ice.`,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=85&auto=format&fit=crop',
    fallback: '#150a03',
    cards: [
      { head: 'The Oil', body: 'H&R Affumicato\nCold-Smoked · Oak & Rosemary' },
      { head: 'Spirit Notes', body: 'Campari · Alpine Gin\nOak Smoke · Orange Peel' },
      { head: 'Serve', body: 'Fireside\nOver hand-cut ice' },
    ],
    flip: true,
  },
]

/* ── Card stack: card-shuffle fan interaction ── */
function CardStack({ cards }) {
  const [fanned, setFanned] = useState(false)

  const stackPose = [
    { rotate: -8, x: -10, y: 8,  zIndex: 1 },
    { rotate:  2, x:   4, y: 2,  zIndex: 2 },
    { rotate: 11, x:  14, y: -3, zIndex: 3 },
  ]
  const fanPose = [
    { rotate: -18, x: -195, y: 28, zIndex: 2 },
    { rotate:   0, x:    0, y: -18, zIndex: 3 },
    { rotate:  18, x:  195, y: 28, zIndex: 2 },
  ]

  return (
    <div
      style={{ position: 'relative', width: 260, height: 340, cursor: 'crosshair' }}
      onMouseEnter={() => setFanned(true)}
      onMouseLeave={() => setFanned(false)}
    >
      {cards.map((card, i) => {
        const pose = fanned ? fanPose[i] : stackPose[i]
        return (
          <motion.div
            key={i}
            className="absolute glass"
            style={{
              width: 242, height: 312,
              padding: '28px 26px',
              left: '50%', top: '50%',
              marginLeft: -121, marginTop: -156,
              display: 'flex', flexDirection: 'column',
              zIndex: pose.zIndex,
            }}
            animate={{ rotate: pose.rotate, x: pose.x, y: pose.y }}
            transition={{ type: 'spring', stiffness: 255, damping: 26, mass: 0.85 }}
            whileHover={fanned ? {
              scale: 1.05, y: pose.y - 14,
              transition: { type: 'spring', stiffness: 420, damping: 32 },
            } : {}}
          >
            <p style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase',
              color: '#d4b896', marginBottom: 20,
            }}>
              {card.head}
            </p>
            <div style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300, fontSize: '1.1rem', lineHeight: 1.55,
              color: 'rgba(240,232,216,0.88)',
            }}>
              {card.body.split('\n').map((line, j) => (
                <span key={j} style={{ display: 'block' }}>{line}</span>
              ))}
            </div>
            {i === 2 && !fanned && (
              <div style={{
                marginTop: 'auto',
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
                color: 'rgba(240,232,216,0.2)', textAlign: 'center',
              }}>
                hover
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── Single full-viewport panel ── */
function ProjectPanel({ project }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const isFlip = project.flip

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ minHeight: '100vh' }}>

      {/* Parallax background layers */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: 1.22, transformOrigin: 'center' }}
      >
        {/* Color fallback */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: project.fallback }} />
        {/* Unsplash image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${project.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      </motion.div>

      {/* Directional gradient overlay */}
      <div className="absolute inset-0" style={{
        background: isFlip
          ? 'linear-gradient(270deg, rgba(7,6,10,0.94) 0%, rgba(7,6,10,0.72) 45%, rgba(7,6,10,0.28) 100%)'
          : 'linear-gradient(90deg,  rgba(7,6,10,0.94) 0%, rgba(7,6,10,0.72) 45%, rgba(7,6,10,0.28) 100%)',
      }} />

      {/* Top meta bar */}
      <div
        className="absolute top-8 left-10 right-10 flex justify-between items-center"
        style={{ borderBottom: '1px solid rgba(212,184,150,0.08)', paddingBottom: 10 }}
      >
        <span style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'rgba(212,184,150,0.5)',
        }}>
          {project.tag}
        </span>
      </div>

      {/* Main flex content */}
      <div
        className={`panel-inner relative z-10 flex ${isFlip ? 'flex-row-reverse' : 'flex-row'} items-center justify-between`}
        style={{
          minHeight: '100vh',
          padding: 'clamp(5rem, 10vw, 8rem) clamp(2.5rem, 8vw, 8rem)',
          gap: 'clamp(2rem, 5vw, 6rem)',
        }}
      >
        {/* Text content — unroll reveal */}
        <div className="panel-text" style={{ flex: 1, maxWidth: 560, paddingTop: '2rem', paddingBottom: '2rem' }}>

          {/* Giant title — line-by-line unroll */}
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, lineHeight: 0.92,
            fontSize: 'clamp(3.2rem, 7.5vw, 8rem)',
            color: '#f0e8d8', marginBottom: '1.75rem',
          }}>
            {project.title.split('\n').map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 1.05, delay: 0.08 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
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
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase',
              color: 'rgba(212,184,150,0.55)', marginBottom: '2rem',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            {project.subtitle}
          </motion.p>

          {/* Gold rule */}
          <motion.span
            style={{
              display: 'block', width: 48, height: 1,
              background: 'rgba(212,184,150,0.5)',
              marginBottom: '2rem',
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.44 }}
          />

          {/* Description */}
          <motion.p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '0.93rem', color: 'rgba(240,232,216,0.42)',
              lineHeight: 1.85, maxWidth: '38ch', marginBottom: '3rem',
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.54 }}
          >
            {project.desc}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <a href="#" className="btn-ghost" style={{ fontSize: 11 }}>
              Full Recipe →
            </a>
          </motion.div>
        </div>

        {/* Card stack */}
        <motion.div
          className="hidden lg:flex items-center justify-center flex-shrink-0"
          style={{ width: 580, height: 400 }}
          initial={{ opacity: 0, x: isFlip ? -52 : 52 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <CardStack cards={project.cards} />
        </motion.div>
      </div>
    </div>
  )
}

/* ── Section header ── */
export default function LifestyleProjects() {
  const headerRef = useRef(null)
  const inView    = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="lifestyle">

      {/* Header */}
      <div
        ref={headerRef}
        className="relative overflow-hidden noise"
        style={{
          background: '#08070a',
          padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 8vw, 8rem) clamp(3rem, 6vw, 6rem)',
        }}
      >
        <h2 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300, lineHeight: 0.92,
          fontSize: 'clamp(3.5rem, 9vw, 10rem)',
          color: '#f0e8d8',
        }}>
          {['Content first.', 'Commerce second.'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: '100%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 1.05, delay: 0.08 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 1
                  ? <em style={{ fontStyle: 'italic', color: '#d4b896' }}>{line}</em>
                  : line
                }
              </motion.span>
            </div>
          ))}
        </h2>

        <motion.p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '0.93rem', color: 'rgba(240,232,216,0.38)',
            lineHeight: 1.85, maxWidth: '50ch', marginTop: '2.5rem',
          }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.44 }}
        >
          The best food is inseparable from where you are, who you're with,
          and what you've just come in from.
          These are the recipes and rituals built around Honest&nbsp;&amp;&nbsp;Rare.
        </motion.p>
      </div>

      {/* Full-viewport project panels */}
      {PROJECTS.map((project, i) => (
        <>
          <ProjectPanel key={project.num} project={project} />
          {i < PROJECTS.length - 1 && (
            <div key={`divider-${i}`} style={{
              background: '#09080b',
              borderTop: '1px solid rgba(212,184,150,0.06)',
              borderBottom: '1px solid rgba(212,184,150,0.06)',
              padding: '14px 0', overflow: 'hidden',
            }}>
              <div className="marquee-inner" style={{ display: 'flex', width: 'max-content' }}>
                {Array.from({ length: 2 }, (_, k) => (
                  <div key={k} style={{ display: 'flex' }}>
                    {['Quality over Quantity', '9,500 Products', 'No Mainstream', 'Est. 2018',
                      'Independent Brands', 'No Algorithms', 'Honest Finds', 'Rare Selection'].map(t => (
                      <span key={t} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
                        padding: '0 2.5rem',
                        fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase',
                        color: 'rgba(212,184,150,0.45)',
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      }}>
                        {t} <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(212,184,150,0.3)', display: 'inline-block' }} />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ))}

      {/* Journal CTA */}
      <div
        className="lifestyle-journal text-center"
        style={{
          background: '#09080b',
          borderTop: '1px solid rgba(212,184,150,0.07)',
          padding: '7rem 2rem',
        }}
      >
        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
          color: 'rgba(240,232,216,0.28)',
          marginBottom: '2.5rem',
        }}>
          More in the Journal
        </p>
        <a href="#" className="btn-primary">Explore the Journal</a>
      </div>
    </section>
  )
}
