import { motion } from 'motion/react'

const COLS = [
  {
    head: 'Collection',
    links: ['H&R Antico', 'H&R Verde', 'H&R Riserva', 'H&R Biologico', 'H&R Affumicato', 'H&R Stagionale'],
  },
  {
    head: 'Lifestyle',
    links: ['Recipes', 'Cocktails', 'Lifestyle', 'Gift Sets', 'Seasonal Releases'],
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
      borderTop: '1px solid rgba(196,147,63,0.14)',
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
              {['Small Batch', 'Independent Makers', 'Craft Brewed', 'Est. 2018', '12 Awards',
                'Zero Additives', 'Family Owned', 'Maker to Door'].map(t => (
                <span key={t} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
                  padding: '0 2.5rem',
                  fontSize: '10px', letterSpacing: '0.4em',
                  color: 'rgba(212,184,150,0.55)', textTransform: 'uppercase',
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
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
              {[
                {
                  label: 'Instagram',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg>,
                },
                {
                  label: 'LinkedIn',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                },
                {
                  label: 'Facebook',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                },
                {
                  label: 'YouTube',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>,
                },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                   className="text-cream/35 no-underline transition-colors hover:text-champagne"
                   style={{
                     width: 36, height: 36, border: '1px solid rgba(212,184,150,0.15)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     color: 'rgba(212,184,150,0.35)',
                     transition: 'color 0.25s, border-color 0.25s',
                   }}
                   onMouseEnter={e => { e.currentTarget.style.color = '#c4933f'; e.currentTarget.style.borderColor = 'rgba(196,147,63,0.4)' }}
                   onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,184,150,0.35)'; e.currentTarget.style.borderColor = 'rgba(212,184,150,0.15)' }}
                >
                  {s.icon}
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
            © 2026 Honest &amp; Rare — Firenze, Italia. All rights reserved.
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
