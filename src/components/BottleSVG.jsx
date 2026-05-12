/* Reusable olive oil bottle SVG — supports size and color variants */
export default function BottleSVG({ size = 'md', variant = 'antico', reflection = false }) {
  const sizes = { sm: [60, 160], md: [90, 240], lg: [140, 380], hero: [180, 480] }
  const [w, h] = sizes[size] ?? sizes.md

  const palettes = {
    antico:    { body: '#7a8f6e', cap: '#9a7c32', fill: '#c9a84c', label: '#0a0a0a' },
    verde:     { body: '#5a7852', cap: '#4a6040', fill: '#8aaa78', label: '#0a0a0a' },
    riserva:   { body: '#c9a84c', cap: '#9a7c32', fill: '#e8c96a', label: '#0a0a0a' },
    biologico: { body: '#6a7a5e', cap: '#4a6040', fill: '#8a9a7e', label: '#0a0a0a' },
    affumicato:{ body: '#4a3820', cap: '#2a2218', fill: '#8a6840', label: '#0a0a0a' },
    stagionale:{ body: '#9a8060', cap: '#9a7c32', fill: '#c9a84c', label: '#0a0a0a' },
  }
  const pal = palettes[variant] ?? palettes.antico
  const id  = `${variant}-${size}-${Math.random().toString(36).slice(2,6)}`

  return (
    <svg
      width={w} height={h}
      viewBox="0 0 180 480"
      fill="none"
      style={{ transform: reflection ? 'scaleY(-1)' : undefined, opacity: reflection ? 0.32 : 1 }}
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={pal.body} stopOpacity="0.75"/>
          <stop offset="100%" stopColor={pal.body} stopOpacity="0.55"/>
        </linearGradient>
        <linearGradient id={`oil-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={pal.fill} stopOpacity="0.72"/>
          <stop offset="100%" stopColor={pal.cap}  stopOpacity="0.9"/>
        </linearGradient>
        <linearGradient id={`neck-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={pal.fill} stopOpacity="0.85"/>
          <stop offset="100%" stopColor={pal.body} stopOpacity="0.6"/>
        </linearGradient>
        <radialGradient id={`hl-${id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>
        <clipPath id={`body-clip-${id}`}>
          <path d="M60 120 Q28 138 26 170 L26 410 Q26 445 90 445 Q154 445 154 410 L154 170 Q152 138 120 120 Z"/>
        </clipPath>
      </defs>

      {/* Cap */}
      <rect x="70" y="14" width="40" height="18" rx="6" fill={pal.cap}/>
      <rect x="73" y="18" width="34" height="12" rx="4.5" fill={pal.fill} opacity="0.7"/>

      {/* Neck ring */}
      <rect x="68" y="30" width="44" height="12" rx="4" fill={pal.fill} opacity="0.88"/>

      {/* Neck taper */}
      <path d="M68 42 L58 120 L122 120 L112 42 Z" fill={`url(#neck-${id})`}/>

      {/* Body */}
      <path d="M58 120 Q28 138 26 170 L26 410 Q26 445 90 445 Q154 445 154 410 L154 170 Q152 138 122 120 Z"
            fill={`url(#bg-${id})`}/>

      {/* Oil fill */}
      <path d="M29 265 L29 406 Q29 438 90 438 Q151 438 151 406 L151 265 Z"
            fill={`url(#oil-${id})`} clipPath={`url(#body-clip-${id})`}/>

      {/* Oil surface wave */}
      <path d="M29 265 Q59 256 90 260 Q121 264 151 255 L151 272 Q121 281 90 277 Q59 273 29 282 Z"
            fill={pal.fill} opacity="0.35"/>

      {/* Glass highlight */}
      <path d="M40 150 Q34 195 34 340 L46 340 Q46 195 52 150 Z" fill="white" opacity="0.1"/>
      <path d="M148 175 Q152 220 152 320 L142 320 Q142 220 138 175 Z" fill="white" opacity="0.05"/>

      {/* Overall highlight */}
      <path d="M58 120 Q28 138 26 170 L26 410 Q26 445 90 445 Q154 445 154 410 L154 170 Q152 138 122 120 Z"
            fill={`url(#hl-${id})`}/>

      {/* Label background */}
      <rect x="34" y="190" width="112" height="140" rx="4" fill={pal.label} opacity="0.55"/>
      <rect x="38" y="194" width="104" height="132" rx="2.5" fill={pal.label} opacity="0.3"/>

      {/* Label top/bottom rules */}
      <rect x="42" y="202" width="96" height="1"   fill={pal.fill} opacity="0.55"/>
      <rect x="42" y="320" width="96" height="1"   fill={pal.fill} opacity="0.55"/>

      {/* Label side rules */}
      <rect x="42" y="202" width="1" height="118" fill={pal.fill} opacity="0.15"/>
      <rect x="137" y="202" width="1" height="118" fill={pal.fill} opacity="0.15"/>

      {/* Brand name */}
      <text x="90" y="250" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16"
            fill={pal.fill} letterSpacing="5" opacity="0.95">HONEST</text>
      <text x="90" y="272" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10"
            fill="#f5f0e8" opacity="0.4" letterSpacing="3">&amp;</text>
      <text x="90" y="294" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16"
            fill={pal.fill} letterSpacing="5" opacity="0.95">RARE</text>

      {/* Variety line */}
      <text x="90" y="310" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7.5"
            fill="#f5f0e8" opacity="0.35" letterSpacing="2.5">EXTRA VERGINE DI OLIVA</text>

      {/* Volume */}
      <text x="90" y="326" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7"
            fill={pal.fill} opacity="0.4" letterSpacing="2">500 ml</text>

      {/* Bottom reflection line */}
      <ellipse cx="90" cy="445" rx="64" ry="6" fill="black" opacity="0.3"/>
    </svg>
  )
}
