import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'

/* ─────────────────────────────────────────────
   Navigation structure with mega-menu data
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Bestseller', href: '/bestseller' },
  {
    label: 'Gifts',
    href: '#gifts',
    viewAll: 'View All Gifts',
    columns: [
      [
        { type: 'link', label: 'Gift Boxes' },
        { type: 'link', label: 'Advent Calendars' },
        { type: 'link', label: 'Tasting Sets' },
        { type: 'link', label: 'Gift Cards' },
        { type: 'link', label: 'Mini Bottles' },
      ],
      [{ type: 'group', label: 'By Category', items: ['Spirits Gifts', 'Wine Gifts', 'Beer Gifts', 'Food & Drink Gifts'] }],
      [{ type: 'group', label: 'By Occasion', items: ['Birthday', 'Christmas', 'Wedding', 'Corporate'] }],
    ],
  },
  {
    label: 'Spirits',
    href: '#spirits',
    viewAll: 'View All Spirits',
    columns: [
      [
        { type: 'link', label: 'Whisky' },
        { type: 'link', label: 'Rum' },
        { type: 'link', label: 'Vodka' },
        { type: 'link', label: 'Korn' },
        { type: 'link', label: 'Tequila' },
        { type: 'link', label: 'Vermouth' },
        { type: 'link', label: 'Absinth' },
      ],
      [
        { type: 'link', label: 'Advent Calendar' },
        { type: 'link', label: 'Alcohol-Free Spirits' },
        { type: 'group', label: 'Gin', items: ['Advent Calendar Gin', 'Dry Gin', 'London Dry Gin', 'New Western Dry Gin', 'Sloe Gin & Gin Liqueur'] },
      ],
      [
        { type: 'group', label: 'Aperitifs & Bitters', items: [] },
        { type: 'group', label: 'Brandies & Spirits', items: ['Fruit Schnapps', 'Nut Schnapps', 'Herbal Schnapps', 'Cask-Aged Schnapps'] },
      ],
      [
        { type: 'group', label: 'Spirits Packages', items: [] },
        { type: 'group', label: 'Liqueur', items: ['Fruit Liqueurs', 'Nut Liqueurs', 'Herbal Liqueurs', 'Egg & Cream Liqueurs'] },
      ],
    ],
  },
  {
    label: 'Gin',
    href: '#gin',
    viewAll: 'View All Gin',
    columns: [
      [
        { type: 'link', label: 'Dry Gin' },
        { type: 'link', label: 'London Dry Gin' },
        { type: 'link', label: 'New Western Dry Gin' },
        { type: 'link', label: 'Sloe Gin' },
        { type: 'link', label: 'Gin Liqueur' },
        { type: 'link', label: 'Old Tom Gin' },
      ],
      [{ type: 'group', label: 'By Origin', items: ['German Gin', 'British Gin', 'Scottish Gin', 'Scandinavian Gin', 'Austrian Gin'] }],
      [{ type: 'group', label: 'Sets & Packages', items: ['Gin Advent Calendar', 'Tasting Sets', 'Gift Boxes', 'Mini Bottles'] }],
    ],
  },
  {
    label: 'Craft Beer',
    href: '#craft-beer',
    viewAll: 'View All Craft Beer',
    columns: [
      [
        { type: 'link', label: 'IPA' },
        { type: 'link', label: 'Pale Ale' },
        { type: 'link', label: 'Stout & Porter' },
        { type: 'link', label: 'Wheat Beer' },
        { type: 'link', label: 'Lager' },
        { type: 'link', label: 'Sour Beer' },
        { type: 'link', label: 'Amber Ale' },
      ],
      [{ type: 'group', label: 'By Origin', items: ['German Beer', 'American Beer', 'Belgian Beer', 'British Beer', 'Scandinavian Beer'] }],
      [{ type: 'group', label: 'Sets & Packages', items: ['Beer Cases', 'Tasting Boxes', 'Advent Calendars', 'Gift Sets'] }],
    ],
  },
  {
    label: 'Coffee/Tea',
    href: '#coffee-tea',
    viewAll: 'View All Coffee & Tea',
    columns: [
      [{ type: 'group', label: 'Coffee', items: ['Single Origin', 'Espresso', 'Filter Coffee', 'Cold Brew', 'Decaf'] }],
      [{ type: 'group', label: 'Tea', items: ['Black Tea', 'Green Tea', 'Herbal Tea', 'Matcha', 'White Tea'] }],
      [{ type: 'group', label: 'Accessories', items: ['Brewing Methods', 'Coffee Grinders', 'Tea Ware', 'Subscription Boxes'] }],
    ],
  },
  {
    label: 'Snacks',
    href: '#snacks',
    viewAll: 'View All Snacks',
    columns: [
      [
        { type: 'link', label: 'Chocolate' },
        { type: 'link', label: 'Nuts & Seeds' },
        { type: 'link', label: 'Crackers & Chips' },
        { type: 'link', label: 'Dried Fruit' },
        { type: 'link', label: 'Granola & Muesli' },
        { type: 'link', label: 'Energy Bars' },
      ],
      [{ type: 'group', label: 'Specialties', items: ['Artisan Chocolate', 'Organic Snacks', 'Vegan Snacks', 'Sugar-Free'] }],
      [{ type: 'group', label: 'Packages', items: ['Snack Boxes', 'Tasting Sets', 'Gift Sets'] }],
    ],
  },
  {
    label: 'Limos & Co',
    href: '#limos',
    viewAll: 'View All Limos & Co',
    columns: [
      [
        { type: 'link', label: 'Lemonade' },
        { type: 'link', label: 'Kombucha' },
        { type: 'link', label: 'Sparkling Water' },
        { type: 'link', label: 'Juices' },
        { type: 'link', label: 'Shrubs & Syrups' },
        { type: 'link', label: 'Energy Drinks' },
      ],
      [{ type: 'group', label: 'Alcohol-Free', items: ['AF Spirits', 'AF Beer', 'AF Wine', 'AF Cocktail Mixers'] }],
      [{ type: 'group', label: 'Packages', items: ['Drinks Cases', 'Tasting Boxes', 'Gift Sets'] }],
    ],
  },
  {
    label: 'Spices',
    href: '#spices',
    viewAll: 'View All Spices',
    columns: [
      [
        { type: 'link', label: 'Single Spice' },
        { type: 'link', label: 'Spice Blends' },
        { type: 'link', label: 'Herbs' },
        { type: 'link', label: 'Salt' },
        { type: 'link', label: 'Pepper' },
        { type: 'link', label: 'Chili' },
      ],
      [{ type: 'group', label: 'By Origin', items: ['German Spices', 'Asian Spices', 'Mediterranean Spices', 'Mexican Spices'] }],
      [{ type: 'group', label: 'Sets & Packages', items: ['Spice Sets', 'Gift Boxes', 'Advent Calendars'] }],
    ],
  },
  {
    label: 'Wine',
    href: '#wine',
    viewAll: 'View All Wine',
    columns: [
      [
        { type: 'link', label: 'Red Wine' },
        { type: 'link', label: 'White Wine' },
        { type: 'link', label: 'Rosé' },
        { type: 'link', label: 'Sparkling Wine' },
        { type: 'link', label: 'Natural Wine' },
        { type: 'link', label: 'Orange Wine' },
        { type: 'link', label: 'Dessert Wine' },
      ],
      [{ type: 'group', label: 'By Region', items: ['Germany', 'France', 'Italy', 'Spain', 'Austria', 'New World'] }],
      [{ type: 'group', label: 'Packages', items: ['Wine Cases', 'Tasting Sets', 'Gift Boxes', 'Mixed Cases'] }],
    ],
  },
  { label: 'Lifestyle', href: '/lifestyle' },
  { label: 'Our Story', href: '/brand' },
]

/* ─────────────────────────────────────────────
   Mega menu panel
───────────────────────────────────────────── */
function MegaMenu({ item }) {
  const F = '"Futura LT Pro", system-ui, sans-serif'

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
        background: '#faf9f7',
        borderBottom: '1px solid rgba(26,22,20,0.09)',
        boxShadow: '0 20px 60px rgba(26,22,20,0.1)',
        padding: '28px clamp(2.5rem, 6vw, 6rem) 36px',
      }}
    >
      {/* ── Top bar: big title + view all ── */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 22, paddingBottom: 18,
        borderBottom: '1px solid rgba(26,22,20,0.07)',
      }}>
        <span style={{
          fontFamily: '"Born Ready Slanted", cursive',
          fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
          color: '#7a9a6e', lineHeight: 1,
        }}>{item.label}</span>

        <a href={item.href} style={{
          fontFamily: F, fontSize: 9, fontWeight: 700,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(26,22,20,0.35)', textDecoration: 'none',
          transition: 'color 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.35)'}
        >{item.viewAll} ›</a>
      </div>

      {/* ── Column grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `max-content repeat(${item.columns.length - 1}, 1fr)`,
        gap: 0,
        alignItems: 'start',
      }}>
        {item.columns.map((col, ci) => (
          <div key={ci} style={{
            padding: ci === 0 ? '0 40px 0 0' : '0 0 0 32px',
            borderRight: ci < item.columns.length - 1 ? '1px solid rgba(26,22,20,0.07)' : 'none',
          }}>
            {col.map((entry, ei) =>
              entry.type === 'link' ? (
                /* Col 0: bold primary links */
                <a key={ei} href="#" style={{
                  fontFamily: F,
                  fontSize: ci === 0 ? 18 : 15,
                  fontWeight: ci === 0 ? 700 : 300,
                  color: ci === 0 ? 'rgba(26,22,20,0.8)' : 'rgba(26,22,20,0.6)',
                  textDecoration: 'none',
                  display: 'block',
                  padding: ci === 0 ? '7px 0' : '5px 0',
                  lineHeight: 1.3,
                  transition: 'color 0.12s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                  onMouseLeave={e => e.currentTarget.style.color = ci === 0 ? 'rgba(26,22,20,0.8)' : 'rgba(26,22,20,0.6)'}
                >{entry.label}</a>
              ) : (
                /* Group: label as section header, then items */
                <div key={ei} style={{ marginTop: ei > 0 ? 20 : 0 }}>
                  {/* Section label */}
                  <p style={{
                    fontFamily: F,
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: 'rgba(26,22,20,0.3)',
                    margin: '0 0 10px',
                    paddingBottom: 8,
                    borderBottom: '1px solid rgba(26,22,20,0.07)',
                  }}>{entry.label}</p>

                  {/* Items under this group */}
                  {entry.items?.length ? entry.items.map((sub, si) => (
                    <a key={si} href="#" style={{
                      fontFamily: F, fontSize: 15, fontWeight: 300,
                      color: 'rgba(26,22,20,0.6)', textDecoration: 'none',
                      display: 'block', padding: '5px 0', lineHeight: 1.3,
                      transition: 'color 0.12s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.6)'}
                    >{sub}</a>
                  )) : (
                    <a href="#" style={{
                      fontFamily: F, fontSize: 15, fontWeight: 300,
                      color: 'rgba(26,22,20,0.6)', textDecoration: 'none',
                      display: 'block', padding: '5px 0',
                      transition: 'color 0.12s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.6)'}
                    >Browse all</a>
                  )}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main Nav component
───────────────────────────────────────────── */
export default function Nav({ top = 36, showToggle = true, backTo = '/', backLabel = 'Back to Shop' }) {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeTab, setActiveTab]   = useState('Drinking')
  const [hovered, setHovered]       = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { scrollY } = useScroll()
  const closeTimer = useRef(null)
  const searchInputRef = useRef(null)
  const { count } = useCart()
  const navigate = useNavigate()

  const searchResults = searchQuery.trim().length > 0
    ? PRODUCTS.map(p => {
        const q = searchQuery.toLowerCase()
        let score = 0
        if (p.name.toLowerCase().includes(q))                          score += 10
        if (p.brand.toLowerCase().includes(q))                         score += 8
        if (p.category.toLowerCase().includes(q))                      score += 7
        if (p.style?.toLowerCase().includes(q))                        score += 5
        if (p.taste?.some(t => t.toLowerCase().includes(q)))           score += 4
        if (p.tags?.some(t => t.toLowerCase().includes(q)))            score += 3
        if (p.note?.toLowerCase().includes(q))                         score += 2
        if (p.pairing?.toLowerCase().includes(q))                      score += 1
        if (p.origin?.toLowerCase().includes(q))                       score += 1
        return { ...p, _score: score }
      })
      .filter(p => p._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 6)
    : []

  function openSearch() {
    setSearchOpen(true)
    setMenuOpen(false)
    setTimeout(() => searchInputRef.current?.focus(), 80)
  }

  function closeSearch() {
    setSearchOpen(false)
    setSearchQuery('')
  }

  function handleResultClick(id) {
    closeSearch()
    navigate(`/product/${id}`)
  }

  useEffect(() => {
    return scrollY.on('change', v => setScrolled(v > 60))
  }, [scrollY])

  function handleNavLeave() {
    closeTimer.current = setTimeout(() => setHovered(null), 80)
  }
  function handleNavEnter() {
    clearTimeout(closeTimer.current)
  }

  const activeItem = NAV_ITEMS.find(i => i.label === hovered)

  return (
    <>
      {/* ── Main nav ── */}
      <motion.nav
        className="fixed left-0 right-0 z-50 flex flex-col"
        style={{ top }}
        animate={{
          backgroundColor: scrolled || hovered ? 'rgba(240,238,234,0.98)' : 'rgba(240,238,234,0)',
        }}
        style={{
          top,
          backdropFilter: scrolled || hovered ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled || hovered ? 'blur(20px)' : 'none',
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseLeave={handleNavLeave}
        onMouseEnter={handleNavEnter}
      >
        {/* Top row */}
        <div className="nav-row flex items-center justify-between" style={{
          paddingTop: scrolled ? 10 : 18, paddingBottom: scrolled ? 10 : 18,
          paddingLeft: 40, paddingRight: 40,
          borderBottom: '1px solid rgba(26,22,20,0.07)',
          transition: 'padding 0.4s',
        }}>
          {/* Left: toggle or back link */}
          <div className="hidden md:flex items-center gap-1">
            {showToggle ? ['Drinking', 'Food'].map(tab => (
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
            )) : (
              <Link to={backTo} style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.45)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'color 0.25s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.45)'}
              >
                <span style={{ fontSize: 13, lineHeight: 1 }}>←</span> {backLabel}
              </Link>
            )}
          </div>

          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', lineHeight: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <img src="/logo.png" alt="Honest & Rare" style={{ height: 26, width: 'auto', objectFit: 'contain', display: 'block' }} />
          </a>

          {/* Right icons */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: 'Account', icon: '○', href: '#' },
              { label: 'Wishlist', icon: '♡', href: '#' },
            ].map(item => (
              <a key={item.label} href={item.href} style={{
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
            <Link to="/cart" style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(26,22,20,0.5)', textDecoration: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              transition: 'color 0.25s', position: 'relative',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.5)'}
            >
              <span style={{ position: 'relative', fontSize: 16, lineHeight: 1 }}>
                ⊡
                {count > 0 && (
                  <span style={{
                    position: 'absolute', top: -5, right: -8,
                    minWidth: 14, height: 14,
                    background: '#c4933f', color: '#fff',
                    borderRadius: '50%', fontSize: 8, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    letterSpacing: 0, lineHeight: 1,
                    padding: '0 2px',
                  }}>
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </span>
              Cart
            </Link>
            <a href="#collection" className="btn-primary" style={{ padding: '10px 22px', fontSize: 10 }}>
              Shop Now
            </a>
          </div>

          {/* Mobile: search icon on left */}
          <button
            className="md:hidden"
            onClick={openSearch}
            style={{ background: 'none', border: 'none', cursor: 'none', padding: '8px 10px', lineHeight: 1 }}
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1614" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/>
              <line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>

          {/* Mobile: cart icon + hamburger */}
          <div className="md:hidden flex items-center gap-1 ml-auto">
            <Link to="/cart" style={{ position: 'relative', padding: '8px 10px', lineHeight: 1, color: '#1a1614', textDecoration: 'none', fontSize: 18 }}>
              ⊡
              {count > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4,
                  minWidth: 14, height: 14,
                  background: '#c4933f', color: '#fff',
                  borderRadius: '50%', fontSize: 8, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  letterSpacing: 0, lineHeight: 1, padding: '0 2px',
                }}>
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </Link>
          <button className="flex flex-col gap-1.5 p-2"
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
        </div>

        {/* ── Category nav (always visible when showToggle=true) ── */}
        {showToggle && (
          <div
            className="hidden md:flex items-center justify-center nav-cat-row"
            style={{
              padding: '0 40px',
              borderBottom: hovered ? '1px solid transparent' : '1px solid rgba(26,22,20,0.07)',
              overflowX: 'auto',
              gap: 0,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {NAV_ITEMS.map(item => {
              const isActive = hovered === item.label
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => setHovered(item.columns ? item.label : null)}
                  style={{ position: 'relative', flexShrink: 0 }}
                >
                  {item.href?.startsWith('/') ? (
                    <Link
                      to={item.href}
                      style={{
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: isActive ? '#1a1614' : item.label === 'Bestseller' || item.label === 'Lifestyle' || item.label === 'Our Story' ? '#c4933f' : 'rgba(26,22,20,0.5)',
                        textDecoration: 'none',
                        display: 'block',
                        padding: '13px 18px',
                        borderBottom: isActive ? '2px solid #1a1614' : '2px solid transparent',
                        transition: 'color 0.2s, border-color 0.2s',
                      }}
                    >{item.label}</Link>
                  ) : (
                    <a
                      href={item.href}
                      style={{
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: isActive ? '#1a1614' : 'rgba(26,22,20,0.5)',
                        textDecoration: 'none',
                        display: 'flex', alignItems: 'center', gap: 4,
                        padding: '13px 18px',
                        borderBottom: isActive ? '2px solid #1a1614' : '2px solid transparent',
                        transition: 'color 0.2s, border-color 0.2s',
                        cursor: 'none',
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#1a1614' }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(26,22,20,0.5)' }}
                    >
                      {item.label}
                      {item.columns && (
                        <span style={{
                          fontSize: 8, opacity: 0.5, lineHeight: 1,
                          transform: isActive ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s',
                        }}>▾</span>
                      )}
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ── Mega menu ── */}
        <AnimatePresence>
          {hovered && activeItem?.columns && (
            <MegaMenu key={hovered} item={activeItem} />
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Mobile search overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(26,22,20,0.45)', backdropFilter: 'blur(2px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeSearch}
            />

            {/* Search panel */}
            <motion.div
              className="md:hidden fixed left-0 right-0 z-50"
              style={{ top: 60, background: '#f0eeea', borderBottom: '1px solid rgba(26,22,20,0.1)', boxShadow: '0 8px 32px rgba(26,22,20,0.12)' }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Input row */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', gap: 12, borderBottom: '1px solid rgba(26,22,20,0.07)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(26,22,20,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, categories…"
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 13, letterSpacing: '0.04em',
                    color: '#1a1614',
                  }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'none', padding: 4, color: 'rgba(26,22,20,0.4)', lineHeight: 1, fontSize: 18 }}>×</button>
                )}
                <button onClick={closeSearch} style={{ background: 'none', border: 'none', cursor: 'none', padding: '4px 0 4px 8px', fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.4)' }}>
                  Cancel
                </button>
              </div>

              {/* Results */}
              {searchResults.length > 0 && (
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  {searchResults.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleResultClick(p.id)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                        padding: '12px 20px', background: 'none', border: 'none',
                        borderBottom: '1px solid rgba(26,22,20,0.05)',
                        cursor: 'none', textAlign: 'left',
                      }}
                    >
                      <img
                        src={p.img}
                        alt={p.name}
                        style={{ width: 40, height: 48, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c4933f', margin: '0 0 3px' }}>
                          {p.category}
                        </p>
                        <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 16, fontWeight: 500, color: '#1a1614', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.name}
                        </p>
                        <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 10, color: 'rgba(26,22,20,0.45)', margin: 0 }}>
                          {p.brand}
                        </p>
                      </div>
                      <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 13, fontWeight: 700, color: '#1a1614', flexShrink: 0 }}>
                        €{p.price}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {/* No results */}
              {searchQuery.trim().length > 0 && searchResults.length === 0 && (
                <div style={{ padding: '24px 20px', textAlign: 'center' }}>
                  <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(26,22,20,0.4)', margin: 0 }}>
                    No products found for "{searchQuery}"
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-start overflow-y-auto" style={{ background: '#f0eeea', paddingTop: 140, paddingBottom: 48 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {NAV_ITEMS.map((item, i) => {
              const linkStyle = {
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 300, fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
                color: '#1a1614', textDecoration: 'none',
                letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block',
              }
              return (
                <motion.div key={item.label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  {item.href?.startsWith('/') ? (
                    <Link to={item.href} onClick={() => setMenuOpen(false)} style={linkStyle}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} onClick={() => setMenuOpen(false)} style={linkStyle}>
                      {item.label}
                    </a>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
