import { useRef, useState } from 'react'

export default function RainbowGlassButton({ children, as: Tag = 'button', href, to, onClick, className = '', style = {} }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const props = {
    ref,
    ...(to ? { to } : { href }),
    onClick,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPos({ x: -200, y: -200 }) },
    className,
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.18)',
      cursor: 'none',
      textDecoration: 'none',
      ...style,
    },
  }

  return (
    <Tag {...props}>
      {/* Rainbow spotlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
        background: `radial-gradient(circle 70px at ${pos.x}px ${pos.y}px,
          rgba(255, 80, 80, 0.55),
          rgba(255, 160, 40, 0.48),
          rgba(255, 230, 50, 0.42),
          rgba(60, 220, 100, 0.36),
          rgba(60, 140, 255, 0.30),
          rgba(160, 80, 255, 0.22),
          rgba(255, 80, 200, 0.14),
          transparent 72%)`,
      }} />

      {/* Glass shine */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
      }} />

      {/* Content */}
      <span style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </span>
    </Tag>
  )
}
