import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const sectionRef = useRef(null)
  const bgRef      = useRef(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const handle = () => {
    if (email.includes('@')) { setSent(true) }
  }

  return (
    <section
      ref={(el) => { sectionRef.current = el; ref.current = el }}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #111010 0%, #1a1614 100%)' }}
    >
      {/* Parallax background image */}
      <div
        ref={bgRef}
        className="absolute pointer-events-none"
        style={{
          top: '-12%', left: 0, right: 0, height: '124%',
          backgroundImage: `url('https://images.unsplash.com/photo-1574096079513-d8259312b785?w=1920&q=90&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
          mixBlendMode: 'luminosity',
        }}
      />

      {/* Background ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display font-light"
              style={{
                fontSize: 'clamp(6rem, 22vw, 24rem)',
                color: 'rgba(212,184,150,0.022)',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}>
          RARE
        </span>
      </div>

      <div className="relative px-6 md:px-16 py-32 max-w-screen-xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p className="section-label mb-8" style={{ color: '#c4933f', letterSpacing: '0.45em' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Join the Circle
          </motion.p>

          <motion.h2
            className="font-display font-light text-cream leading-[1.0] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Hear about new finds<br/>
            <span style={{ fontFamily: '"Born Ready Slanted", cursive', fontStyle: 'normal', color: '#d4b896' }}>before anyone else.</span>
          </motion.h2>

          <motion.p
            className="font-body text-sm leading-loose mb-14 mx-auto max-w-md"
            style={{ color: 'rgba(240,238,234,0.52)' }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            We write rarely. Every message is worth reading. New arrivals,
            limited drops, maker stories, and the occasional discovery that surprised even us.
            No noise. Never.
          </motion.p>

          {!sent ? (
            <motion.div
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handle()}
                className="flex-1 px-6 py-4 font-body text-sm outline-none tracking-wide"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 4,
                color: '#f0eeea',
              }}
              />
              <motion.button
                onClick={handle}
                className="btn-primary whitespace-nowrap"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="font-display text-2xl text-champagne"
            >
              Welcome to the circle. ✦
            </motion.div>
          )}

          <motion.p
            className="font-body text-[11px] mt-6 tracking-wide"
            style={{ color: 'rgba(240,238,234,0.35)' }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
