import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  {
    id: 'bundle-spirits',
    isBundle: true,
    isDark: true,
    name: 'The Botanist Bundle',
    subtitle: 'The Spirits Collection',
    note: 'Three of our finest botanicals, one extraordinary price. Curated for those who refuse to compromise — together for the first time.',
    bundleItems: [
      { name: 'Shearwater Gin',       style: 'Nordic Dry Gin · 43% ABV',      price: '€38' },
      { name: 'Gentle Gin Saffron',   style: 'Saffron Infused · 40% ABV',     price: '€44' },
      { name: 'Spirit of the Free',   style: 'Alcohol-Free Botanical',         price: '€28' },
    ],
    originalPrice: '€110',
    price: '€89',
    badge: 'Limited Campaign',
    accent: '#c4933f',
    bg: '#1e1b17',
    img: 'https://images.unsplash.com/photo-1577695464142-e3a24f4e88f2?w=1200&q=90&auto=format&fit=crop',
    imgPos: 'center',
  },
  {
    id: 'shearwater', num: '01', name: 'Shearwater Gin', subtitle: 'Hanseatic Craftsmanship',
    origin: 'Juniper · Sea Buckthorn · Seaweed',
    note: 'Where sky and sea meet. Nordic clarity in a bottle — juniper, sea buckthorn & seaweed create something entirely unrepeatable.',
    price: '€38', badge: 'Discover -15%',
    accent: '#4a6fa5', bg: '#eef1f7',
    img: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1200&q=90&auto=format&fit=crop',
    imgPos: 'center',
  },
  {
    id: 'saffron-gin', num: '02', name: 'Gentle Gin Saffron', subtitle: 'Safran in Gin',
    origin: 'Turmeric · Grapefruit · Saffron',
    note: 'A tango for your senses. Turmeric, grapefruit & saffron merge into a symphony of flavors — bold, golden, unforgettable.',
    price: '€44', badge: 'Order -15%',
    accent: '#c4933f', bg: '#f7f3ec',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=90&auto=format&fit=crop',
    imgPos: 'center 30%',
  },
  {
    id: 'alcohol-free', num: '03', name: 'Spirit of the Free', subtitle: 'Alcohol-Free',
    origin: 'Botanical · Zero Proof · Delicious',
    note: 'Spirits without a buzz. Alcohol-free and delicious — from gin alternatives to wine & craft beer. No compromise, just flavor.',
    price: '€28', badge: 'Stock Up',
    accent: '#7a9a6e', bg: '#f0f4ee',
    img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1200&q=90&auto=format&fit=crop',
    imgPos: 'center',
  },
  {
    id: 'craft-beer', num: '04', name: 'Independent Brews', subtitle: 'Craft Beer',
    origin: 'Small Batch · Handcrafted · Bold',
    note: 'Beyond mainstream. Curated craft beers from independent breweries across Europe — each bottle tells the story of its maker.',
    price: '€6', badge: 'New Arrivals',
    accent: '#8b6914', bg: '#f5f0e6',
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=90&auto=format&fit=crop',
    imgPos: 'center',
  },
  {
    id: 'coffee', num: '05', name: 'Rare Roasts', subtitle: 'Coffee & Tea',
    origin: 'Single Origin · Artisan Roasted',
    note: 'For the cup that deserves it. Specialty coffees and rare teas sourced from independent producers who refuse to compromise.',
    price: '€18', badge: 'Bestseller',
    accent: '#5c3d1e', bg: '#f5ede6',
    img: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=1200&q=90&auto=format&fit=crop',
    imgPos: 'center 40%',
  },
  {
    id: 'spices', num: '06', name: 'Pantry Essentials', subtitle: 'Spices & Snacks',
    origin: 'Rare Finds · Curated · Honest',
    note: 'The honest kitchen. From rare spice blends to artisan snacks — ingredients and treats that make every meal an occasion.',
    price: '€12', badge: 'Staff Pick',
    accent: '#9e4a2a', bg: '#f7eeea',
    img: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=1200&q=90&auto=format&fit=crop',
    imgPos: 'center',
  },
]

