import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'

const STATS = [
  { n: '2018',  label: 'Founded' },
  { n: '9,500', label: 'Products' },
  { n: '100+',  label: 'Brands' },
  { n: '0',     label: 'Mainstream' },
]

function StatCounter({ stat, index, inView }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.5 + index * 0.1 }}
    >
      <p className="font-display font-light text-gold" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
        {stat.n}
      </p>
      <p className="section-label text-[9px] mt-1">{stat.label}</p>
    </motion.div>
  )
}

export default function Brand() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY   = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px'])
  const img1Y = useTransform(scrollYProgress, [0, 1], ['0px', '-50px'])
  const img2Y = useTransform(scrollYProgress, [0, 1], ['30px', '-70px'])
  const img3Y = useTransform(scrollYProgress, [0, 1], ['0px', '-40px'])

  return (
    <section id="story" ref={sectionRef}
             className="relative overflow-hidden"
             style={{ background: '#e8e4de', paddingTop: '8rem', paddingBottom: '8rem' }}>

      {/* Ghost wordmark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: bgY }}
      >
        <span className="font-display font-light text-center leading-none" style={{
          fontSize: 'clamp(5rem, 18vw, 20rem)',
          color: 'rgba(26,22,20,0.04)',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}>
          HONEST
        </span>
      </motion.div>

      <div ref={ref} className="relative px-6 md:px-16 max-w-screen-xl mx-auto">

        <motion.p className="section-label mb-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Brand
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: text */}
          <motion.div style={{ y: textY }}>
            <motion.h2
              className="font-display font-light leading-tight mb-10"
              style={{ color: '#1a1614', fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Honest is rare.<br/>
              <span style={{ fontFamily: '"Born Ready Slanted", cursive', fontStyle: 'normal', color: '#d4b896', display: 'block' }}>Rare is honest.</span>
            </motion.h2>

            <motion.div
              className="gold-rule mb-10"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            />

            <motion.p
              className="font-body text-base leading-loose mb-6 max-w-lg"
              style={{ color: 'rgba(26,22,20,0.5)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              We started Honest&nbsp;&amp;&nbsp;Rare in 2018 with a simple conviction:
              the best products in the world are made by independent producers
              who refuse to compromise for scale.
            </motion.p>

            <motion.p
              className="font-body text-base leading-loose mb-6 max-w-lg"
              style={{ color: 'rgba(26,22,20,0.45)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Every gin, beer, spirit, coffee, and spice on our platform is chosen by hand.
              No algorithms. No paid placements. No mainstream brands.
              Just the best of what independent makers create — from small distilleries,
              craft breweries, and artisan kitchens across Europe.
            </motion.p>

            <motion.p
              className="font-body text-base leading-loose max-w-lg"
              style={{ color: 'rgba(26,22,20,0.45)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              Honest&nbsp;&amp;&nbsp;Rare is not a shop. It is a belief —
              that quality over quantity is not a luxury, it is a decision.
            </motion.p>

            <motion.div
              className="mt-12 flex gap-5"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <a href="#collection" className="btn-primary">Browse the Selection</a>
              <a href="/brand" className="btn-ghost">Our Manifesto</a>
            </motion.div>
          </motion.div>

          {/* Right: visual grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4" style={{ height: 520 }}>
            {[
              { src: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&q=85&auto=format&fit=crop', style: { gridRow: 'span 2' }, imgY: img1Y },
              { src: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=85&auto=format&fit=crop', style: {}, imgY: img2Y },
              { src: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&q=85&auto=format&fit=crop', style: {}, imgY: img3Y },
            ].map((img, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-xl"
                style={{ ...img.style }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.img
                  src={img.src} alt=""
                  className="w-full object-cover"
                  style={{ height: '115%', y: img.imgY }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-0"
             style={{ borderTop: '1px solid rgba(26,22,20,0.08)' }}>
          {STATS.map((s, i) => (
            <div key={s.label} className="py-10 px-4"
                 style={{ borderRight: i < 3 ? '1px solid rgba(26,22,20,0.08)' : 'none' }}>
              <StatCounter stat={s} index={i} inView={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
