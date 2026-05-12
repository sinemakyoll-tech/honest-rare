import { useState, useRef } from 'react'

const RECIPES = [
  {
    id: 1, tag: 'Beer Cocktail', time: '5 min',
    name: 'Weizen Shandy',
    desc: 'Feldmann Hefeweizen, fresh lemon juice, a pinch of ginger. Refreshing, cloudless, perfect for summer.',
    img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=85&auto=format&fit=crop',
  },
  {
    id: 2, tag: 'Food Pairing', time: '45 min',
    name: 'Kellerbier Bread',
    desc: 'Dense, malty loaf brewed with Kellerbier instead of water. Pairs flawlessly with aged Gouda and salted butter.',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=85&auto=format&fit=crop',
  },
  {
    id: 3, tag: 'BBQ Glaze', time: '15 min',
    name: 'Rauchbier Rib Glaze',
    desc: 'Smoked Märzen reduced with honey, mustard and apple cider vinegar. The only glaze your short ribs will ever need.',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=85&auto=format&fit=crop',
  },
  {
    id: 4, tag: 'Beer Batter', time: '20 min',
    name: 'Hell Nr. 1 Fish Batter',
    desc: 'Ultra-light tempura batter made with ice-cold Helles. Crisp, golden, and gone in seconds.',
    img: 'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=500&q=85&auto=format&fit=crop',
  },
  {
    id: 5, tag: 'Dessert', time: '60 min',
    name: 'Dunkel Chocolate Cake',
    desc: 'Dark lager deepens the bittersweet chocolate — a cake that belongs at a long table with good company.',
    img: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=500&q=85&auto=format&fit=crop',
  },
  {
    id: 6, tag: 'Cheese Dip', time: '10 min',
    name: 'IPA Beer Cheese',
    desc: 'Sharp cheddar, cream cheese, Hopfenwerk IPA and a dash of hot sauce. Best served warm with pretzels.',
    img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=500&q=85&auto=format&fit=crop',
  },
  {
    id: 7, tag: 'Brunch', time: '25 min',
    name: 'Hefeweizen Pancakes',
    desc: 'Wheat beer gives the batter a natural lift and a hint of banana. Serve with maple syrup and toasted almonds.',
    img: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&q=85&auto=format&fit=crop',
  },
  {
    id: 8, tag: 'Beer Cocktail', time: '3 min',
    name: 'Dunkel Black Velvet',
    desc: 'Equal parts Dunkel Reserve and dry sparkling wine — an old Bavarian toast dressed for a modern evening.',
    img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=85&auto=format&fit=crop',
  },
]

const RECIPES_LOOP = [...RECIPES, ...RECIPES]

function RecipeCard({ r }) {
  return (
    <a href="#" style={{
      flexShrink: 0, width: 300, marginRight: 20,
      background: '#fff', overflow: 'hidden',
      border: '1px solid rgba(26,22,20,0.07)',
      textDecoration: 'none', display: 'block',
      cursor: 'none',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,22,20,0.1)'
        e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.querySelector('img').style.transform = 'scale(1)'
      }}
    >
      {/* Image */}
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
        <img src={r.img} alt={r.name} style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transition: 'transform 0.5s ease',
        }} />
        <span style={{
          position: 'absolute', top: 10, left: 10,
          background: 'rgba(26,22,20,0.78)', color: '#f0eeea',
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 8, fontWeight: 700, letterSpacing: '0.28em',
          textTransform: 'uppercase', padding: '4px 10px',
        }}>{r.tag}</span>
        <span style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(196,147,63,0.9)', color: '#fff',
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 8, fontWeight: 700, letterSpacing: '0.2em',
          padding: '4px 8px',
        }}>{r.time}</span>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 18px' }}>
        <h4 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.2rem', fontWeight: 400, color: '#1a1614',
          marginBottom: 8, lineHeight: 1.2,
        }}>{r.name}</h4>
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 10, fontWeight: 300,
          color: 'rgba(26,22,20,0.5)', lineHeight: 1.7,
        }}>{r.desc}</p>
      </div>
    </a>
  )
}

