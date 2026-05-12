import { motion } from 'motion/react'

const COLS = [
  {
    head: 'Collection',
    links: ['H&R Antico', 'H&R Verde', 'H&R Riserva', 'H&R Biologico', 'H&R Affumicato', 'H&R Stagionale'],
  },
  {
    head: 'Lifestyle',
    links: ['Recipes', 'Cocktails', 'The Journal', 'Gift Sets', 'Seasonal Releases'],
  },
  {
    head: 'Company',
    links: ['Our Story', 'The Estates', 'Philosophy', 'Awards', 'Press', 'Careers'],
  },
  {
    head: 'Contact',
    links: ['Wholesale', 'Estate Visits', 'Subscriptions', 'hello@honestandrare.com'],
  },
]

export default function Footer() {
  return (
    <footer style={{
      background: '#06050a',
      borderTop: '1px solid rgba(212,184,150,0.08)',
    }}>

      {/* Marquee strip */}
      <div style={{
        borderBottom: '1px solid rgba(212,184,150,0.06)',
        padding: '14px 0',
        overflow: 'hidden',
        background: 'rgba(196,147,63,0.04)',
      }}>
        <div className="marquee-inner" style={{ display: 'flex', width: 'max-content' }}>
          {Array.from({ length: 2 }, (_, k) => (
            <div key={k} style={{ display: 'flex' }}>
              {['Cold Pressed', 'Single Estate', 'Hand Harvested', 'Est. 2018', '12 Awards',
                'Zero Additives', '4 Generations', 'Grove to Table'].map(t => (
                <span key={t} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
                  padding: '0 2.5rem',
                  fontSize: '10px', letterSpacing: '0.4em',
                  color: 'rgba(212,184,150,0.55)', textTransform: 'uppercase',
                  fontFamily: '"DM Sans", sans-serif',
                }}>
                  {t} <span style={{
                    width: 3, height: 3, borderRadius: '50%',
                    background: 'rgba(212,184,150,0.3)', display: 'inline-block',
                  }}/>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main footer body */}
      <div className="footer-body px-6 md:px-16 pt-20 pb-12">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-16">

          {/* Brand column */}
          <div className="md:col-span-1">
            <img
              src="/logo-white.png"
              alt="Honest & Rare"
              style={{
                height: 22, width: 'auto', objectFit: 'contain',
                opacity: 0.7,
                marginBottom: '1.25rem',
                display: 'block',
              }}
            />
            <p className="font-body text-sm text-cream/35 leading-relaxed mb-8 max-w-[220px]">
              9,500 independent products. No mainstream.
              Just honest, rare finds.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Ig', 'Li', 'Fb', 'Yt'].map(s => (
                <a key={s} href="#"
                   className="font-body text-[11px] text-cream/35 no-underline transition-colors hover:text-champagne"
                   style={{
                     width: 36, height: 36, border: '1px solid rgba(212,184,150,0.15)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                   }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.head}>
              <p className="section-label text-[9px] mb-7">{col.head}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#"
                       className="font-body text-sm text-cream/35 no-underline
                                  transition-colors duration-300 hover:text-champagne">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '2rem', gap: '1rem',
          borderTop: '1px solid rgba(212,184,150,0.06)',
        }}>
          <p className="font-body text-[11px] text-cream/22 tracking-wide">
            © 2024 Honest &amp; Rare S.r.l. — Firenze, Italia. All rights reserved.
          </p>
          <div className="footer-links-row" style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Preferences'].map(t => (
              <a key={t} href="#"
                 className="font-body text-[11px] text-cream/22 no-underline
                            transition-colors hover:text-cream/55">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
