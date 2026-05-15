import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Cursor from '../components/Cursor'

const ORDER_NUM = () => '#HR-' + Math.random().toString(36).slice(2, 8).toUpperCase()

export default function OrderSuccessPage() {
  const orderRef = useRef(ORDER_NUM())

  return (
    <>
      <Cursor />
      <div style={{
        minHeight: '100vh', background: '#f0eeea',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', textAlign: 'center',
      }}>

        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            background: '#1a1614',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <motion.svg
            width="36" height="36" viewBox="0 0 36 36" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          >
            <motion.path
              d="M8 18l7 7 13-13"
              stroke="#c4933f"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.45, duration: 0.55, ease: 'easeOut' }}
            />
          </motion.svg>
        </motion.div>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="section-label"
          style={{ marginBottom: 16 }}
        >
          Order Confirmed
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{
            fontFamily: '"Born Ready Slanted", cursive',
            fontWeight: 400, fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: '#1a1614', lineHeight: 1.05, marginBottom: 16,
          }}
        >
          Thank You!
        </motion.h1>

        {/* Order number */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'rgba(26,22,20,0.4)', marginBottom: 32,
          }}
        >
          Order {orderRef.current}
        </motion.p>

        {/* Divider */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="gold-rule"
          style={{ margin: '0 auto 32px' }}
        />

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 12, fontWeight: 300, letterSpacing: '0.05em',
            color: 'rgba(26,22,20,0.55)', lineHeight: 1.8,
            maxWidth: 420, marginBottom: 12,
          }}
        >
          Your order has been received and is being prepared with care.
          You will receive a confirmation email shortly.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          style={{
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 11, fontWeight: 300, letterSpacing: '0.05em',
            color: 'rgba(26,22,20,0.35)', marginBottom: 48,
          }}
        >
          Estimated delivery: 2–4 business days
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link to="/" className="btn-primary" style={{ padding: '15px 40px', fontSize: 10 }}>
            Continue Shopping
          </Link>
          <Link to="/bestseller" className="btn-ghost" style={{ padding: '15px 40px', fontSize: 10 }}>
            View Bestsellers
          </Link>
        </motion.div>

      </div>
    </>
  )
}
