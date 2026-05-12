import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'motion/react'
import { Link } from 'react-router-dom'

const CATEGORIES = ['Bestseller', 'Spirits', 'Gin', 'Craft Beer', 'Coffee/Tea', 'Snacks', 'Spices', 'Wine']

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [activeTab, setActiveTab] = useState('Drinking')
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', v => setScrolled(v > 60))
  }, [scrollY])

  return (
    <>
      {/* ── Main nav ── */}
      <motion.nav
        className="fixed left-0 right-0 z-50 flex flex-col"
        style={{ top: 36 }}
        animate={{
          backgroundColor: scrolled ? 'rgba(240,238,234,0.96)' : 'rgba(240,238,234,0)',
          backdropFilter:  scrolled ? 'blur(20px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Top row */}
        <div className="nav-row flex items-center justify-between" style={{
          paddingTop: scrolled ? 10 : 18, paddingBottom: scrolled ? 10 : 18,
          paddingLeft: 40, paddingRight: 40,
          borderBottom: scrolled ? '1px solid rgba(26,22,20,0.07)' : '1px solid transparent',
          transition: 'padding 0.4s',
        }}>
          {/* Drinking / Food toggle */}
          <div className="hidden md:flex items-center gap-1">
            {['Drinking', 'Food'].map(tab => (
              <button key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
                  fontWeight: 700, padding: '8px 18px',
                  background: activeTab === tab ? '#1a1614' : 'transparent',
                  color: activeTab === tab ? '#f0eeea' : 'rgba(26,22,20,0.45)',
                  border: '1px solid rgba(26,22,20,0.15)',
                  cursor: 'none', transition: 'all 0.25s',
                }}
              >{tab}</button>
            ))}
          </div>

          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', lineHeight: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <img
              src="/logo.png"
              alt="Honest & Rare"
              style={{ height: 26, width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </a>

          {/* Right icons */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: 'Account', icon: '○' },
              { label: 'Wishlist', icon: '♡' },
              { label: 'Cart', icon: '⊡' },
            ].map(item => (
              <a key={item.label} href="#" style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.5)', textDecoration: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                transition: 'color 0.25s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.5)'}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </a>
            ))}
            <a href="#collection" className="btn-primary" style={{ padding: '10px 22px', fontSize: 10 }}>
              Shop Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2 ml-auto"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'none' }}
          >
            {[0, 1, 2].map(i => (
              <motion.span key={i}
                style={{ display: 'block', width: 22, height: 1.5, background: '#1a1614', borderRadius: 1 }}
                animate={menuOpen
                  ? (i === 1 ? { opacity: 0 } : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 5 : -5 })
                  : { opacity: 1, rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>

        {/* Category nav */}
        {scrolled && (
          <motion.div
            className="hidden md:flex items-center justify-center gap-8"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ padding: '10px 40px', borderBottom: '1px solid rgba(26,22,20,0.07)' }}
          >
            {CATEGORIES.map(cat => (
              cat === 'Bestseller' ? (
                <Link key={cat} to="/bestseller" style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#c4933f', textDecoration: 'none', transition: 'color 0.25s',
                }}
                  onMouseEnter={e => e.target.style.color = '#1a1614'}
                  onMouseLeave={e => e.target.style.color = '#c4933f'}
                >{cat}</Link>
              ) : (
                <a key={cat} href={`#${cat.toLowerCase().replace('/', '-')}`} style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(26,22,20,0.45)', textDecoration: 'none', transition: 'color 0.25s',
                }}
                  onMouseEnter={e => e.target.style.color = '#1a1614'}
                  onMouseLeave={e => e.target.style.color = 'rgba(26,22,20,0.45)'}
                >{cat}</a>
              )
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: '#f0eeea' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {['Drinking', 'Food', ...CATEGORIES].map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 300, fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
                  color: '#1a1614', textDecoration: 'none',
                  letterSpacing: '0.05em', marginBottom: '0.25rem',
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