const FILTERS = [
  {
    label: 'KATEGORIE', open: true,
    options: ['Ale', 'Barrel Aged', 'Beer packages', 'Belgian beer', 'IPA', 'Lager', 'Stout', 'Wheat beer'],
  },
  { label: 'ALCOHOL', open: false, options: ['0.0% – 0.5%', '0.5% – 4%', '4% – 6%', '6% – 8%', '8%+'] },
  { label: 'STYLE / VARIETY', open: false, options: ['Helles', 'Kellerbier', 'Märzen', 'Pils', 'Weizen', 'Dunkel', 'IPA', 'Rauchbier'] },
  { label: 'COUNTRY', open: false, options: ['Germany', 'Belgium', 'Czech Republic', 'Austria', 'UK', 'USA'] },
  { label: 'GRAINS & MALTS', open: false, options: ['Barley', 'Wheat', 'Rye', 'Oats', 'Smoked Malt'] },
  { label: 'PRICE', open: false, options: ['Under €5', '€5 – €15', '€15 – €30', '€30 – €50', 'Over €50'] },
  { label: 'REGION', open: false, options: ['Franconia', 'Bavaria', 'Baden-Württemberg', 'Berlin', 'Rhineland'] },
  { label: 'BREWERY', open: false, options: ['Feldmann Brauerei', 'Augustiner', 'Weihenstephan', 'Schneider', 'Paulaner'] },
  { label: 'HOPS', open: false, options: ['Hallertau', 'Tettnang', 'Spalter Select', 'Saaz', 'Cascade'] },
  { label: 'TASTE', open: false, options: ['Mild', 'Hoppy', 'Malty', 'Fruity', 'Bitter', 'Smoky'] },
  { label: 'BITTERNESS (IBU)', open: false, options: ['0–10', '11–25', '26–40', '41–60', '60+'] },
  { label: 'ORGANIC', open: false, options: ['Organic certified', 'Non-organic'] },
]

