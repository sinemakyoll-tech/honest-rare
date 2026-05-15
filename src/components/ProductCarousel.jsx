import { useState } from 'react'
import { Link } from 'react-router-dom'
import CarouselTrack from './CarouselTrack'
import { useCart } from '../context/CartContext'

const CARDS = [
  { id: 'shearwater-gin',     name: 'Shearwater Gin',     sub: 'Hanseatic Craftsmanship', price: '€38', badge: '−15%',   accent: '#4a6fa5', img: 'https://images.unsplash.com/photo-1563630440859-f5d8999f5afe?w=400&q=85&auto=format&fit=crop' },
  { id: 'saffron-gin',        name: 'Gentle Gin Saffron', sub: 'Safran in Gin',           price: '€44', badge: '−15%',   accent: '#c4933f', img: 'https://images.unsplash.com/photo-1601751818941-571144562ff8?w=400&q=85&auto=format&fit=crop' },
  { id: 'spirit-free',        name: 'Spirit of the Free', sub: 'Alcohol-Free',            price: '€28', badge: 'New',    accent: '#7a9a6e', img: 'https://images.unsplash.com/photo-1563223771-b3ceda999392?w=400&q=85&auto=format&fit=crop' },
  { id: 'independent-brews',  name: 'Independent Brews',  sub: 'Craft Beer',              price: '€6',  badge: 'Arrival',accent: '#8b6914', img: 'https://images.unsplash.com/photo-1746422029383-fe48bb6276f4?w=400&q=85&auto=format&fit=crop' },
  { id: 'rare-roasts',        name: 'Rare Roasts',        sub: 'Coffee & Tea',            price: '€18', badge: 'Best',   accent: '#5c3d1e', img: 'https://images.unsplash.com/photo-1672042382060-8a08025310ef?w=400&q=85&auto=format&fit=crop' },
  { id: 'pantry-essentials',  name: 'Pantry Essentials',  sub: 'Spices & Snacks',         price: '€12', badge: 'Pick',   accent: '#9e4a2a', img: 'https://images.unsplash.com/photo-1621318551436-68573392fd5c?w=400&q=85&auto=format&fit=crop' },
  { id: 'alpine-negroni-kit', name: 'Alpine Negroni Kit', sub: 'Cocktail Bundle',         price: '€52', badge: 'Bundle', accent: '#6b4f8a', img: 'https://images.unsplash.com/photo-1514362362976-6eaab6068a08?w=400&q=85&auto=format&fit=crop' },
  { id: 'nordic-reserve',     name: 'Nordic Reserve',     sub: 'Small Batch Vodka',       price: '€36', badge: 'Limited',accent: '#3a7a8a', img: 'https://images.unsplash.com/photo-1530914379853-b1e778a77e95?w=400&q=85&auto=format&fit=crop' },
]

const LOOP = [...CARDS, ...CARDS]

function Card({ card }) {
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCart()

  return (
    <div
      style={{
        flexShrink: 0,
        width: 220,
        marginRight: 12,
        background: '#f8f7f4',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'none',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 260, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={card.img}
          alt={card.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* Subtle bottom vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,22,20,0.32) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        {/* Badge — top right, minimal */}
        <span style={{
          position: 'absolute', top: 12, right: 12,
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 7, fontWeight: 700, letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: '#f0eeea',
          background: 'rgba(26,22,20,0.55)',
          backdropFilter: 'blur(8px)',
          padding: '4px 9px',
        }}>{card.badge}</span>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Sub + animated rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 7.5, fontWeight: 700, letterSpacing: '0.4em',
            textTransform: 'uppercase', color: '#c4933f',
            whiteSpace: 'nowrap',
          }}>{card.sub}</span>
          <span style={{
            display: 'block', height: 1, flexShrink: 0, width: 28,
            background: 'linear-gradient(90deg, rgba(196,147,63,0.75), transparent)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'opacity 0.35s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1)',
          }} />
        </div>

        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.15rem', fontWeight: 300,
          color: '#1a1614', lineHeight: 1.15,
          flex: 1, marginBottom: 14,
          letterSpacing: '0.01em',
        }}>{card.name}</p>

        {/* Price + arrow row */}
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          paddingTop: 12,
          borderTop: '1px solid rgba(26,22,20,0.07)',
        }}>
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.25rem', fontWeight: 400, color: '#1a1614',
          }}>{card.price}</span>
          <span style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#c4933f',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(3px)' : 'translateX(0)',
            transition: 'opacity 0.3s, transform 0.3s',
          }}>→</span>
        </div>

        <button
          onClick={() => addItem({
            id: card.id,
            name: card.name,
            price: parseFloat(card.price.replace(/[^0-9.]/g, '')),
            img: card.img,
          }, 1)}
          style={{
            marginTop: 10, width: '100%',
            background: hovered ? card.accent : 'transparent',
            border: `1px solid ${card.accent}`,
            color: hovered ? '#f0eeea' : card.accent,
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 8, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', padding: '10px 0',
            cursor: 'none',
            transition: 'background 0.25s ease, color 0.25s ease',
            opacity: hovered ? 1 : 0.6,
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function ProductCarousel() {
  return (
    <div style={{
      background: '#f0eeea',
      borderTop: '1px solid rgba(196,147,63,0.12)',
      borderBottom: '1px solid rgba(196,147,63,0.12)',
      padding: '36px 0',
      overflow: 'hidden',
    }}>
      {/* Label */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 20, marginBottom: 28,
      }}>
        <span style={{ display: 'block', width: 48, height: 1, background: 'linear-gradient(270deg, rgba(196,147,63,0.55), transparent)' }} />
        <span style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 8, fontWeight: 700, letterSpacing: '0.52em',
          textTransform: 'uppercase', color: 'rgba(26,22,20,0.28)',
          whiteSpace: 'nowrap',
        }}>
          The Selection · 9,500 Products · No Mainstream
        </span>
        <span style={{ display: 'block', width: 48, height: 1, background: 'linear-gradient(90deg, rgba(196,147,63,0.55), transparent)' }} />
      </div>

      {/* Scrolling strip */}
      <CarouselTrack duration={44} step={700}>
        {LOOP.map((card, i) => <Card key={i} card={card} />)}
      </CarouselTrack>
    </div>
  )
}
