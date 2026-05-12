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
  return (
    <section className={cn(className)} style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#f0eeea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Background video */}
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.22 }}>
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1] pointer-events-none"><Swirls /></div>

      {/* Text content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-2xl">
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontWeight: 700,
          fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase',
          color: 'rgba(26,22,20,0.35)', marginBottom: '1.5rem',
        }}>9,500 Independent Products · No Mainstream</p>

        <h1 style={{ marginBottom: '1.75rem', lineHeight: 1 }}>
          {title.split(',').map((part, i, arr) => (
            <span key={i} style={{
              display: 'block',
              fontFamily: i === 1 ? '"Born Ready Slanted", cursive' : '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300, fontStyle: 'normal',
              fontSize: i === 1 ? 'clamp(3.2rem, 7.5vw, 7rem)' : 'clamp(3rem, 7vw, 6.5rem)',
              letterSpacing: i === 1 ? '0.01em' : '-0.01em',
              color: i === 1 ? '#c4933f' : '#1a1614',
            }}>
              {part}{i < arr.length - 1 ? ',' : ''}
            </span>
          ))}
        </h1>

        <div style={{ width: 40, height: 1, background: '#c4933f', opacity: 0.6, margin: '0 auto 1.5rem' }} />

        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontWeight: 300,
          fontSize: '0.9rem', color: 'rgba(26,22,20,0.48)', lineHeight: 1.85, marginBottom: '2.5rem',
        }}>{description}</p>

        <div className="hero-cta-row" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <a href="#collection" className="btn-primary">Shop Now</a>
          <a href="#story" className="btn-ghost">Discover</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10,
      }}>
        <span style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontWeight: 700,
          fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'rgba(26,22,20,0.3)',
        }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(196,147,63,0.5) 0%, transparent 100%)' }} />
      </div>
    </section>
  )
}