const PRODUCTS = [
  {
    id: 1,
    brand: 'Feldmann Brauerei',
    name: 'Hell Nr. 1',
    style: 'Traditional Helles Lager',
    abv: '4.9%', ibu: 18, size: '500 ml',
    price: 2.80, oldPrice: null,
    perUnit: '€5.60 per l',
    discount: null, qty: null,
    taste: ['Mild', 'Malty', 'Refreshing'],
    note: 'A sunlit Helles of rare clarity — juniper, hallertau hops and pale Pilsner malt. The taste of a Bavarian summer afternoon.',
    pairing: 'Roast chicken · Soft cheese · Pretzels',
    hops: 'Hallertau Mittelfüh',
    origin: 'Bamberg, Franconia · Est. 1887',
    accent: '#5a8a6a',
    img: 'https://images.unsplash.com/photo-1746422029383-fe48bb6276f4?w=600&q=90&auto=format',
  },
  {
    id: 2,
    brand: 'Feldmann Brauerei',
    name: 'Kellerbier',
    style: 'Unfiltered Franconian Lager',
    abv: '5.2%', ibu: 22, size: '500 ml',
    price: 3.20, oldPrice: null,
    perUnit: '€6.40 per l',
    discount: null, qty: 6,
    taste: ['Earthy', 'Bready', 'Cloudy'],
    note: 'Unfiltered and unapologetic. Living yeast stays in — cloudy, complex, entirely true to a centuries-old Franconian tradition.',
    pairing: 'Bratwurst · Aged Gouda · Dark bread',
    hops: 'Spalter Select',
    origin: 'Bamberg, Franconia · Est. 1887',
    accent: '#5a8a6a',
    img: 'https://images.unsplash.com/photo-1720630253403-df9f5f89aaa4?w=600&q=90&auto=format',
  },
  {
    id: 3,
    brand: 'Feldmann Brauerei',
    name: 'Hefeweizen',
    style: 'Bavarian Wheat Beer',
    abv: '5.4%', ibu: 12, size: '500 ml',
    price: 2.90, oldPrice: null,
    perUnit: '€5.80 per l',
    discount: null, qty: null,
    taste: ['Banana', 'Clove', 'Creamy'],
    note: 'Naturally turbid, naturally wonderful. Aromatic banana and clove from a proprietary yeast strain cultivated since 1921.',
    pairing: 'Weisswurst · Lemon cake · Light pasta',
    hops: 'Tettnang',
    origin: 'Bamberg, Franconia · Est. 1887',
    accent: '#5a8a6a',
    img: 'https://images.unsplash.com/photo-1572577398906-b3124eae8e67?w=600&q=90&auto=format',
  },
  {
    id: 4,
    brand: 'Feldmann Brauerei',
    name: 'Dunkel Reserve',
    style: 'Dark Bavarian Lager',
    abv: '5.1%', ibu: 20, size: '500 ml',
    price: 2.90, oldPrice: 3.20,
    perUnit: '€5.80 per l',
    discount: -9, qty: null,
    taste: ['Roasted', 'Caramel', 'Smooth'],
    note: 'Darkness with depth. Deep mahogany, roasted Munich malt and caramel sweetness — a Dunkel for quiet evenings.',
    pairing: 'Roasted pork · Dark chocolate · Walnuts',
    hops: 'Hallertau Perle',
    origin: 'Bamberg, Franconia · Est. 1887',
    accent: '#5a8a6a',
    img: 'https://images.unsplash.com/photo-1703564803585-48b51539e119?w=600&q=90&auto=format',
  },
  {
    id: 5,
    brand: 'Feldmann Brauerei',
    name: 'Hopfenwerk IPA',
    style: 'India Pale Ale',
    abv: '6.2%', ibu: 55, size: '330 ml',
    price: 3.50, oldPrice: null,
    perUnit: '€10.61 per l',
    discount: null, qty: null,
    taste: ['Citrus', 'Piney', 'Dry-hopped'],
    note: 'Where Old World craft meets bold ambition. Dry-hopped with Cascade and Centennial — assertive, aromatic, unapologetic.',
    pairing: 'Spiced burger · Blue cheese · Mango salsa',
    hops: 'Cascade · Centennial',
    origin: 'Bamberg, Franconia · Est. 1887',
    accent: '#5a8a6a',
    img: 'https://images.unsplash.com/photo-1623274545361-63e9d95e4643?w=600&q=90&auto=format',
  },
  {
    id: 6,
    brand: 'Feldmann Brauerei',
    name: 'Rauchbier Märzen',
    style: 'Smoked Amber Lager · Seasonal',
    abv: '5.8%', ibu: 28, size: '500 ml',
    price: 3.80, oldPrice: 4.20,
    perUnit: '€7.60 per l',
    discount: -10, qty: null,
    taste: ['Smoky', 'Rich', 'Malty'],
    note: 'The malt is smoked over beechwood for 72 hours before mashing — a ritual unchanged since Feldmann first lit the kiln in 1887.',
    pairing: 'Smoked salmon · Grilled ribs · Aged cheddar',
    hops: 'Hallertau Tradition',
    origin: 'Bamberg, Franconia · Est. 1887',
    accent: '#5a8a6a',
    img: 'https://images.unsplash.com/photo-1708166210414-10379843e2ea?w=600&q=90&auto=format',
  },
]

const SORTS = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Discount']

