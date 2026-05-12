import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'

const BESTSELLERS = [
  {
    id: 1,
    rank: 1,
    brand: 'Shearwater Distillery',
    name: 'Shearwater Gin',
    style: 'London Dry · Hanseatic Craft',
    category: 'Gin',
    abv: '43%',
    size: '700 ml',
    price: 38,
    oldPrice: 44,
    discount: -14,
    taste: ['Juniper', 'Citrus', 'Floral'],
    note: 'Distilled in small copper pot stills on the Hamburg waterfront. Twelve botanicals — juniper, coriander seed, coastal angelica — produce a gin that is bright, clean, and entirely unapologetic.',
    pairing: 'Tonic · Olive · Cucumber ribbon',
    origin: 'Hamburg, Germany · Est. 2014',
    accent: '#4a6fa5',
    img: 'https://images.unsplash.com/photo-1563630440859-f5d8999f5afe?w=600&q=90&auto=format&fit=crop',
    soldThisMonth: 412,
  },
  {
    id: 2,
    rank: 2,
    brand: 'Gentle Spirits',
    name: 'Gentle Gin Saffron',
    style: 'Saffron-Infused · Premium',
    category: 'Gin',
    abv: '40%',
    size: '700 ml',
    price: 44,
    oldPrice: null,
    discount: null,
    taste: ['Saffron', 'Honey', 'Pepper'],
    note: 'Real Persian saffron threads steep for 48 hours in neutral grain spirit before a final redistillation. The result is a gin of impossible warmth — golden, aromatic, singular.',
    pairing: 'Fever-Tree Mediterranean · Grapefruit · Cardamom',
    origin: 'Copenhagen, Denmark · Est. 2019',
    accent: '#c4933f',
    img: 'https://images.unsplash.com/photo-1601751818941-571144562ff8?w=600&q=90&auto=format&fit=crop',
    soldThisMonth: 389,
  },
  {
    id: 3,
    rank: 3,
    brand: 'Feldmann Brauerei',
    name: 'Hefeweizen',
    style: 'Bavarian Wheat Beer',
    category: 'Craft Beer',
    abv: '5.4%',
    size: '500 ml',
    price: 2.90,
    oldPrice: null,
    discount: null,
    taste: ['Banana', 'Clove', 'Creamy'],
    note: 'Naturally turbid, naturally wonderful. Aromatic banana and clove from a proprietary yeast strain cultivated since 1921. The taste of a Bavarian Sunday morning.',
    pairing: 'Weisswurst · Lemon cake · Light pasta',
    origin: 'Bamberg, Franconia · Est. 1887',
    accent: '#8b6914',
    img: 'https://images.unsplash.com/photo-1572577398906-b3124eae8e67?w=600&q=90&auto=format&fit=crop',
    soldThisMonth: 1204,
  },
  {
    id: 4,
    rank: 4,
    brand: 'Rare Roasts',
    name: 'Ethiopia Yirgacheffe',
    style: 'Single Origin · Natural Process',
    category: 'Coffee',
    abv: null,
    size: '250 g',
    price: 18,
    oldPrice: null,
    discount: null,
    taste: ['Blueberry', 'Jasmine', 'Dark Chocolate'],
    note: 'From the birthplace of coffee. Naturally processed on raised beds at 1,900m altitude — bright, fruit-forward, and entirely unlike anything commercial roasters produce.',
    pairing: 'Black · Aeropress · Morning ritual',
    origin: 'Yirgacheffe, Ethiopia · Harvest 2024',
    accent: '#5c3d1e',
    img: 'https://images.unsplash.com/photo-1672042382060-8a08025310ef?w=600&q=90&auto=format&fit=crop',
    soldThisMonth: 876,
  },
  {
    id: 5,
    rank: 5,
    brand: 'Spirit of the Free',
    name: 'Spirit of the Free',
    style: 'Alcohol-Free Spirit',
    category: 'Non-Alcoholic',
    abv: '0.0%',
    size: '700 ml',
    price: 28,
    oldPrice: null,
    discount: null,
    taste: ['Botanical', 'Spice', 'Elderflower'],
    note: 'Twenty-three botanicals distilled without alcohol. Complex enough to stand on its own, versatile enough to replace any spirit in any cocktail. The most honest bottle we carry.',
    pairing: 'Sparkling water · Lime · Fresh mint',
    origin: 'Vienna, Austria · Est. 2021',
    accent: '#7a9a6e',
    img: 'https://images.unsplash.com/photo-1563223771-b3ceda999392?w=600&q=90&auto=format&fit=crop',
    soldThisMonth: 654,
  },
  {
    id: 6,
    rank: 6,
    brand: 'Alpine Pantry',
    name: 'Wild Flower Honey',
    style: 'Raw · Unfiltered · Alpine',
    category: 'Food',
    abv: null,
    size: '380 g',
    price: 14,
    oldPrice: 16,
    discount: -13,
    taste: ['Wildflower', 'Beeswax', 'Meadow'],
    note: 'Harvested once a year at 1,600m in the Austrian Alps. Unpasteurised, unfiltered, and crystallised naturally. A jar that carries the entire summer in it.',
    pairing: 'Aged cheese · Dark bread · Gin cocktails',
    origin: 'Tyrol, Austria · Summer 2024',
    accent: '#c4933f',
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=90&auto=format&fit=crop',
    soldThisMonth: 541,
  },
  {
    id: 7,
    rank: 7,
    brand: 'Hopfenwerk',
    name: 'Nordic Reserve Vodka',
    style: 'Small Batch · Winter Wheat',
    category: 'Spirits',
    abv: '40%',
    size: '700 ml',
    price: 36,
    oldPrice: null,
    discount: null,
    taste: ['Clean', 'Mineral', 'Subtle Vanilla'],
    note: 'Six times distilled from Nordic winter wheat, then filtered through birch charcoal. Remarkable smoothness with a barely-there sweetness. The kind of vodka that converts sceptics.',
    pairing: 'Chilled neat · Dirty martini · Caviar',
    origin: 'Stockholm, Sweden · Est. 2016',
    accent: '#3a7a8a',
    img: 'https://images.unsplash.com/photo-1530914379853-b1e778a77e95?w=600&q=90&auto=format&fit=crop',
    soldThisMonth: 498,
  },
  {
    id: 8,
    rank: 8,
    brand: 'Spice Route',
    name: 'Smoked Paprika & Sea Salt',
    style: 'Artisan Blend · Hand-Smoked',
    category: 'Spices',
    abv: null,
    size: '85 g',
    price: 9,
    oldPrice: null,
    discount: null,
    taste: ['Smoky', 'Sweet Pepper', 'Ocean'],
    note: 'Pimentón de la Vera smoked over encina oak, blended with fleur de sel harvested by hand in the Camargue. A two-ingredient blend that changes everything it touches.',
    pairing: 'Grilled fish · Roasted vegetables · Gin rims',
    origin: 'Extremadura, Spain & Camargue, France',
    accent: '#9e4a2a',
    img: 'https://images.unsplash.com/photo-1621318551436-68573392fd5c?w=600&q=90&auto=format&fit=crop',
    soldThisMonth: 723,
  },
]

