import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'
import { PRODUCTS as BESTSELLERS } from '../data/products'
import { useIsMobile } from '../hooks/useIsMobile'

const CATEGORY_OPTIONS = ['Gin', 'Craft Beer', 'Coffee', 'Spirits', 'Non-Alcoholic', 'Food', 'Spices']

const PRICE_OPTIONS = [
  { label: 'Under €15',  fn: p => p.price < 15 },
  { label: '€15 – €30', fn: p => p.price >= 15 && p.price <= 30 },
  { label: '€30 – €50', fn: p => p.price > 30 && p.price <= 50 },
  { label: 'Over €50',  fn: p => p.price > 50 },
]

const COUNTRY_OPTIONS = [
  { label: 'Germany',        fn: p => /germany|bamberg|hamburg/i.test(p.origin) },
  { label: 'Scandinavia',    fn: p => /denmark|stockholm|sweden|copenhagen/i.test(p.origin) },
  { label: 'Austria',        fn: p => /austria|vienna|tyrol/i.test(p.origin) },
  { label: 'Spain / France', fn: p => /spain|france|camargue/i.test(p.origin) },
  { label: 'Africa / Asia',  fn: p => /ethiopia|japan|kenya|india/i.test(p.origin) },
]

const EATING_STYLE_OPTIONS = [
  { label: 'Alcoholic',     fn: p => p.abv && parseFloat(p.abv) > 0 },
  { label: 'Alcohol-Free',  fn: p => !p.abv || p.abv === '0.0%' },
  { label: 'Vegan-Friendly',fn: p => ['Coffee', 'Spices', 'Non-Alcoholic'].includes(p.category) },
  { label: 'Food & Drink',  fn: p => ['Food', 'Coffee'].includes(p.category) },
]

const ABV_OPTIONS = [
  { label: '0%',           fn: p => !p.abv || p.abv === '0.0%' },
  { label: 'Under 5%',     fn: p => p.abv && parseFloat(p.abv) > 0 && parseFloat(p.abv) < 5 },
  { label: '5% – 15%',     fn: p => p.abv && parseFloat(p.abv) >= 5 && parseFloat(p.abv) <= 15 },
  { label: '15% – 40%',    fn: p => p.abv && parseFloat(p.abv) > 15 && parseFloat(p.abv) <= 40 },
  { label: 'Over 40%',     fn: p => p.abv && parseFloat(p.abv) > 40 },
]

const BRAND_OPTIONS = [...new Set(BESTSELLERS.map(p => p.brand))].sort()

/* ── Accordion filter section ── */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid rgba(26,22,20,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 0', background: 'none', border: 'none', cursor: 'none',
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: '#1a1614',
        }}
      >
        {title}
        <span style={{
          fontSize: 13, color: 'rgba(26,22,20,0.35)',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s ease', lineHeight: 1,
        }}>∨</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 16 }}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ── Checkbox row ── */
function FilterCheck({ label, checked, onChange, count }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '6px 0', cursor: 'none',
    }}>
      <span
        onClick={onChange}
        style={{
          width: 14, height: 14, flexShrink: 0,
          border: checked ? '1.5px solid #1a1614' : '1.5px solid rgba(26,22,20,0.22)',
          background: checked ? '#1a1614' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}
      >
        {checked && <span style={{ color: '#f0eeea', fontSize: 9, lineHeight: 1 }}>✓</span>}
      </span>
      <span
        onClick={onChange}
        style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: checked ? '#1a1614' : 'rgba(26,22,20,0.5)',
          transition: 'color 0.15s', flex: 1,
        }}
      >{label}</span>
      {count !== undefined && (
        <span style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 8, color: 'rgba(26,22,20,0.3)', letterSpacing: '0.1em',
        }}>({count})</span>
      )}
    </label>
  )
}

function RankBadge({ rank }) {
  return (
    <div style={{
      position: 'absolute', top: 14, left: 14, zIndex: 3,
      width: 36, height: 36,
      background: rank <= 3 ? '#c4933f' : '#1a1614',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: '50%',
    }}>
      <span style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontSize: '1rem', fontWeight: 400, color: '#f0eeea', lineHeight: 1,
      }}>#{rank}</span>
    </div>
  )
}

