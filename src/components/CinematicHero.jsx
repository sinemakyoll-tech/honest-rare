import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import BottleSVG from './BottleSVG'

gsap.registerPlugin(ScrollTrigger)

/* ── Floating image card component ── */
function FloatCard({ className, style, img, fallback, children }) {
  return (
    <div className={`float-card absolute ${className}`} style={style}>
      {img ? (
        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', background: fallback || '#e8e4de', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default function CinematicHero() {
  const sectionRef = useRef(null)
  const innerRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Headline stagger reveal ── */
      gsap.fromTo('.hero-line', {
        y: '110%', opacity: 0,
      }, {
        y: '0%', opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.14,
        delay: 0.2,
      })

      gsap.fromTo('.hero-sub', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.75,
      })

      gsap.fromTo('.hero-ctas', { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.0,
      })

      /* ── Floating cards — scroll-triggered ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1.4,
          pin: innerRef.current,
        },
      })

      tl.to('.fc-1', { x: 0, y: 0, rotate: -5, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.0)
        .to('.fc-2', { x: 0, y: 0, rotate:  4, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.15)
        .to('.fc-3', { x: 0, y: 0, rotate: -3, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.3)
        .to('.fc-4', { x: 0, y: 0, rotate:  7, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.45)

      /* Subtle parallax on headline as cards come in */
      tl.to('.hero-headline', { y: -60, opacity: 0.15, duration: 1 }, 0.4)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ height: '260vh' }}>
      <div ref={innerRef} style={{
        height: '100vh', position: 'sticky', top: 0,
        background: '#f0eeea',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>

        {/* ── Headline ── */}
        <div className="hero-headline relative z-10 text-center px-6" style={{ pointerEvents: 'none' }}>
          <p className="section-label-dark mb-6">Since 2018 · Tuscany, Italy</p>

          {['Liquid Gold,', 'Ancient Groves.'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <div className="hero-line" style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(4rem, 10vw, 10rem)',
                lineHeight: 0.9,
                color: '#1a1614',
                letterSpacing: '-0.01em',
                display: 'block',
                fontStyle: i === 1 ? 'italic' : 'normal',
                color: i === 1 ? '#c4933f' : '#1a1614',
              }}>
                {line}
              </div>
            </div>
          ))}

          <p className="hero-sub" style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 13, color: 'rgba(26,22,20,0.45)',
            letterSpacing: '0.06em', lineHeight: 1.8,
            marginTop: '2rem', opacity: 0,
          }}>
            Cold-pressed. Uncompromising.<br />For the table that deserves it.
          </p>

          <div className="hero-ctas" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: '2.5rem', opacity: 0 }}>
            <a href="#collection" className="btn-primary">Shop the Collection</a>
            <a href="#lifestyle"  className="btn-ghost">Explore Recipes</a>
          </div>
        </div>

        {/* ── Floating cards (neuwebstudio style) ── */}

        {/* Card 1 — top left: olive grove */}
        <div className="fc-1 float-card absolute" style={{
          width: 230, height: 290, top: '8%', left: '4%',
          transform: 'translateX(-130px) rotate(-12deg)', opacity: 0,
        }}>
          <img src="https://images.unsplash.com/photo-1474979266404-7d0e0d196f4f?w=600&q=85&auto=format&fit=crop"
               alt="Olive grove" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
          {/* Glass label badge */}
          <div className="glass absolute" style={{ bottom: 14, left: 14, right: 14, padding: '10px 14px', borderRadius: 10 }}>
            <p style={{ fontFamily:'"Futura LT Pro",system-ui,sans-serif', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(26,22,20,0.5)', marginBottom:2 }}>Estate</p>
            <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:300, fontSize:'1rem', color:'#1a1614' }}>Tuscan Groves</p>
          </div>
        </div>

        {/* Card 2 — top right: gourmet */}
        <div className="fc-2 float-card absolute" style={{
          width: 270, height: 210, top: '9%', right: '3%',
          transform: 'translateX(130px) rotate(10deg)', opacity: 0,
        }}>
          <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=85&auto=format&fit=crop"
               alt="Gourmet" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
          <div className="glass absolute" style={{ top: 14, right: 14, padding: '8px 14px', borderRadius: 10 }}>
            <p style={{ fontFamily:'"Futura LT Pro",system-ui,sans-serif', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(26,22,20,0.5)' }}>Recipe</p>
          </div>
        </div>

        {/* Card 3 — bottom left: bottle */}
        <div className="fc-3 float-card absolute" style={{
          width: 180, height: 310, bottom: '7%', left: '6%',
          transform: 'translateX(-110px) rotate(-6deg)', opacity: 0,
          background: 'linear-gradient(145deg, #ede9e3 0%, #ddd8d0 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BottleSVG size="md" variant="riserva" />
          <div className="glass absolute" style={{ bottom: 14, left: 12, right: 12, padding: '10px 14px', borderRadius: 10 }}>
            <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:300, fontSize:'0.95rem', color:'#1a1614' }}>H&amp;R Riserva</p>
            <p style={{ fontFamily:'"Futura LT Pro",system-ui,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(26,22,20,0.4)', marginTop:2 }}>€89</p>
          </div>
        </div>

        {/* Card 4 — bottom right: lodge */}
        <div className="fc-4 float-card absolute" style={{
          width: 250, height: 190, bottom: '9%', right: '4%',
          transform: 'translateX(120px) rotate(9deg)', opacity: 0,
        }}>
          <img src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=85&auto=format&fit=crop"
               alt="Ski lodge" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
          <div className="glass absolute" style={{ bottom: 14, left: 14, right: 14, padding: '10px 14px', borderRadius: 10 }}>
            <p style={{ fontFamily:'"Futura LT Pro",system-ui,sans-serif', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(26,22,20,0.5)', marginBottom:2 }}>Lifestyle</p>
            <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:300, fontSize:'1rem', color:'#1a1614' }}>Après-Ski Table</p>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{
            position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            zIndex: 20,
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          <span style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
            color: 'rgba(26,22,20,0.3)',
          }}>Scroll</span>
          <div style={{
            width: 1, height: 40,
            background: 'linear-gradient(180deg, rgba(196,147,63,0.5) 0%, transparent 100%)',
          }}/>
        </motion.div>

      </div>
    </section>
  )
}