export default function Products() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const slides = trackRef.current?.children
    if (!slides || slides.length === 0) return

    gsap.set(slides[0], { opacity: 1 })
    gsap.set(Array.from(slides).slice(1), { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${(PRODUCTS.length - 1) * 100}%`,
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    })

    Array.from(slides).forEach((slide, i) => {
      if (i < slides.length - 1) {
        tl.to(slide, { opacity: 0, duration: 0.5 }, i)
        tl.to(slides[i + 1], { opacity: 1, duration: 0.5 }, i)
        tl.add(() => setActive(i + 1), i + 0.5)
      }
    })

    return () => tl.scrollTrigger?.kill()
  }, [])

  const p = PRODUCTS[active]

  return (
    <section ref={sectionRef} id="collection">
      <div style={{
        height: '100vh', display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: p?.bg || '#f5f2ec',
        transition: 'background 0.6s ease',
      }}>

        {/* ── Left: product info ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px 64px', position: 'relative',
        }}>
          <span className="section-label" style={{
            marginBottom: '2rem',
            color: p?.isDark ? 'rgba(240,238,234,0.4)' : undefined,
          }}>
            The Selection
          </span>

          <div ref={trackRef} style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {PRODUCTS.map((product, idx) => (
              <div key={product.id} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: idx === 0 ? 1 : 0 }}>

                {product.isBundle ? (
                  /* ── Bundle campaign layout ── */
                  <>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                      <span style={{
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.35em',
                        textTransform: 'uppercase', color: product.bg,
                        background: product.accent, padding: '5px 12px',
                      }}>{product.badge}</span>
                      <span style={{
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                        color: 'rgba(240,238,234,0.3)',
                      }}>Exclusive · 3 Bottles</span>
                    </div>

                    <p style={{
                      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.35em',
                      textTransform: 'uppercase', color: product.accent,
                      marginBottom: '0.75rem',
                    }}>{product.subtitle}</p>

                    <h2 style={{
                      fontFamily: '"Born Ready Slanted", cursive',
                      fontWeight: 400, fontStyle: 'normal',
                      fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
                      color: '#f0eeea', lineHeight: 1.05,
                      marginBottom: '1rem',
                    }}>{product.name}</h2>

                    <span className="gold-rule" style={{ marginBottom: '1.25rem', background: product.accent }} />

                    <p style={{
                      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      fontSize: '0.85rem', fontWeight: 300,
                      color: 'rgba(240,238,234,0.45)', lineHeight: 1.85,
                      maxWidth: 380, marginBottom: '1.75rem',
                    }}>{product.note}</p>

                    {/* Bundle items */}
                    <div style={{ marginBottom: '2rem' }}>
                      {product.bundleItems.map((item, i) => (
                        <div key={i} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '10px 0',
                          borderBottom: i < product.bundleItems.length - 1 ? '1px solid rgba(240,238,234,0.07)' : 'none',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ color: product.accent, fontSize: 8, flexShrink: 0 }}>✦</span>
                            <div>
                              <p style={{
                                fontFamily: '"Cormorant Garamond", Georgia, serif',
                                fontSize: '1.05rem', fontWeight: 500, color: '#f0eeea',
                                margin: 0, lineHeight: 1.2,
                              }}>{item.name}</p>
                              <p style={{
                                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                                fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                                color: 'rgba(240,238,234,0.3)', margin: '2px 0 0',
                              }}>{item.style}</p>
                            </div>
                          </div>
                          <span style={{
                            fontFamily: '"Cormorant Garamond", Georgia, serif',
                            fontSize: '1rem', fontWeight: 300,
                            color: 'rgba(240,238,234,0.25)',
                            textDecoration: 'line-through',
                          }}>{item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{
                          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                          fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                          color: 'rgba(240,238,234,0.3)',
                          textDecoration: 'line-through', marginBottom: 2,
                        }}>{product.originalPrice}</span>
                        <span style={{
                          fontFamily: '"Cormorant Garamond", Georgia, serif',
                          fontSize: '2.2rem', fontWeight: 300, color: product.accent, lineHeight: 1,
                        }}>{product.price}</span>
                      </div>
                      <a href="#" className="btn-primary" style={{ padding: '13px 32px', fontSize: 10, background: product.accent }}>
                        Shop Bundle
                      </a>
                      <a href="#" style={{
                        padding: '12px 24px', fontSize: 10,
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        letterSpacing: '0.3em', textTransform: 'uppercase',
                        color: 'rgba(240,238,234,0.5)',
                        border: '1px solid rgba(240,238,234,0.2)',
                        textDecoration: 'none',
                      }}>
                        Details
                      </a>
                    </div>
                  </>
                ) : (
                  /* ── Regular product layout ── */
                  <>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                      <span style={{
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.35em',
                        textTransform: 'uppercase', color: '#f0eeea',
                        background: product.accent, padding: '5px 12px',
                      }}>{product.badge}</span>
                      <span style={{
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                        color: 'rgba(26,22,20,0.35)',
                      }}>{product.num} / 06</span>
                    </div>

                    <p style={{
                      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.35em',
                      textTransform: 'uppercase', color: product.accent,
                      marginBottom: '0.75rem',
                    }}>{product.subtitle}</p>

                    <h2 style={{
                      fontFamily: '"Born Ready Slanted", cursive',
                      fontWeight: 400, fontStyle: 'normal',
                      fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
                      color: '#1a1614', lineHeight: 1.05,
                      marginBottom: '1rem',
                    }}>{product.name}</h2>

                    <p style={{
                      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.35em',
                      textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)',
                      marginBottom: '1.25rem',
                    }}>{product.origin}</p>

                    <span className="gold-rule" style={{ marginBottom: '1.25rem', background: product.accent }} />

                    <p style={{
                      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      fontSize: '0.9rem', fontWeight: 300,
                      color: 'rgba(26,22,20,0.55)', lineHeight: 1.85,
                      maxWidth: 380, marginBottom: '2.5rem',
                    }}>{product.note}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <span style={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontSize: '2rem', fontWeight: 300, color: '#1a1614',
                      }}>{product.price}</span>
                      <a href="#" className="btn-primary" style={{ padding: '13px 32px', fontSize: 10, background: product.accent }}>
                        Add to Cart
                      </a>
                      <a href="#" className="btn-ghost" style={{ padding: '13px 24px', fontSize: 10 }}>
                        Details
                      </a>
                    </div>
                  </>
                )}

              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: '3rem' }}>
            {PRODUCTS.map((_, i) => (
              <div key={i} style={{
                width: i === active ? 24 : 6, height: 1,
                background: i === active
                  ? p?.accent || '#c4933f'
                  : p?.isDark ? 'rgba(240,238,234,0.2)' : 'rgba(26,22,20,0.2)',
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>
        </div>

        {/* ── Right: editorial photo ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {PRODUCTS.map((product, i) => (
            <img key={product.id}
              src={product.img}
              alt={product.name}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: product.imgPos,
                opacity: i === active ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
