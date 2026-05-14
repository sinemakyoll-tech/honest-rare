import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
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
              color: '#c4933f', marginBottom: 20,
            }}>
              {card.head}
            </p>
            <div style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300, fontSize: '1.1rem', lineHeight: 1.55,
              color: 'rgba(26,22,20,0.85)',
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
                color: 'rgba(26,22,20,0.2)', textAlign: 'center',
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
            <RainbowGlassButton
              as={Link}
              to={`/recipe/${project.id}`}
              style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.25em',
                textTransform: 'uppercase', color: '#f0e8d8',
                padding: '15px 38px',
              }}
            >
              Full Recipe →
            </RainbowGlassButton>
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

      {/* Header — video-through-text mask */}
      <div
        ref={headerRef}
        className="overflow-hidden"
        style={{
          position: 'relative',
          background: '#000',
          isolation: 'isolate',
          minHeight: 'clamp(420px, 65vh, 700px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}
      >
        {/* Video: brightness boosted so it lights the text uniformly */}
        <video
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'brightness(2.8) saturate(1.4)',
          }}
        >
          <source src="/bg-cocktail.mp4" type="video/mp4" />
        </video>

        {/* Full-coverage multiply mask: covers the entire section so no strip shows */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: '#000', mixBlendMode: 'multiply',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 8vw, 8rem) clamp(3rem, 6vw, 6rem)',
        }}>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, lineHeight: 0.88,
            fontSize: 'clamp(3rem, 7vw, 8.5rem)',
            color: '#fff',
            margin: 0,
          }}>
            {['Content first.', 'Commerce second.'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 1.05, delay: 0.08 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1 ? <em style={{ fontStyle: 'italic' }}>{line}</em> : line}
                </motion.span>
              </div>
            ))}
          </h2>
        </div>

        {/* Paragraph: outside the mask, sits in normal flow to anchor container height */}
        <motion.p
          style={{
            position: 'relative', zIndex: 2,
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '0.93rem', color: 'rgba(240,232,216,0.45)',
            lineHeight: 1.85, maxWidth: '50ch',
            padding: '0 clamp(1.5rem, 8vw, 8rem) clamp(3rem, 6vw, 6rem)',
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