const CATEGORIES = ['All', 'Gin', 'Craft Beer', 'Coffee', 'Spirits', 'Non-Alcoholic', 'Food', 'Spices']

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

      {/* Image */}
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

      {/* Info */}
      <div style={{ padding: '18px 20px 22px', textAlign: 'center' }}>
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

        <h3 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.45rem', fontWeight: 400, color: '#1a1614',
          lineHeight: 1.1, marginBottom: 4,
        }}>{p.name}</h3>

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

        {/* Sold this month */}
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

        {/* Price */}
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

        <button style={{
          width: '100%',
          background: hovered ? p.accent : 'transparent',
          border: `1px solid ${p.accent}`,
          color: hovered ? '#f0eeea' : p.accent,
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
          textTransform: 'uppercase', padding: '12px 0',
          cursor: 'pointer',
          transition: 'background 0.25s ease, color 0.25s ease',
        }}>Add to Cart</button>
      </div>
    </div>
  )
}

export default function BestsellerPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? BESTSELLERS
    : BESTSELLERS.filter(p => p.category === activeCategory)

  return (
    <>
      <Cursor />
      <div style={{ background: '#1a1614', color: 'rgba(240,238,234,0.65)', fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '10px 20px', height: 36 }}>
        <span>✦ Quality instead of quantity</span>
        <span>✦ 9,500 independent products</span>
        <span>✦ No mainstream</span>
      </div>
      <Nav />

      <main style={{ paddingTop: 36 }}>

        {/* Hero */}
        <section style={{
          background: '#1a1614',
          padding: 'clamp(8rem, 14vw, 12rem) clamp(2rem, 8vw, 8rem) clamp(4rem, 8vw, 7rem)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Ghost number */}
          <div style={{
            position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)',
            fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300,
            fontSize: 'clamp(12rem, 30vw, 32rem)',
            color: 'rgba(196,147,63,0.04)', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none',
          }}>1</div>

          <div style={{ maxWidth: 1380, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.45em',
              textTransform: 'uppercase', color: '#c4933f', marginBottom: '1.5rem',
            }}>The Honest & Rare Selection</p>

            <h1 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300, lineHeight: 0.9,
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              color: '#f0eeea', marginBottom: '2rem',
            }}>
              Best<span style={{
                fontFamily: '"Born Ready Slanted", cursive',
                color: '#c4933f', fontStyle: 'normal',
              }}>sellers</span>
            </h1>

            <div style={{ width: 48, height: 1, background: 'rgba(196,147,63,0.5)', marginBottom: '2rem' }} />

            <p style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: '0.9rem', fontWeight: 300,
              color: 'rgba(240,238,234,0.4)', lineHeight: 1.85,
              maxWidth: '44ch',
            }}>
              The products our customers come back for. No algorithms, no paid placements —
              just what people actually buy, again and again.
            </p>
          </div>
        </section>

        {/* Category filter */}
        <div style={{
          background: '#f0eeea',
          borderBottom: '1px solid rgba(26,22,20,0.07)',
          padding: '0 clamp(2rem, 8vw, 8rem)',
          position: 'sticky', top: 36, zIndex: 40,
        }}>
          <div style={{
            maxWidth: 1380, margin: '0 auto',
            display: 'flex', gap: 0, overflowX: 'auto',
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.28em',
                  textTransform: 'uppercase', padding: '18px 22px',
                  background: 'none', border: 'none', cursor: 'none',
                  color: activeCategory === cat ? '#1a1614' : 'rgba(26,22,20,0.38)',
                  borderBottom: activeCategory === cat ? '2px solid #c4933f' : '2px solid transparent',
                  transition: 'all 0.2s', whiteSpace: 'nowrap',
                  marginBottom: -1,
                }}
              >{cat}</button>
            ))}
          </div>
        </div>

        {/* Products */}
        <section style={{ background: '#f8f7f5', padding: 'clamp(4rem, 8vw, 6rem) clamp(2rem, 6vw, 8rem)' }}>
          <div style={{ maxWidth: 1380, margin: '0 auto' }}>

            {/* Toolbar */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 36, paddingBottom: 20,
              borderBottom: '1px solid rgba(26,22,20,0.08)',
            }}>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 10, color: 'rgba(26,22,20,0.4)', letterSpacing: '0.15em',
              }}>
                {filtered.length} products · Ranked by sales
              </p>
              <Link to="/" style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#1a1614',
                textDecoration: 'none', borderBottom: '1px solid rgba(26,22,20,0.3)',
                paddingBottom: 2, cursor: 'none',
              }}>← Back to Shop</Link>
            </div>

            {/* Grid */}
            <div className="bs-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {filtered.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
