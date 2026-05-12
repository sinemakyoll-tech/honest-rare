import { useRef } from 'react'

const CARDS = [
  {
    name: 'Shearwater Gin',
    sub: 'Hanseatic Craftsmanship',
    price: '€38',
    badge: '−15%',
    accent: '#4a6fa5',
    img: 'https://images.unsplash.com/photo-1563630440859-f5d8999f5afe?w=400&q=85&auto=format&fit=crop',
  },
  {
    name: 'Gentle Gin Saffron',
    sub: 'Safran in Gin',
    price: '€44',
    badge: '−15%',
    accent: '#c4933f',
    img: 'https://images.unsplash.com/photo-1601751818941-571144562ff8?w=400&q=85&auto=format&fit=crop',
  },
  {
    name: 'Spirit of the Free',
    sub: 'Alcohol-Free',
    price: '€28',
    badge: 'New',
    accent: '#7a9a6e',
    img: 'https://images.unsplash.com/photo-1563223771-b3ceda999392?w=400&q=85&auto=format&fit=crop',
  },
  {
    name: 'Independent Brews',
    sub: 'Craft Beer',
    price: '€6',
    badge: 'Arrival',
    accent: '#8b6914',
    img: 'https://images.unsplash.com/photo-1746422029383-fe48bb6276f4?w=400&q=85&auto=format&fit=crop',
  },
  {
    name: 'Rare Roasts',
    sub: 'Coffee & Tea',
    price: '€18',
    badge: 'Best',
    accent: '#5c3d1e',
    img: 'https://images.unsplash.com/photo-1672042382060-8a08025310ef?w=400&q=85&auto=format&fit=crop',
  },
  {
    name: 'Pantry Essentials',
    sub: 'Spices & Snacks',
    price: '€12',
    badge: 'Pick',
    accent: '#9e4a2a',
    img: 'https://images.unsplash.com/photo-1621318551436-68573392fd5c?w=400&q=85&auto=format&fit=crop',
  },
  {
    name: 'Alpine Negroni Kit',
    sub: 'Cocktail Bundle',
    price: '€52',
    badge: 'Bundle',
    accent: '#6b4f8a',
    img: 'https://images.unsplash.com/photo-1514362362976-6eaab6068a08?w=400&q=85&auto=format&fit=crop',
  },
  {
    name: 'Nordic Reserve',
    sub: 'Small Batch Vodka',
    price: '€36',
    badge: 'Limited',
    accent: '#3a7a8a',
    img: 'https://images.unsplash.com/photo-1530914379853-b1e778a77e95?w=400&q=85&auto=format&fit=crop',
  },
]

// duplicate for seamless loop
const LOOP = [...CARDS, ...CARDS]

function Card({ card }) {
  return (
    <a
      href="#collection"
      style={{
        flexShrink: 0,
        width: 240,
        marginRight: 16,
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 2px 16px rgba(26,22,20,0.07)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'none',
        display: 'block',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,22,20,0.13)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 16px rgba(26,22,20,0.07)'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img
          src={card.img}
          alt={card.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Badge */}
        <span style={{
          position: 'absolute', top: 10, left: 10,
          background: card.accent, color: '#fff',
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
          textTransform: 'uppercase', padding: '4px 10px',
          borderRadius: 2,
        }}>{card.badge}</span>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 18px' }}>
        <p style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: card.accent, marginBottom: 4,
        }}>{card.sub}</p>
        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.15rem', fontWeight: 500, color: '#1a1614',
          marginBottom: 8, lineHeight: 1.2,
        }}>{card.name}</p>
        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.2rem', fontWeight: 300, color: '#1a1614',
        }}>{card.price}</p>
      </div>
    </a>
  )
}

export default function ProductCarousel() {
  const innerRef = useRef(null)

  return (
    <div style={{
      background: '#f0eeea',
      borderTop: '1px solid rgba(26,22,20,0.07)',
      borderBottom: '1px solid rgba(26,22,20,0.07)',
      padding: '32px 0',
      overflow: 'hidden',
    }}>
      {/* Label */}
      <div style={{
        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
        fontSize: 9, fontWeight: 700, letterSpacing: '0.45em',
        textTransform: 'uppercase', color: 'rgba(26,22,20,0.3)',
        textAlign: 'center', marginBottom: 24,
      }}>
        The Selection · 9,500 Products · No Mainstream
      </div>

      {/* Scrolling strip */}
      <div
        style={{ overflow: 'hidden', cursor: 'none' }}
        onMouseEnter={() => {
          if (innerRef.current) innerRef.current.style.animationPlayState = 'paused'
        }}
        onMouseLeave={() => {
          if (innerRef.current) innerRef.current.style.animationPlayState = 'running'
        }}
      >
        <div
          ref={innerRef}
          className="marquee-inner"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            paddingLeft: 16,
            animationDuration: '40s',
          }}
        >
          {LOOP.map((card, i) => (
            <Card key={i} card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}
