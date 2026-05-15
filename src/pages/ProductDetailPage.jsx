import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'
import { useIsMobile } from '../hooks/useIsMobile'

/* ── Simulated gallery views from one image ── */
function getGallery(img) {
  return [
    { src: img, pos: 'center' },
    { src: img, pos: 'top' },
    { src: img, pos: 'bottom' },
    { src: img, pos: 'left' },
  ]
}

/* ── Accordion row ── */
function AccordionRow({ icon, label, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid rgba(26,22,20,0.09)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0', background: 'none', border: 'none', cursor: 'none',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 16, opacity: 0.5 }}>{icon}</span>
          <span style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#1a1614',
          }}>{label}</span>
        </span>
        <span style={{
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 16, color: 'rgba(26,22,20,0.4)',
          transition: 'transform 0.25s',
          display: 'inline-block',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 18 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id }              = useParams()
  const navigate            = useNavigate()
  const { addItem }         = useCart()
  const isMobile            = useIsMobile()
  const product             = PRODUCTS.find(p => p.id === Number(id))
  const [qty, setQty]       = useState(1)
  const [added, setAdded]   = useState(false)
  const [wished, setWished] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [sticky, setSticky] = useState(false)
  const purchaseRef         = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setSticky(!e.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )
    if (purchaseRef.current) obs.observe(purchaseRef.current)
    return () => obs.disconnect()
  }, [])

  if (!product) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Link to="/bestseller" style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', letterSpacing: '0.3em', fontSize: 11 }}>← BACK</Link>
    </div>
  )

  const gallery = getGallery(product.imgDetail)
  const others  = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)

  function handleAdd() {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => navigate('/cart'), 800)
  }

  function handleBuy() {
    addItem(product, qty)
    navigate('/cart')
  }

  const infoText = (s) => ({
    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
    fontSize: '0.88rem', fontWeight: 300,
    color: 'rgba(26,22,20,0.6)', lineHeight: 1.7,
    ...s,
  })

  return (
    <>
      <Cursor />
      <Nav top={0} showToggle={false} backTo="/bestseller" backLabel="Bestsellers" />

      {/* ── STICKY BAR ── */}
      <AnimatePresence>
        {sticky && (
          <motion.div
            initial={{ y: -64 }} animate={{ y: 0 }} exit={{ y: -64 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
              background: '#fff',
              borderBottom: '1px solid rgba(26,22,20,0.09)',
              display: 'flex', alignItems: 'center',
              padding: '0 clamp(1.5rem, 5vw, 4rem)',
              height: 64, gap: 20,
            }}
          >
            <img src={product.img} alt="" style={{ width: 40, height: 40, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.4)',
              }}>{product.brand}</p>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 400, fontSize: '1.1rem', color: '#1a1614',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{product.name}</p>
            </div>
            <p style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400, fontSize: '1.2rem', color: '#1a1614', flexShrink: 0,
            }}>€{product.price.toFixed(2)}</p>
            <button onClick={handleAdd} style={{
              height: 40, padding: '0 28px',
              background: added ? '#7a9a6e' : '#1a1614',
              color: '#f0eeea', border: 'none', cursor: 'none',
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase',
              transition: 'background 0.3s', flexShrink: 0,
            }}>{added ? '✓' : 'Add to Cart'}</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ background: '#fff', paddingTop: 64 }}>

        {/* ── BREADCRUMB ── */}
        <div style={{
          maxWidth: 1380, margin: '0 auto',
          padding: '18px clamp(1.5rem, 5vw, 4rem)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {[
            { label: 'Home', to: '/' },
            { label: product.category, to: '/bestseller' },
            { label: product.brand, to: '/bestseller' },
            { label: product.name },
          ].map((crumb, i, arr) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {crumb.to ? (
                <Link to={crumb.to} style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(26,22,20,0.4)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.4)'}
                >{crumb.label}</Link>
              ) : (
                <span style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#1a1614',
                }}>{crumb.label}</span>
              )}
              {i < arr.length - 1 && (
                <span style={{ color: 'rgba(26,22,20,0.2)', fontSize: 10 }}>/</span>
              )}
            </span>
          ))}
        </div>

        {/* ── MAIN PRODUCT LAYOUT ── */}
        <div style={{
          maxWidth: 1380, margin: '0 auto',
          padding: '0 clamp(1rem, 5vw, 4rem) clamp(3rem, 8vw, 6rem)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '72px 1fr 420px',
          gap: isMobile ? '16px' : '16px',
          alignItems: 'start',
        }}>

          {/* ── THUMBNAILS (desktop only) ── */}
          {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 0 }}>
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: 72, height: 72, padding: 0, background: '#f5f4f2',
                  border: `1px solid ${activeImg === i ? '#1a1614' : 'transparent'}`,
                  cursor: 'none', overflow: 'hidden', flexShrink: 0,
                  transition: 'border-color 0.2s',
                }}
              >
                <img src={g.src} alt="" style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: g.pos,
                  display: 'block',
                }} />
              </button>
            ))}
          </div>
          )}

          {/* ── MAIN IMAGE ── */}
          <div style={{ position: isMobile ? 'relative' : 'sticky', top: isMobile ? 'auto' : 80, background: '#f8f7f5', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={gallery[activeImg].src}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  objectPosition: gallery[activeImg].pos,
                  display: 'block',
                }}
              />
            </AnimatePresence>
          </div>

          {/* ── PURCHASE PANEL ── */}
          <div ref={purchaseRef} style={{ paddingTop: 8 }}>

            {/* Brand */}
            <p style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 10, letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(26,22,20,0.4)', marginBottom: 8,
            }}>{product.brand}</p>

            {/* Name */}
            <h1 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400, fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
              lineHeight: 1.15, color: '#1a1614',
              marginBottom: 20,
            }}>{product.name}</h1>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
              <span style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 600, fontSize: '1.9rem', color: '#1a1614',
              }}>€{product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.2rem', color: 'rgba(26,22,20,0.3)',
                  textDecoration: 'line-through',
                }}>€{product.oldPrice}</span>
              )}
              {product.discount && (
                <span style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 9, letterSpacing: '0.15em',
                  background: '#e8f0e8', color: '#3a6b3a',
                  padding: '3px 8px',
                }}>{Math.abs(product.discount)}% off</span>
              )}
            </div>

            <div style={{ height: 1, background: 'rgba(26,22,20,0.08)', marginBottom: 24 }} />

            {/* Style */}
            <div style={{ marginBottom: 20 }}>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.35)', marginBottom: 8,
              }}>Style</p>
              <span style={{
                display: 'inline-block',
                border: `1px solid ${product.accent}`,
                padding: '6px 14px',
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: product.accent,
              }}>{product.style}</span>
            </div>

            {/* Taste tags */}
            <div style={{ marginBottom: 24 }}>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.35)', marginBottom: 10,
              }}>Taste Notes</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {product.taste.map(t => (
                  <span key={t} style={{
                    border: '1px solid rgba(26,22,20,0.12)',
                    padding: '6px 14px',
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#1a1614',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div style={{ marginBottom: 16 }}>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.35)', marginBottom: 10,
              }}>Quantity</p>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1px solid rgba(26,22,20,0.15)',
              }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                  width: 44, height: 44, background: 'none', border: 'none',
                  cursor: 'none', fontSize: 18, color: 'rgba(26,22,20,0.5)',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.5)'}
                >−</button>
                <span style={{
                  width: 40, textAlign: 'center',
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 13, color: '#1a1614',
                }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{
                  width: 44, height: 44, background: 'none', border: 'none',
                  cursor: 'none', fontSize: 18, color: 'rgba(26,22,20,0.5)',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.5)'}
                >+</button>
              </div>
            </div>

            {/* Delivery */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 0', marginBottom: 20,
            }}>
              <span style={{ fontSize: 14, opacity: 0.4 }}>→</span>
              <span style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.5)',
              }}>Estimated delivery <strong style={{ color: '#1a1614' }}>3 – 5 business days</strong></span>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <motion.button
                onClick={handleAdd}
                whileTap={{ scale: 0.98 }}
                style={{
                  flex: 1, height: 54,
                  background: added ? '#7a9a6e' : '#1a1614',
                  color: '#f0eeea', border: 'none', cursor: 'none',
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
                  fontWeight: 700, transition: 'background 0.35s',
                }}
              >{added ? '✓ Added to Cart' : 'Add to Cart'}</motion.button>

              <button
                onClick={() => setWished(w => !w)}
                style={{
                  width: 54, height: 54, flexShrink: 0,
                  background: 'none',
                  border: '1px solid rgba(26,22,20,0.15)',
                  cursor: 'none', fontSize: 20,
                  color: wished ? '#c4933f' : 'rgba(26,22,20,0.3)',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1614'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26,22,20,0.15)'}
              >{wished ? '♥' : '♡'}</button>
            </div>

            <button onClick={handleBuy} style={{
              width: '100%', height: 54,
              background: 'transparent',
              border: '1px solid rgba(26,22,20,0.2)',
              color: '#1a1614', cursor: 'none',
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
              transition: 'border-color 0.2s',
              marginBottom: 28,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1614'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26,22,20,0.2)'}
            >Buy Now →</button>

            {/* Accordion */}
            <AccordionRow icon="—" label="Delivery & Returns">
              <p style={infoText()}>Free standard delivery on orders over €75. Returns accepted within 30 days in original condition. See full returns policy for details.</p>
            </AccordionRow>
            <AccordionRow icon="—" label="Origin & Craft">
              <p style={infoText()}>{product.origin}</p>
              <p style={{ ...infoText(), marginTop: 8 }}>{product.note}</p>
            </AccordionRow>
            <AccordionRow icon="✦" label="The Honest & Rare Promise">
              <p style={infoText()}>Every product we carry is independently sourced — no mainstream, no algorithms, no paid placements. Only what we'd put on our own table.</p>
            </AccordionRow>
            <div style={{ borderTop: '1px solid rgba(26,22,20,0.09)' }} />

          </div>
        </div>

        {/* ── PRODUCT DETAILS SECTION ── */}
        <div style={{
          borderTop: '1px solid rgba(26,22,20,0.08)',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          background: '#fafaf9',
        }}>
          <div style={{ maxWidth: 1380, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase',
              color: '#1a1614', textAlign: 'center',
              marginBottom: 40,
              paddingBottom: 20,
              borderBottom: '2px solid #1a1614',
              display: 'inline-block',
              width: '100%',
            }}>Product Details</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(3rem, 8vw, 8rem)',
              alignItems: 'start',
            }}>
              {/* Left: story + bullets */}
              <div>
                <p style={infoText({ marginBottom: 24, fontSize: '0.95rem' })}>{product.note}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    `Category: ${product.category}`,
                    product.abv && `Alcohol: ${product.abv}`,
                    `Volume / Weight: ${product.size}`,
                    `Taste: ${product.taste.join(', ')}`,
                    `Pairing: ${product.pairing}`,
                    `Origin: ${product.origin}`,
                    `${product.soldThisMonth.toLocaleString()} sold this month`,
                  ].filter(Boolean).map((item, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      marginBottom: 12,
                    }}>
                      <span style={{
                        width: 4, height: 4, borderRadius: '50%',
                        background: product.accent, flexShrink: 0, marginTop: 8,
                      }} />
                      <span style={infoText({ fontSize: '0.9rem' })}>{item}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(26,22,20,0.07)' }}>
                  <p style={{
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: 'rgba(26,22,20,0.28)', marginBottom: 6,
                  }}>Product Code</p>
                  <p style={{
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 9, letterSpacing: '0.15em',
                    color: 'rgba(26,22,20,0.35)',
                  }}>HR-{product.id.toString().padStart(4, '0')}-{product.category.toUpperCase().replace(/\s/g, '')}</p>
                </div>
              </div>

              {/* Right: image + taste bars */}
              <div>
                <div style={{
                  background: '#f0eeea', overflow: 'hidden', marginBottom: 32,
                }}>
                  <img src={product.img} alt={product.name} style={{
                    width: '100%', aspectRatio: '4/3',
                    objectFit: 'cover', display: 'block',
                  }} />
                </div>

                <p style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase',
                  color: product.accent, marginBottom: 20,
                }}>Taste Profile</p>
                {product.taste.map((t, i) => (
                  <div key={t} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: '#1a1614',
                      }}>{t}</span>
                      <span style={{
                        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                        fontSize: 8, color: 'rgba(26,22,20,0.3)',
                      }}>{85 - i * 15}%</span>
                    </div>
                    <div style={{ height: 2, background: 'rgba(26,22,20,0.07)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 - i * 15}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ height: '100%', background: product.accent }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── IMAGE GALLERY ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          background: 'rgba(26,22,20,0.06)',
          maxHeight: 900, overflow: 'hidden',
        }}>
          {gallery.map((g, i) => (
            <div
              key={i}
              onClick={() => setActiveImg(i)}
              style={{ overflow: 'hidden', cursor: 'none', aspectRatio: '4/3' }}
            >
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={g.src} alt=""
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: g.pos,
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── YOU MAY ALSO LIKE ── */}
        <div style={{
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          background: '#fff',
        }}>
          <div style={{ maxWidth: 1380, margin: '0 auto' }}>
            <p style={{
              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
              fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase',
              color: 'rgba(26,22,20,0.35)', marginBottom: 28,
            }}>You May Also Like</p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
            }}>
              {others.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ overflow: 'hidden', background: '#f5f4f2', marginBottom: 14 }}>
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      src={p.img} alt={p.name}
                      style={{
                        width: '100%', aspectRatio: '1/1',
                        objectFit: 'cover', display: 'block',
                      }}
                    />
                  </div>
                  <p style={{
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: p.accent, marginBottom: 4,
                  }}>{p.brand}</p>
                  <p style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 400, fontSize: '1.1rem', color: '#1a1614', marginBottom: 4,
                  }}>{p.name}</p>
                  <p style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1rem', color: 'rgba(26,22,20,0.5)',
                  }}>€{p.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}
