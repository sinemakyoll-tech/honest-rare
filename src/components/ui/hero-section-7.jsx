import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

const Swirls = () => (
  <>
    <svg className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3"
      width="700" height="700" viewBox="0 0 600 600"
      fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M515.266 181.33C377.943 51.564 128.537 136.256 50.8123 293.565C-26.9127 450.874 125.728 600 125.728 600"
        stroke="rgba(196,147,63,0.18)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <svg className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4"
      width="800" height="800" viewBox="0 0 700 700"
      fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M26.8838 528.274C193.934 689.816 480.051 637.218 594.397 451.983C708.742 266.748 543.953 2.22235 543.953 2.22235"
        stroke="rgba(196,147,63,0.18)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </>
)

export function FloatingFoodHero({ title, description, className }) {
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  /* ── Scroll-driven values ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const raw = {
    titleY:        useTransform(scrollYProgress, [0, 1],    ['0%', '-30%']),
    titleOpacity:  useTransform(scrollYProgress, [0, 0.65], [1, 0]),
    eyebrowOp:     useTransform(scrollYProgress, [0, 0.35], [1, 0]),
    descOp:        useTransform(scrollYProgress, [0, 0.45], [1, 0]),
    ctaOp:         useTransform(scrollYProgress, [0, 0.4],  [1, 0]),
    videoOp:       useTransform(scrollYProgress, [0, 1],    [0.22, 0.42]),
    videoScale:    useTransform(scrollYProgress, [0, 1],    [1, 1.12]),
    scrollCueOp:   useTransform(scrollYProgress, [0, 0.18], [1, 0]),
    swirlY:        useTransform(scrollYProgress, [0, 1],    ['0%', '18%']),
  }

  /* Spring-smooth the title for a luxurious feel */
  const titleY = useSpring(raw.titleY, { stiffness: 80, damping: 20 })

  return (
    <section
      ref={sectionRef}
      className={cn(className)}
      style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#f0eeea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >

      {/* Background video — scales & brightens on scroll */}
      <motion.video
        ref={videoRef} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: raw.videoOp, scale: raw.videoScale, transformOrigin: 'center' }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </motion.video>

      {/* Decorative swirls — parallax upward */}
      <motion.div className="absolute inset-0 z-[1] pointer-events-none" style={{ y: raw.swirlY }}>
        <Swirls />
      </motion.div>

      {/* Text content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        style={{ maxWidth: 900, y: titleY, opacity: raw.titleOpacity }}
      >
        {/* Eyebrow */}
        <motion.p
          style={{ opacity: raw.eyebrowOp,
            fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontWeight: 700,
            fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase',
            color: 'rgba(26,22,20,0.35)', marginBottom: '1.5rem',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          9,500 Independent Products · No Mainstream
        </motion.p>

        {/* Heading */}
        <motion.h1
            style={{ marginBottom: 0, lineHeight: 1.1 }}
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              fontFamily: '"Born Ready Slanted", cursive',
              fontWeight: 400, fontStyle: 'normal',
              fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
              letterSpacing: '-0.01em', color: '#1a1614',
            }}>
              {title.split(',')[0]}{' '}
            </span>
            <span style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
              letterSpacing: '0.01em', color: '#1a1614',
            }}>
              {title.split(',')[1]}
            </span>
          </motion.h1>

        {/* Divider */}
        <motion.div
          style={{ width: 32, height: 1, background: '#c4933f', opacity: 0.5, margin: '2rem auto' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Description */}
        <motion.p
          style={{ opacity: raw.descOp,
            fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontWeight: 300,
            fontSize: '0.82rem', color: 'rgba(26,22,20,0.42)', lineHeight: 1.9,
            marginBottom: '2.5rem', letterSpacing: '0.01em',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-cta-row"
          style={{ display: 'flex', gap: 16, justifyContent: 'center', opacity: raw.ctaOp }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a href="#collection" className="btn-primary">Shop Now</a>
          <a href="#story" className="btn-ghost">Discover</a>
        </motion.div>
      </motion.div>

      {/* Scroll cue — fades as soon as you start scrolling */}
      <motion.div
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10,
          opacity: raw.scrollCueOp,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontWeight: 700,
          fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'rgba(26,22,20,0.3)',
        }}>Scroll</span>
        <motion.div
          style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(196,147,63,0.5) 0%, transparent 100%)' }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
