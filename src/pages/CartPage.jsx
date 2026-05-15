import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useCart } from '../context/CartContext'
import { useIsMobile } from '../hooks/useIsMobile'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'

const label = {
  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
  fontSize: 8, letterSpacing: '0.32em', textTransform: 'uppercase',
  color: 'rgba(26,22,20,0.45)', display: 'block', marginBottom: 6,
}

const inputStyle = {
  width: '100%', height: 44,
  border: '1px solid rgba(26,22,20,0.14)',
  background: '#fafaf8',
  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
  fontSize: 12, color: '#1a1614',
  padding: '0 14px', outline: 'none',
  transition: 'border-color 0.2s',
}

function Field({ label: lbl, id, type = 'text', placeholder, value, onChange, optional }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={label}>
        {lbl}{optional && <span style={{ color: 'rgba(26,22,20,0.25)', marginLeft: 6 }}>(optional)</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder}
        value={value} onChange={onChange}
        style={{ ...inputStyle, borderColor: focused ? '#1a1614' : 'rgba(26,22,20,0.14)' }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <p style={{
      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
      fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase',
      color: '#1a1614', fontWeight: 700,
      paddingBottom: 16, marginBottom: 20,
      borderBottom: '1px solid rgba(26,22,20,0.09)',
    }}>{children}</p>
  )
}