function ProductCard({ p }) {
  const [wished, setWished] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid rgba(26,22,20,0.09)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 0.25s ease',
        boxShadow: hovered ? '0 8px 32px rgba(26,22,20,0.11)' : 'none',
        cursor: 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <RankBadge rank={p.rank} />

      {p.discount && (
        <span style={{
          position: 'absolute', top: 14, right: 50, zIndex: 3,
          background: '#2a5a8a', color: '#fff',
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          padding: '4px 8px',
        }}>{p.discount}%</span>
      )}

      <button onClick={() => setWished(w => !w)} style={{
        position: 'absolute', top: 12, right: 12, zIndex: 3,
        background: 'none', border: 'none', cursor: 'none',
        padding: 4, lineHeight: 1, fontSize: 20,
        color: wished ? '#c4933f' : 'rgba(26,22,20,0.22)',
        transition: 'color 0.2s',
      }}>
        {wished ? '♥' : '♡'}
      </button>

      {/* Image — links to detail */}
      <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          height: 260, background: '#f5f4f2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', padding: '20px 28px',
        }}>
          <img src={p.img} alt={p.name} style={{
            maxWidth: '100%', maxHeight: '100%',
            objectFit: 'contain', display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }} />
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '18px 20px 22px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{
          display: 'inline-block',
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 8, fontWeight: 700, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: p.accent,
          border: `1px solid ${p.accent}`, padding: '3px 10px',
          marginBottom: 10,
        }}>{p.category}</span>

        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.38em',
          textTransform: 'uppercase', color: 'rgba(26,22,20,0.4)', marginBottom: 5,
        }}>{p.brand}</p>

        <Link to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.45rem', fontWeight: 400, color: '#1a1614',
            lineHeight: 1.1, marginBottom: 4,
          }}>{p.name}</h3>
        </Link>

        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(26,22,20,0.35)', marginBottom: 14,
        }}>{p.style}</p>

        <div style={{ width: 28, height: 1, background: p.accent, opacity: 0.5, margin: '0 auto 14px' }} />

        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
          {p.taste.map(t => (
            <span key={t} style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: p.accent, border: `1px solid ${p.accent}`,
              padding: '3px 8px', opacity: 0.85,
            }}>{t}</span>
          ))}
        </div>

        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 10, fontWeight: 300,
          color: 'rgba(26,22,20,0.5)', lineHeight: 1.75,
          marginBottom: 16, textAlign: 'left',
        }}>{p.note}</p>

        <div style={{
          display: 'grid', gridTemplateColumns: p.abv ? '1fr 1fr 1fr' : '1fr 1fr',
          gap: 0, marginBottom: 12,
          borderTop: '1px solid rgba(26,22,20,0.07)',
          borderBottom: '1px solid rgba(26,22,20,0.07)',
          padding: '10px 0',
        }}>
          {[
            p.abv && ['ABV', p.abv],
            ['Size', p.size],
            ['Origin', p.origin.split('·')[0].trim()],
          ].filter(Boolean).map(([label, val]) => (
            <div key={label} style={{ textAlign: 'center', padding: '0 6px' }}>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 8, fontWeight: 700, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'rgba(26,22,20,0.3)', marginBottom: 3,
              }}>{label}</p>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '0.95rem', color: '#1a1614',
              }}>{val}</p>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          marginBottom: 14,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7a9a6e' }} />
          <span style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, color: 'rgba(26,22,20,0.4)', letterSpacing: '0.1em',
          }}>{p.soldThisMonth.toLocaleString()} sold this month</span>
        </div>

        <div style={{
          borderTop: '1px solid rgba(26,22,20,0.07)',
          paddingTop: 14,
          display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10,
          marginBottom: 12,
        }}>
          {p.oldPrice && (
            <span style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.2rem', fontStyle: 'italic',
              color: 'rgba(26,22,20,0.3)', textDecoration: 'line-through',
            }}>€{p.oldPrice.toFixed(2).replace('.', ',')}</span>
          )}
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.7rem', fontStyle: 'italic',
            color: '#1a1614', fontWeight: 400, lineHeight: 1,
          }}>€{p.price.toFixed(2).replace('.', ',')}</span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          <Link to={`/product/${p.id}`} style={{
            flex: 1, padding: '12px 0', textAlign: 'center',
            border: `1px solid ${p.accent}`,
            color: p.accent,
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', textDecoration: 'none',
            transition: 'background 0.25s ease, color 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = p.accent; e.currentTarget.style.color = '#f0eeea' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = p.accent }}
          >View Details</Link>
        </div>
      </div>
    </div>
  )
}