function FilterAccordion({ filter, checked, onToggleOpen, onToggleOption }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(26,22,20,0.08)' }}>
      <button
        onClick={() => onToggleOpen(filter.label)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 0', background: 'none', border: 'none', cursor: 'none',
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: '#1a1614',
        }}
      >
        {filter.label}
        <span style={{ fontSize: 14, color: 'rgba(26,22,20,0.4)', fontWeight: 300 }}>
          {filter.open ? '−' : '+'}
        </span>
      </button>

      {filter.open && (
        <div style={{ paddingBottom: 12 }}>
          {filter.label === 'KATEGORIE' && (
            <input
              type="text"
              placeholder="Search"
              style={{
                width: '100%', padding: '7px 10px', marginBottom: 8,
                border: '1px solid rgba(26,22,20,0.15)', borderRadius: 3,
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 11, color: '#1a1614', background: '#fff', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          )}
          {filter.options.map(opt => (
            <label key={opt} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '4px 0', cursor: 'none',
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 11, color: 'rgba(26,22,20,0.7)',
            }}>
              <input
                type="checkbox"
                checked={!!(checked[filter.label]?.[opt])}
                onChange={() => onToggleOption(filter.label, opt)}
                style={{ accentColor: '#c4933f', cursor: 'none' }}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductCard({ p }) {
  const [wished, setWished] = useState(false)
  const [hovered, setHovered] = useState(false)

  const ibuPct = Math.min(p.ibu / 80, 1) * 100

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
      {/* Badges */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {p.discount && (
          <span style={{
            background: '#2a5a8a', color: '#fff',
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
            padding: '4px 8px',
          }}>{p.discount}%</span>
        )}
        {p.qty && (
          <span style={{
            background: '#d4732a', color: '#fff',
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, fontWeight: 700,
            padding: '4px 8px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="4" width="10" height="7" rx="1" stroke="white" strokeWidth="1.2"/>
              <path d="M4 4V3a2 2 0 014 0v1" stroke="white" strokeWidth="1.2"/>
            </svg>
            ×{p.qty}
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button onClick={() => setWished(w => !w)} style={{
        position: 'absolute', top: 10, right: 10, zIndex: 3,
        background: 'none', border: 'none', cursor: 'none',
        padding: 4, lineHeight: 1, fontSize: 20,
        color: wished ? '#c4933f' : 'rgba(26,22,20,0.22)',
        transition: 'color 0.2s',
      }}>
        {wished ? '♥' : '♡'}
      </button>

      {/* Image */}
      <div style={{
        height: 280, background: '#f5f4f2',
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
      <div style={{ padding: '20px 20px 24px', textAlign: 'center' }}>

        {/* Brand */}
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.38em',
          textTransform: 'uppercase', color: p.accent, marginBottom: 6,
        }}>{p.brand}</p>

        {/* Name */}
        <h3 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.55rem', fontWeight: 400, color: '#1a1614',
          lineHeight: 1.1, marginBottom: 4,
        }}>{p.name}</h3>

        {/* Style */}
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(26,22,20,0.38)', marginBottom: 16,
        }}>{p.style}</p>

        {/* Gold rule */}
        <div style={{ width: 28, height: 1, background: p.accent, opacity: 0.5, margin: '0 auto 16px' }} />

        {/* Taste tags */}
        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          {p.taste.map(t => (
            <span key={t} style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: p.accent, border: `1px solid ${p.accent}`,
              padding: '3px 8px', opacity: 0.85,
            }}>{t}</span>
          ))}
        </div>

        {/* Note */}
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 10, fontWeight: 300,
          color: 'rgba(26,22,20,0.5)', lineHeight: 1.75,
          marginBottom: 18, textAlign: 'left',
        }}>{p.note}</p>

        {/* ABV · IBU · Size */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 0, marginBottom: 14,
          borderTop: '1px solid rgba(26,22,20,0.07)',
          borderBottom: '1px solid rgba(26,22,20,0.07)',
          padding: '12px 0',
        }}>
          {[['ABV', p.abv], ['IBU', p.ibu], ['Size', p.size]].map(([label, val]) => (
            <div key={label} style={{ textAlign: 'center', padding: '0 8px' }}>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 8, fontWeight: 700, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'rgba(26,22,20,0.3)', marginBottom: 4,
              }}>{label}</p>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.05rem', color: '#1a1614',
              }}>{val}</p>
            </div>
          ))}
        </div>

        {/* Bitterness bar */}
        <div style={{ marginBottom: 14, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <span style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 8, fontWeight: 700, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'rgba(26,22,20,0.3)',
            }}>Bitterness</span>
            <span style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 8, color: 'rgba(26,22,20,0.35)',
            }}>{p.ibu} IBU</span>
          </div>
          <div style={{ height: 2, background: 'rgba(26,22,20,0.08)', borderRadius: 1 }}>
            <div style={{
              height: '100%', width: `${ibuPct}%`,
              background: p.accent, borderRadius: 1, opacity: 0.7,
            }} />
          </div>
        </div>

        {/* Hops + Origin */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, textAlign: 'left', marginBottom: 18 }}>
          {[
            { icon: '◎', label: p.hops + ' hops' },
            { icon: '◇', label: p.origin },
            { icon: '▸', label: 'Pairs: ' + p.pairing },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ color: 'rgba(26,22,20,0.25)', fontSize: 10, marginTop: 1, flexShrink: 0 }}>{icon}</span>
              <span style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 10, color: 'rgba(26,22,20,0.5)', lineHeight: 1.55,
              }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{
          borderTop: '1px solid rgba(26,22,20,0.07)',
          paddingTop: 16,
          display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10,
        }}>
          {p.oldPrice && (
            <span style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.3rem', fontStyle: 'italic',
              color: 'rgba(26,22,20,0.3)', textDecoration: 'line-through',
            }}>€{p.oldPrice.toFixed(2).replace('.', ',')}</span>
          )}
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.8rem', fontStyle: 'italic',
            color: '#1a1614', fontWeight: 400, lineHeight: 1,
          }}>€{p.price.toFixed(2).replace('.', ',')}</span>
          <span style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, color: 'rgba(26,22,20,0.35)',
          }}>({p.perUnit})</span>
        </div>

        {/* Add to cart */}
        <button style={{
          marginTop: 14, width: '100%',
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

export function RecipeCarousel() {
  const innerRef = useRef(null)

  return (
    <div style={{
      marginTop: 72,
      borderTop: '1px solid rgba(26,22,20,0.08)',
      paddingTop: 48,
    }}>
      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <p style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: '#c4933f', marginBottom: 8,
          }}>Recipes & Pairings</p>
          <h3 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            color: '#1a1614', lineHeight: 1,
          }}>From the Feldmann Kitchen</h3>
        </div>
        <a href="#" style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: '#1a1614',
          textDecoration: 'none', borderBottom: '1px solid rgba(26,22,20,0.3)',
          paddingBottom: 2, cursor: 'none',
        }}>All Recipes</a>
      </div>

      {/* Scrolling strip */}
      <div
        style={{ overflow: 'hidden', cursor: 'none', margin: '0 -40px' }}
        onMouseEnter={() => { if (innerRef.current) innerRef.current.style.animationPlayState = 'paused' }}
        onMouseLeave={() => { if (innerRef.current) innerRef.current.style.animationPlayState = 'running' }}
      >
        <div
          ref={innerRef}
          className="marquee-inner"
          style={{ display: 'flex', alignItems: 'stretch', paddingLeft: 40, animationDuration: '48s' }}
        >
          {RECIPES_LOOP.map((r, i) => <RecipeCard key={i} r={r} />)}
        </div>
      </div>
    </div>
  )
}