export default function CartPage() {
  const { items, removeItem, updateQty, total, count, setShippingForm } = useCart()
  const isMobile = useIsMobile()
  const shipping = total >= 75 ? 0 : 9.90
  const grandTotal = total + shipping
  const navigate = useNavigate()

  const [form, setForm] = useState({
    vorname: '', nachname: '', email: '', telefon: '',
    strasse: '', plz: '', ort: '', land: 'Deutschland',
  })
  const [dsgvo, setDsgvo] = useState(false)
  const [errors, setErrors] = useState({})

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const REQUIRED = ['vorname', 'nachname', 'email', 'strasse', 'plz', 'ort']

  function handleCheckout() {
    const newErrors = {}
    REQUIRED.forEach(k => { if (!form[k].trim()) newErrors[k] = true })
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setErrors({})
    setShippingForm({ ...form })
    navigate('/checkout')
  }

  const LAENDER = ['Deutschland', 'Österreich', 'Schweiz', 'Italien', 'Frankreich', 'Niederlande', 'Belgien', 'Spanien', 'Portugal']

  return (
    <>
      <Cursor />
      <Nav top={0} showToggle={false} backTo="/bestseller" backLabel="Continue Shopping" />

      <div style={{ background: '#fff', minHeight: '100vh', paddingTop: 64 }}>

        {/* Breadcrumb */}
        <div style={{
          maxWidth: 1380, margin: '0 auto',
          padding: '18px clamp(1.5rem, 5vw, 4rem)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {[{ label: 'Home', to: '/' }, { label: 'Bestsellers', to: '/bestseller' }, { label: 'Cart' }].map((c, i, arr) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {c.to ? (
                <Link to={c.to} style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(26,22,20,0.4)', textDecoration: 'none', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1a1614'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,22,20,0.4)'}
                >{c.label}</Link>
              ) : (
                <span style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a1614',
                }}>{c.label}</span>
              )}
              {i < arr.length - 1 && <span style={{ color: 'rgba(26,22,20,0.2)', fontSize: 10 }}>/</span>}
            </span>
          ))}
        </div>

        <div style={{
          maxWidth: 1380, margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)',
        }}>
          {/* Page title */}
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16,
            marginBottom: 40, paddingBottom: 24,
            borderBottom: '1px solid rgba(26,22,20,0.09)',
          }}>
            <h1 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#1a1614', lineHeight: 1,
            }}>Shopping Cart</h1>
            {count > 0 && (
              <span style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(26,22,20,0.3)',
              }}>{count} {count === 1 ? 'item' : 'items'}</span>
            )}
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', padding: '6rem 2rem' }}
            >
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                color: 'rgba(26,22,20,0.2)', marginBottom: 24,
              }}>Your cart is empty.</p>
              <Link to="/bestseller" style={{
                display: 'inline-block',
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase',
                color: '#f0eeea', background: '#1a1614',
                padding: '14px 36px', textDecoration: 'none',
              }}>Shop Bestsellers</Link>
            </motion.div>
          ) : (
            <div className="cart-layout" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
              gap: isMobile ? '2rem' : 'clamp(2rem, 5vw, 5rem)',
              alignItems: 'start',
            }}>

              {/* ── LEFT COLUMN ── */}
              <div>

                {/* Cart items */}
                <div style={{ marginBottom: 56 }}>
                  {!isMobile && (
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      paddingBottom: 12, marginBottom: 4,
                      borderBottom: '1px solid rgba(26,22,20,0.07)',
                    }}>
                      {['Product', 'Qty', 'Total'].map(h => (
                        <span key={h} style={{
                          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                          fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase',
                          color: 'rgba(26,22,20,0.3)',
                        }}>{h}</span>
                      ))}
                    </div>
                  )}

                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div
                        key={item.id} layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                          gap: isMobile ? 12 : 0,
                          alignItems: isMobile ? 'flex-start' : 'center',
                          padding: '24px 0',
                          borderBottom: '1px solid rgba(26,22,20,0.07)',
                        }}
                      >
                        {/* Image + info row */}
                        <div style={{ display: 'flex', gap: 16, flex: 1, alignItems: 'flex-start', width: '100%' }}>
                          <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                            <div style={{ width: 80, height: 80, background: '#f5f4f2', overflow: 'hidden' }}>
                              <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </div>
                          </Link>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: item.accent, marginBottom: 5 }}>{item.brand}</p>
                            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                              <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400, fontSize: '1.1rem', color: '#1a1614', marginBottom: 4 }}>{item.name}</p>
                            </Link>
                            <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.3)', marginBottom: 12 }}>{item.size}</p>
                            <button onClick={() => removeItem(item.id)} style={{
                              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                              fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                              fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase',
                              color: 'rgba(26,22,20,0.25)', borderBottom: '1px solid transparent',
                              transition: 'color 0.2s, border-color 0.2s',
                            }}>Remove</button>
                          </div>
                          {/* Price — desktop only here, mobile shows below */}
                          {!isMobile && (
                            <div style={{ textAlign: 'right', minWidth: 80, marginLeft: 24 }}>
                              <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400, fontSize: '1.2rem', color: '#1a1614' }}>€{(item.price * item.qty).toFixed(2)}</p>
                              {item.qty > 1 && (
                                <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.15em', color: 'rgba(26,22,20,0.3)', marginTop: 3 }}>€{item.price.toFixed(2)} each</p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Qty + price row (mobile: below image row; desktop: inline) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: isMobile ? 96 : 16 }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(26,22,20,0.12)' }}>
                            <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'rgba(26,22,20,0.4)' }}>−</button>
                            <span style={{ width: 32, textAlign: 'center', fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 12, color: '#1a1614' }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'rgba(26,22,20,0.4)' }}>+</button>
                          </div>
                          {isMobile && (
                            <div>
                              <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400, fontSize: '1.2rem', color: '#1a1614' }}>€{(item.price * item.qty).toFixed(2)}</p>
                              {item.qty > 1 && (
                                <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.15em', color: 'rgba(26,22,20,0.3)', marginTop: 3 }}>€{item.price.toFixed(2)} each</p>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* ── KUNDENDATEN ── */}
                <div style={{ marginBottom: 48 }}>
                  <SectionTitle>Kundendaten</SectionTitle>
                  <div className="cart-form-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px 20px' }}>
                    <Field label="Vorname" id="vorname" placeholder="Maria" value={form.vorname} onChange={set('vorname')} />
                    <Field label="Nachname" id="nachname" placeholder="Müller" value={form.nachname} onChange={set('nachname')} />
                    <Field label="E-Mail-Adresse" id="email" type="email" placeholder="maria@beispiel.de" value={form.email} onChange={set('email')} />
                    <Field label="Telefon" id="telefon" type="tel" placeholder="+49 151 000 0000" value={form.telefon} onChange={set('telefon')} optional />
                  </div>
                </div>

                {/* ── LIEFERADRESSE ── */}
                <div style={{ marginBottom: 48 }}>
                  <SectionTitle>Lieferadresse</SectionTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px 20px' }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <Field label="Straße und Hausnummer" id="strasse" placeholder="Musterstraße 12" value={form.strasse} onChange={set('strasse')} />
                    </div>
                    <Field label="Postleitzahl" id="plz" placeholder="10115" value={form.plz} onChange={set('plz')} />
                    <Field label="Ort / Stadt" id="ort" placeholder="Berlin" value={form.ort} onChange={set('ort')} />
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label htmlFor="land" style={label}>Land</label>
                      <select
                        id="land"
                        value={form.land}
                        onChange={set('land')}
                        style={{ ...inputStyle, cursor: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231a1614' stroke-opacity='0.4' stroke-width='1.2'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                      >
                        {LAENDER.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── DSGVO ── */}
                <div style={{
                  background: '#fafaf8',
                  border: '1px solid rgba(26,22,20,0.09)',
                  padding: '20px 20px',
                }}>
                  <p style={{
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase',
                    color: '#1a1614', fontWeight: 700, marginBottom: 14,
                  }}>Datenschutz (DSGVO)</p>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'none' }}>
                    <input
                      type="checkbox"
                      checked={dsgvo}
                      onChange={e => setDsgvo(e.target.checked)}
                      style={{ marginTop: 2, flexShrink: 0, width: 14, height: 14, cursor: 'none', accentColor: '#1a1614' }}
                    />
                    <span style={{
                      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      fontSize: 10, lineHeight: 1.75,
                      color: 'rgba(26,22,20,0.55)',
                    }}>
                      Ich habe die{' '}
                      <a href="#" style={{ color: '#1a1614', textDecoration: 'underline' }}>Datenschutzerklärung</a>
                      {' '}gelesen und stimme der Verarbeitung meiner personenbezogenen Daten (Name, Adresse, E-Mail) gemäß{' '}
                      <strong style={{ fontWeight: 700, color: 'rgba(26,22,20,0.7)' }}>Art. 6 Abs. 1 lit. b DSGVO</strong>
                      {' '}zur Durchführung des Bestellvorgangs zu. Die Daten werden ausschließlich zur Auftragsabwicklung verwendet und nicht an Dritte weitergegeben.
                    </span>
                  </label>

                  <p style={{
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 9, lineHeight: 1.7,
                    color: 'rgba(26,22,20,0.35)',
                    marginTop: 14,
                    paddingTop: 14,
                    borderTop: '1px solid rgba(26,22,20,0.07)',
                  }}>
                    Verantwortlicher gem. Art. 4 Nr. 7 DSGVO: Honest & Rare S.r.l., Firenze, Italia.
                    Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Datenübertragbarkeit (Art. 15–20 DSGVO).
                    Beschwerden richten Sie bitte an Ihren zuständigen{' '}
                    <a href="https://www.bfdi.bund.de" target="_blank" rel="noopener noreferrer" style={{ color: '#1a1614' }}>Landesdatenschutzbeauftragten</a>.
                  </p>
                </div>

              </div>

              {/* ── ORDER SUMMARY ── */}
              <div className="cart-summary" style={{ position: 'sticky', top: 80 }}>
                <div style={{ border: '1px solid rgba(26,22,20,0.09)', padding: '28px 24px' }}>
                  <p style={{
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
                    color: '#1a1614', marginBottom: 24,
                    paddingBottom: 16, borderBottom: '1px solid rgba(26,22,20,0.09)',
                  }}>Order Summary</p>

                  <div style={{ marginBottom: 20 }}>
                    {items.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                        <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(26,22,20,0.6)', maxWidth: '65%' }}>{item.name}{item.qty > 1 ? ` × ${item.qty}` : ''}</span>
                        <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400, fontSize: '0.95rem', color: '#1a1614' }}>€{(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(26,22,20,0.07)', marginBottom: 10 }}>
                    <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.4)' }}>Subtotal</span>
                    <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400, fontSize: '1rem', color: '#1a1614' }}>€{total.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.4)' }}>Shipping</span>
                    <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400, fontSize: '1rem', color: shipping === 0 ? '#7a9a6e' : '#1a1614' }}>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
                  </div>

                  {shipping > 0 && (
                    <div style={{ background: '#fafaf9', padding: '10px 12px', marginBottom: 20, borderLeft: '2px solid rgba(26,22,20,0.12)' }}>
                      <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.4)', lineHeight: 1.6 }}>Add €{(75 - total).toFixed(2)} more for free shipping</p>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 16, borderTop: '2px solid #1a1614', marginBottom: 24 }}>
                    <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1a1614', fontWeight: 700 }}>Total</span>
                    <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, fontSize: '1.7rem', color: '#1a1614' }}>€{grandTotal.toFixed(2)}</span>
                  </div>

                  <button
                    disabled={!dsgvo || items.length === 0}
                    onClick={handleCheckout}
                    style={{
                      width: '100%', height: 54,
                      background: dsgvo && items.length > 0 ? '#1a1614' : 'rgba(26,22,20,0.15)',
                      color: dsgvo && items.length > 0 ? '#f0eeea' : 'rgba(26,22,20,0.3)',
                      border: 'none', cursor: dsgvo && items.length > 0 ? 'none' : 'not-allowed',
                      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase',
                      fontWeight: 700, marginBottom: 10,
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => { if (dsgvo) e.currentTarget.style.opacity = '0.85' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                  >Proceed to Checkout</button>
                  {Object.keys(errors).length > 0 && (
                    <p style={{
                      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      fontSize: 8, letterSpacing: '0.15em',
                      color: '#c0392b', textAlign: 'center', marginBottom: 8,
                    }}>Lütfen tüm zorunlu alanları doldurun</p>
                  )}

                  {!dsgvo && (
                    <p style={{
                      fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                      fontSize: 8, letterSpacing: '0.15em',
                      color: 'rgba(26,22,20,0.35)',
                      textAlign: 'center', marginBottom: 10,
                    }}>Bitte stimmen Sie der Datenschutzerklärung zu</p>
                  )}

                  <Link to="/bestseller" style={{
                    display: 'block', width: '100%', height: 50,
                    border: '1px solid rgba(26,22,20,0.15)',
                    textAlign: 'center', lineHeight: '50px',
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase',
                    color: '#1a1614', textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1614'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26,22,20,0.15)'}
                  >Continue Shopping</Link>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(26,22,20,0.07)' }}>
                    {[['—', 'Secure'], ['↩', 'Returns'], ['—', 'Fast Delivery']].map(([icon, lbl]) => (
                      <div key={lbl} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div>
                        <span style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 7.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.3)' }}>{lbl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
