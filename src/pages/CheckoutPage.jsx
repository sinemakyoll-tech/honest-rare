import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useCart } from '../context/CartContext'
import Nav from '../components/Nav'
import Cursor from '../components/Cursor'

const inputStyle = {
  width: '100%', height: 48,
  border: '1px solid rgba(26,22,20,0.14)',
  background: '#fafaf8',
  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
  fontSize: 13, color: '#1a1614',
  padding: '0 14px', outline: 'none',
  transition: 'border-color 0.2s',
  borderRadius: 0,
}

function Field({ label, id, type = 'text', placeholder, value, onChange, maxLength, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={{
        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
        fontSize: 8, letterSpacing: '0.32em', textTransform: 'uppercase',
        color: error ? '#c0392b' : 'rgba(26,22,20,0.45)', display: 'block', marginBottom: 6,
      }}>
        {label}{error && <span style={{ marginLeft: 6 }}>— Zorunlu alan</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder}
        value={value} onChange={onChange}
        maxLength={maxLength}
        style={{
          ...inputStyle,
          borderColor: error ? '#c0392b' : focused ? '#1a1614' : 'rgba(26,22,20,0.14)',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

function formatCard(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(val) {
  const d = val.replace(/\D/g, '').slice(0, 4)
  return d.length >= 3 ? d.slice(0, 2) + ' / ' + d.slice(2) : d
}

export default function CheckoutPage() {
  const { items, total, clearCart, shippingForm } = useCart()
  const shipping = total >= 75 ? 0 : 9.90
  const grandTotal = total + shipping
  const navigate = useNavigate()

  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvc: '' })
  const [method, setMethod] = useState('card')
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  function handlePlace() {
    if (method === 'card') {
      const e = {}
      if (!card.name.trim()) e.name = true
      if (card.number.replace(/\s/g, '').length < 16) e.number = true
      if (card.expiry.replace(/\s\/\s/g, '').length < 4) e.expiry = true
      if (card.cvc.length < 3) e.cvc = true
      if (Object.keys(e).length) { setErrors(e); return }
    }
    setErrors({})
    setPlacing(true)
    setTimeout(() => {
      clearCart()
      navigate('/order-success')
    }, 1800)
  }

  return (
    <>
      <Cursor />
      <Nav top={0} showToggle={false} backTo="/cart" backLabel="Back to Cart" />

      <div style={{ minHeight: '100vh', background: '#f0eeea', paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            {['Cart', 'Checkout', 'Confirmation'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: i === 1 ? '#1a1614' : i < 1 ? '#c4933f' : 'rgba(26,22,20,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {i < 1
                      ? <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#f0eeea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                      : <span style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 9, fontWeight: 700, color: i === 1 ? '#f0eeea' : 'rgba(26,22,20,0.3)' }}>{i + 1}</span>
                    }
                  </div>
                  <span style={{
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                    fontWeight: i === 1 ? 700 : 400,
                    color: i === 1 ? '#1a1614' : i < 1 ? '#c4933f' : 'rgba(26,22,20,0.3)',
                  }}>{s}</span>
                </div>
                {i < 2 && <div style={{ width: 32, height: 1, background: 'rgba(26,22,20,0.12)' }} />}
              </div>
            ))}
          </div>

          <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' }}>

            {/* ── Left: Payment ── */}
            <div>
              <p style={{
                fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase',
                fontWeight: 700, color: '#1a1614',
                paddingBottom: 16, marginBottom: 24,
                borderBottom: '1px solid rgba(26,22,20,0.09)',
              }}>Payment Method</p>

              {/* Method selector */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
                {[
                  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                  { id: 'paypal', label: 'PayPal', icon: '🅿' },
                  { id: 'klarna', label: 'Klarna', icon: '🛍' },
                ].map(m => (
                  <button key={m.id} onClick={() => setMethod(m.id)} style={{
                    flex: 1, padding: '14px 12px',
                    border: method === m.id ? '1.5px solid #1a1614' : '1px solid rgba(26,22,20,0.14)',
                    background: method === m.id ? '#1a1614' : '#fff',
                    color: method === m.id ? '#f0eeea' : '#1a1614',
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase',
                    cursor: 'none', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  }}>
                    <span style={{ fontSize: 20 }}>{m.icon}</span>
                    {m.label}
                  </button>
                ))}
              </div>

              {method === 'card' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                >
                  {/* Card preview */}
                  <div style={{
                    height: 160, borderRadius: 12,
                    background: 'linear-gradient(135deg, #1a1614 0%, #3a3330 60%, #c4933f 100%)',
                    padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    marginBottom: 8, position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(196,147,63,0.12)' }} />
                    <div style={{ position: 'absolute', bottom: -50, left: -20, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: '"Born Ready Slanted", cursive', color: '#f0eeea', fontSize: '1.1rem', opacity: 0.9 }}>Honest & Rare</span>
                      <div style={{ width: 40, height: 26, borderRadius: 4, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', gap: -6 }}>
                          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#eb5757', opacity: 0.9 }} />
                          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#f4a621', opacity: 0.9, marginLeft: -8 }} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '0.18em', color: '#f0eeea', marginBottom: 10 }}>
                        {card.number || '•••• •••• •••• ••••'}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <p style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 7, letterSpacing: '0.3em', color: 'rgba(240,238,234,0.5)', marginBottom: 2 }}>CARD HOLDER</p>
                          <p style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 11, letterSpacing: '0.12em', color: '#f0eeea' }}>{card.name || 'YOUR NAME'}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 7, letterSpacing: '0.3em', color: 'rgba(240,238,234,0.5)', marginBottom: 2 }}>EXPIRES</p>
                          <p style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 11, color: '#f0eeea' }}>{card.expiry || 'MM / YY'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Field label="Cardholder Name" id="cname" placeholder="John Doe"
                    value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} error={errors.name} />

                  <Field label="Card Number" id="cnumber" placeholder="1234 5678 9012 3456"
                    value={card.number}
                    onChange={e => setCard(c => ({ ...c, number: formatCard(e.target.value) }))}
                    maxLength={19} error={errors.number} />

                  <div className="cart-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="Expiry Date" id="cexpiry" placeholder="MM / YY"
                      value={card.expiry}
                      onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                      maxLength={7} error={errors.expiry} />
                    <Field label="CVC / CVV" id="ccvc" placeholder="•••"
                      value={card.cvc}
                      onChange={e => setCard(c => ({ ...c, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      maxLength={4} error={errors.cvc} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: 'rgba(122,154,110,0.08)', border: '1px solid rgba(122,154,110,0.2)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="#7a9a6e" strokeWidth="1.2"/>
                      <path d="M5 7V5a3 3 0 016 0v2" stroke="#7a9a6e" strokeWidth="1.2"/>
                    </svg>
                    <span style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 8, letterSpacing: '0.2em', color: '#7a9a6e' }}>256-bit SSL encrypted · Your data is safe</span>
                  </div>
                </motion.div>
              )}

              {method !== 'card' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: 32, background: '#fff', border: '1px solid rgba(26,22,20,0.09)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.4rem', fontWeight: 300, color: '#1a1614', marginBottom: 8 }}>
                    {method === 'paypal' ? 'PayPal' : 'Klarna'}
                  </p>
                  <p style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(26,22,20,0.4)' }}>
                    {method === 'paypal' ? 'You will be redirected to PayPal to complete your payment.' : 'Pay in 3 instalments · 0% interest'}
                  </p>
                </motion.div>
              )}
            </div>

            {/* ── Right: Order summary ── */}
            <div className="cart-summary" style={{ position: 'sticky', top: 110 }}>
              <div style={{ background: '#fff', border: '1px solid rgba(26,22,20,0.09)', padding: 28 }}>
                <p style={{
                  fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                  fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase',
                  fontWeight: 700, color: '#1a1614',
                  paddingBottom: 16, marginBottom: 20,
                  borderBottom: '1px solid rgba(26,22,20,0.09)',
                }}>Order Summary</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                  {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 48, height: 48, background: '#f5f4f2', flexShrink: 0, overflow: 'hidden' }}>
                        {item.img && <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '0.95rem', color: '#1a1614', lineHeight: 1.2, marginBottom: 2 }}>{item.name}</p>
                        <p style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 8, letterSpacing: '0.2em', color: 'rgba(26,22,20,0.35)' }}>×{item.qty}</p>
                      </div>
                      <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1rem', color: '#1a1614', flexShrink: 0 }}>€{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(26,22,20,0.09)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(26,22,20,0.4)' }}>Subtotal</span>
                    <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1rem', color: '#1a1614' }}>€{total.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(26,22,20,0.4)' }}>Shipping</span>
                    <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1rem', color: shipping === 0 ? '#7a9a6e' : '#1a1614' }}>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(26,22,20,0.09)' }}>
                    <span style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, color: '#1a1614' }}>Total</span>
                    <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, fontSize: '1.5rem', color: '#1a1614' }}>€{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {shippingForm && (
                  <div style={{ marginTop: 20, padding: '14px 16px', background: '#f8f7f4', borderTop: '1px solid rgba(26,22,20,0.06)' }}>
                    <p style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)', marginBottom: 6 }}>Ships to</p>
                    <p style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 11, color: '#1a1614' }}>{shippingForm.vorname} {shippingForm.nachname}</p>
                    <p style={{ fontFamily: '"Futura LT Pro", system-ui', fontSize: 10, color: 'rgba(26,22,20,0.5)', marginTop: 2 }}>{shippingForm.strasse}, {shippingForm.plz} {shippingForm.ort}</p>
                  </div>
                )}

                <button
                  onClick={handlePlace}
                  disabled={placing}
                  style={{
                    width: '100%', height: 54, marginTop: 20,
                    background: placing ? 'rgba(26,22,20,0.15)' : '#1a1614',
                    color: placing ? 'rgba(26,22,20,0.35)' : '#f0eeea',
                    border: 'none', cursor: placing ? 'default' : 'none',
                    fontFamily: '"Futura LT Pro", system-ui, sans-serif',
                    fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase',
                    fontWeight: 700, transition: 'all 0.25s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  }}
                >
                  {placing ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: 'spin 1s linear infinite' }}>
                        <circle cx="8" cy="8" r="6" stroke="rgba(26,22,20,0.25)" strokeWidth="2" fill="none"/>
                        <path d="M8 2a6 6 0 016 6" stroke="#1a1614" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      </svg>
                      Processing…
                    </>
                  ) : 'Place Order'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </>
  )
}