export default function ProductListing() {
  const [filters, setFilters] = useState(FILTERS)
  const [checked, setChecked] = useState({})
  const [sort, setSort] = useState('Popularity')
  const [sortOpen, setSortOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleOpen = label => {
    setFilters(f => f.map(x => x.label === label ? { ...x, open: !x.open } : x))
  }

  const toggleOption = (label, opt) => {
    setChecked(c => ({
      ...c,
      [label]: { ...c[label], [opt]: !c[label]?.[opt] },
    }))
  }

  return (
    <section id="collection" style={{ background: '#f8f7f5', padding: '72px 0 100px' }}>
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: '0 40px' }}>

        {/* Section header */}
        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid rgba(26,22,20,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, fontWeight: 700, letterSpacing: '0.45em',
                textTransform: 'uppercase', color: '#c4933f', marginBottom: 10,
              }}>Craft Beer · Independent Breweries</p>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 300, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                color: '#1a1614', lineHeight: 0.95, marginBottom: 12,
              }}>Feldmann Brauerei</h2>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 11, color: 'rgba(26,22,20,0.45)', letterSpacing: '0.12em',
                maxWidth: 480, lineHeight: 1.75,
              }}>
                Family-owned since 1887. Six generations of Franconian brewing tradition — unfiltered, uncompromising, and entirely independent.
              </p>
            </div>
            <p style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '3rem', fontWeight: 300, color: 'rgba(26,22,20,0.08)',
              letterSpacing: '-0.02em', lineHeight: 1,
            }}>6 products</p>
          </div>
        </div>

        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="md:hidden"
          style={{
            marginBottom: 20, background: 'none',
            border: '1px solid rgba(26,22,20,0.2)',
            padding: '10px 20px', cursor: 'none', width: '100%',
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: '#1a1614',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          ⊟ Filter & Sort
        </button>

        <div className="listing-layout" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'start' }}>

          {/* ── Sidebar ── */}
          <aside className={`listing-sidebar${mobileFiltersOpen ? ' mobile-open' : ''}`} style={{ position: 'sticky', top: 100 }}>
            {/* Mobile close button */}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="md:hidden"
              style={{
                position: 'absolute', top: 24, right: 24,
                background: 'none', border: 'none', cursor: 'none',
                fontSize: 22, color: '#1a1614',
              }}
            >✕</button>
            <p style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, fontWeight: 700, letterSpacing: '0.4em',
              textTransform: 'uppercase', color: 'rgba(26,22,20,0.3)',
              marginBottom: 16,
            }}>Filter</p>
            {filters.map(f => (
              <FilterAccordion
                key={f.label}
                filter={f}
                checked={checked}
                onToggleOpen={toggleOpen}
                onToggleOption={toggleOption}
              />
            ))}
          </aside>

          {/* ── Main content ── */}
          <div>
            {/* Toolbar */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 28, paddingBottom: 18,
              borderBottom: '1px solid rgba(26,22,20,0.08)',
            }}>
              {/* Show more info */}
              <button style={{
                background: 'none',
                border: '1px solid rgba(26,22,20,0.18)',
                padding: '8px 16px', cursor: 'none',
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 11, letterSpacing: '0.08em', color: '#1a1614',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                Show more info (2)
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 4l3 3 3-3" stroke="#1a1614" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </button>

              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setSortOpen(o => !o)}
                  style={{
                    background: 'none', border: 'none', cursor: 'none',
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
                    textTransform: 'uppercase', color: '#1a1614',
                    display: 'flex', alignItems: 'center', gap: 8, padding: 0,
                  }}
                >
                  Sort · {sort} ▾
                </button>
                {sortOpen && (
                  <div style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                    background: '#fff', border: '1px solid rgba(26,22,20,0.1)',
                    boxShadow: '0 12px 32px rgba(26,22,20,0.1)', zIndex: 20,
                    minWidth: 210,
                  }}>
                    {SORTS.map(s => (
                      <button key={s}
                        onClick={() => { setSort(s); setSortOpen(false) }}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left',
                          padding: '11px 18px',
                          background: s === sort ? '#f0eeea' : 'none',
                          border: 'none', cursor: 'none',
                          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                          fontSize: 10, color: '#1a1614', letterSpacing: '0.12em',
                          borderLeft: s === sort ? '2px solid #c4933f' : '2px solid transparent',
                        }}
                      >{s}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product grid */}
            <div className="product-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}>
              {PRODUCTS.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </div>

        {/* ── Recipe Carousel ── */}
        <RecipeCarousel />
      </div>
    </section>
  )
}