export default function BestsellerPage() {
  const [selCategories,   setSelCategories]   = useState([])
  const [selPrices,       setSelPrices]       = useState([])
  const [selCountries,    setSelCountries]    = useState([])
  const [selEatingStyles, setSelEatingStyles] = useState([])
  const [selAbv,          setSelAbv]          = useState([])
  const [selBrands,       setSelBrands]       = useState([])
  const [onSaleOnly,      setOnSaleOnly]      = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const isMobile = useIsMobile()

  function toggle(arr, setArr, val) {
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  function resetAll() {
    setSelCategories([]); setSelPrices([]); setSelCountries([])
    setSelEatingStyles([]); setSelAbv([]); setSelBrands([]); setOnSaleOnly(false)
  }

  const hasFilters = selCategories.length || selPrices.length || selCountries.length ||
    selEatingStyles.length || selAbv.length || selBrands.length || onSaleOnly

  function matchesGroup(p, options, selected) {
    if (!selected.length) return true
    return options.filter(o => selected.includes(o.label)).some(o => o.fn(p))
  }

  const filtered = BESTSELLERS.filter(p => {
    if (selCategories.length && !selCategories.includes(p.category)) return false
    if (!matchesGroup(p, PRICE_OPTIONS, selPrices)) return false
    if (!matchesGroup(p, COUNTRY_OPTIONS, selCountries)) return false
    if (!matchesGroup(p, EATING_STYLE_OPTIONS, selEatingStyles)) return false
    if (!matchesGroup(p, ABV_OPTIONS, selAbv)) return false
    if (selBrands.length && !selBrands.includes(p.brand)) return false
    if (onSaleOnly && !p.discount) return false
    return true
  })

  return (
    <>
      <Cursor />
      <div style={{ background: '#1a1614', color: 'rgba(240,238,234,0.65)', fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '10px 20px', height: 36 }}>
        <span style={{ whiteSpace: 'nowrap' }}>✦ Quality instead of quantity</span>
        <span>✦ 9,500 independent products</span>
        <span>✦ No mainstream</span>
      </div>
      <Nav top={36} showToggle={false} />

      <main style={{ paddingTop: 108, background: '#f8f7f5', minHeight: '100vh' }}>
        <div style={{
          maxWidth: 1380, margin: '0 auto',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 4vw, 5rem)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
          gap: isMobile ? 0 : 48,
          alignItems: 'start',
        }}>

          {/* ── Mobile filter button ── */}
          {isMobile && (
            <button
              onClick={() => setMobileFilterOpen(true)}
              style={{
                marginBottom: 16, background: 'none',
                border: '1px solid rgba(26,22,20,0.2)',
                padding: '10px 20px', cursor: 'none', width: '100%',
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: '#1a1614',
              }}
            >⊟ Filter</button>
          )}

          {/* ── Left sidebar ── */}
          {(!isMobile || mobileFilterOpen) && (
          <aside style={{
            position: mobileFilterOpen ? 'fixed' : 'sticky',
            inset: mobileFilterOpen ? 0 : 'auto',
            top: mobileFilterOpen ? 0 : 124,
            zIndex: mobileFilterOpen ? 99 : 'auto',
            background: '#f8f7f5',
            overflowY: mobileFilterOpen ? 'auto' : 'visible',
            padding: mobileFilterOpen ? '72px 24px 60px' : 0,
          }}>

            {/* Header row */}
            {mobileFilterOpen && (
              <button onClick={() => setMobileFilterOpen(false)} style={{
                position: 'absolute', top: 20, right: 20,
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 22, color: '#1a1614', lineHeight: 1,
              }}>✕</button>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 8, fontWeight: 700, letterSpacing: '0.38em',
                textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)',
              }}>Filter</p>
              {hasFilters ? (
                <button onClick={resetAll} style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: '#c4933f', background: 'none', border: 'none', cursor: 'none',
                  padding: 0, transition: 'opacity 0.2s',
                }}>Reset</button>
              ) : null}
            </div>

            {/* Category */}
            <FilterSection title="Category" defaultOpen={true}>
              {CATEGORY_OPTIONS.map(cat => {
                const count = BESTSELLERS.filter(p => p.category === cat).length
                return (
                  <FilterCheck
                    key={cat} label={cat} count={count}
                    checked={selCategories.includes(cat)}
                    onChange={() => toggle(selCategories, setSelCategories, cat)}
                  />
                )
              })}
            </FilterSection>

            {/* Price */}
            <FilterSection title="Price" defaultOpen={false}>
              {PRICE_OPTIONS.map(opt => (
                <FilterCheck
                  key={opt.label} label={opt.label}
                  checked={selPrices.includes(opt.label)}
                  onChange={() => toggle(selPrices, setSelPrices, opt.label)}
                />
              ))}
            </FilterSection>

            {/* Eating Style */}
            <FilterSection title="Eating Style" defaultOpen={false}>
              {EATING_STYLE_OPTIONS.map(opt => {
                const count = BESTSELLERS.filter(opt.fn).length
                return (
                  <FilterCheck
                    key={opt.label} label={opt.label} count={count}
                    checked={selEatingStyles.includes(opt.label)}
                    onChange={() => toggle(selEatingStyles, setSelEatingStyles, opt.label)}
                  />
                )
              })}
            </FilterSection>

            {/* Country / Origin */}
            <FilterSection title="Country" defaultOpen={false}>
              {COUNTRY_OPTIONS.map(opt => {
                const count = BESTSELLERS.filter(opt.fn).length
                return (
                  <FilterCheck
                    key={opt.label} label={opt.label} count={count}
                    checked={selCountries.includes(opt.label)}
                    onChange={() => toggle(selCountries, setSelCountries, opt.label)}
                  />
                )
              })}
            </FilterSection>

            {/* ABV */}
            <FilterSection title="Alcohol Content" defaultOpen={false}>
              {ABV_OPTIONS.map(opt => {
                const count = BESTSELLERS.filter(opt.fn).length
                return (
                  <FilterCheck
                    key={opt.label} label={opt.label} count={count}
                    checked={selAbv.includes(opt.label)}
                    onChange={() => toggle(selAbv, setSelAbv, opt.label)}
                  />
                )
              })}
            </FilterSection>

            {/* Brand / Manufacturer */}
            <FilterSection title="Brand" defaultOpen={false}>
              {BRAND_OPTIONS.map(brand => {
                const count = BESTSELLERS.filter(p => p.brand === brand).length
                return (
                  <FilterCheck
                    key={brand} label={brand} count={count}
                    checked={selBrands.includes(brand)}
                    onChange={() => toggle(selBrands, setSelBrands, brand)}
                  />
                )
              })}
            </FilterSection>

            {/* On Sale */}
            <FilterSection title="Offers" defaultOpen={false}>
              <FilterCheck
                label="On Sale"
                count={BESTSELLERS.filter(p => p.discount).length}
                checked={onSaleOnly}
                onChange={() => setOnSaleOnly(v => !v)}
              />
            </FilterSection>

            {/* Result count */}
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(26,22,20,0.08)' }}>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.4rem', fontWeight: 300, color: '#1a1614',
              }}>
                {filtered.length}
                <span style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(26,22,20,0.35)', marginLeft: 6,
                }}>products</span>
              </p>
            </div>
          </aside>
          )}

          {/* ── Product grid ── */}
          <div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 28, paddingBottom: 18,
              borderBottom: '1px solid rgba(26,22,20,0.08)',
            }}>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 10, color: 'rgba(26,22,20,0.4)', letterSpacing: '0.15em',
              }}>
                Ranked by sales
              </p>
              <Link to="/" style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'rgba(26,22,20,0.45)',
                textDecoration: 'none', borderBottom: '1px solid rgba(26,22,20,0.2)',
                paddingBottom: 2, cursor: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.45)'}
              >← Back to Shop</Link>
            </div>

            <div className="bs-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}>
              {filtered.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
