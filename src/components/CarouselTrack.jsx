import { useRef, useState, useCallback, useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

/* ── Arrow button (desktop only) ── */
function Arrow({ dir, visible, onPress }) {
  return (
    <button
      className="carousel-arrow"
      onMouseDown={e => { e.preventDefault(); onPress() }}
      style={{
        position: 'absolute',
        [dir === 'left' ? 'left' : 'right']: 20,
        top: '50%',
        width: 44, height: 44,
        background: 'rgba(240,238,234,0.38)',
        border: '1px solid rgba(240,238,234,0.45)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.28s ease, transform 0.28s ease',
        transform: `translateY(-50%) translateX(${visible ? 0 : (dir === 'left' ? -10 : 10)}px)`,
        zIndex: 20,
        backdropFilter: 'blur(14px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
        boxShadow: '0 2px 16px rgba(26,22,20,0.08), inset 0 1px 0 rgba(255,255,255,0.35)',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        {dir === 'left'
          ? <path d="M8.5 1.5L3.5 6.5l5 5" stroke="#1a1614" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M4.5 1.5l5 5-5 5" stroke="#1a1614" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  )
}

/* ── Mobile: transform-based RAF loop + swipe override ── */
function MobileStrip({ children, paddingLeft = 16 }) {
  const outerRef         = useRef(null)
  const innerRef         = useRef(null)
  const xRef             = useRef(0)
  const startX           = useRef(0)
  const startY           = useRef(0)
  const startScroll      = useRef(0)
  const touchingRef      = useRef(false)
  const dirLock          = useRef(null)   // 'h' | 'v' | null
  const resumeTimer      = useRef(null)
  const rafRef           = useRef(null)

  useEffect(() => {
    const el    = innerRef.current
    const outer = outerRef.current
    if (!el || !outer) return

    function tick() {
      if (!touchingRef.current) {
        xRef.current -= 0.7
        const half = el.scrollWidth / 2
        if (xRef.current < -half) xRef.current += half
        el.style.transform = `translateX(${xRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    function onStart(e) {
      clearTimeout(resumeTimer.current)
      dirLock.current    = null
      touchingRef.current = true
      startX.current     = e.touches[0].clientX
      startY.current     = e.touches[0].clientY
      startScroll.current = xRef.current
    }

    function onMove(e) {
      const dx = e.touches[0].clientX - startX.current
      const dy = e.touches[0].clientY - startY.current

      if (!dirLock.current) {
        if (Math.abs(dx) > Math.abs(dy) + 4)      dirLock.current = 'h'
        else if (Math.abs(dy) > Math.abs(dx) + 4) { dirLock.current = 'v'; touchingRef.current = false; return }
        else return
      }
      if (dirLock.current === 'v') return

      e.preventDefault()
      const half = el.scrollWidth / 2
      let x = startScroll.current + dx * 1.3
      while (x < -half) x += half
      while (x > 0)     x -= half
      xRef.current = x
      el.style.transform = `translateX(${x}px)`
    }

    function onEnd() {
      clearTimeout(resumeTimer.current)
      dirLock.current = null
      resumeTimer.current = setTimeout(() => { touchingRef.current = false }, 120)
    }

    outer.addEventListener('touchstart',  onStart, { passive: true })
    outer.addEventListener('touchmove',   onMove,  { passive: false })
    outer.addEventListener('touchend',    onEnd,   { passive: true })
    outer.addEventListener('touchcancel', onEnd,   { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(resumeTimer.current)
      outer.removeEventListener('touchstart',  onStart)
      outer.removeEventListener('touchmove',   onMove)
      outer.removeEventListener('touchend',    onEnd)
      outer.removeEventListener('touchcancel', onEnd)
    }
  }, [])

  return (
    <div ref={outerRef} style={{ overflow: 'hidden' }}>
      <div
        ref={innerRef}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          width: 'max-content',
          paddingLeft,
          paddingRight: 16,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ── Desktop: CSS animation + freeze/resume + arrow buttons ── */
export default function CarouselTrack({ children, duration = 44, step = 880, paddingLeft = 16, style = {} }) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileStrip paddingLeft={paddingLeft} style={style}>{children}</MobileStrip>
  }

  return (
    <DesktopTrack duration={duration} step={step} paddingLeft={paddingLeft} style={style}>
      {children}
    </DesktopTrack>
  )
}

function DesktopTrack({ children, duration, step, paddingLeft, style }) {
  const containerRef  = useRef(null)
  const innerRef      = useRef(null)
  const manualX       = useRef(null)
  const wheelTimer    = useRef(null)
  const [showLeft,  setShowLeft]  = useState(false)
  const [showRight, setShowRight] = useState(false)

  function getX() {
    const t = getComputedStyle(innerRef.current).transform
    return t === 'none' ? 0 : new DOMMatrix(t).m41
  }

  function normalize(x, half) {
    while (x < -half) x += half
    while (x > 0)     x -= half
    return x
  }

  function freeze() {
    const x = getX()
    manualX.current = x
    const el = innerRef.current
    el.style.animation  = 'none'
    el.style.transition = 'none'
    el.style.transform  = `translateX(${x}px)`
  }

  function resume() {
    const el   = innerRef.current
    const half = el.scrollWidth / 2
    const x    = normalize(manualX.current ?? getX(), half)
    const delay = -((Math.abs(x) / half) * duration)
    manualX.current = null

    el.style.transition = 'none'
    el.style.transform  = `translateX(${x}px)`

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.animation  = `marquee-left ${duration}s linear ${delay}s infinite`
        el.style.transform  = ''
        el.style.transition = ''
      })
    })
  }

  function handleEnter() { freeze() }

  function handleLeave() {
    setShowLeft(false)
    setShowRight(false)
    resume()
  }

  function handleMove(e) {
    const rect = containerRef.current.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const zone = Math.min(130, rect.width * 0.14)
    setShowLeft(x < zone)
    setShowRight(x > rect.width - zone)
  }

  const scrollLeft = useCallback(() => {
    const el   = innerRef.current
    const half = el.scrollWidth / 2
    let x = manualX.current ?? getX()
    x += step
    x = normalize(x, half)
    manualX.current     = x
    el.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)'
    el.style.transform  = `translateX(${x}px)`
  }, [step])

  const scrollRight = useCallback(() => {
    const el   = innerRef.current
    const half = el.scrollWidth / 2
    let x = manualX.current ?? getX()
    x -= step
    x = normalize(x, half)
    manualX.current     = x
    el.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)'
    el.style.transform  = `translateX(${x}px)`
  }, [step])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function onWheel(e) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()

      if (manualX.current === null) {
        const x = getX()
        manualX.current = x
        const el = innerRef.current
        el.style.animation  = 'none'
        el.style.transition = 'none'
        el.style.transform  = `translateX(${x}px)`
      }

      const el   = innerRef.current
      const half = el.scrollWidth / 2
      let x = manualX.current - e.deltaX
      while (x < -half) x += half
      while (x > 0)     x -= half
      manualX.current    = x
      el.style.transition = 'none'
      el.style.transform  = `translateX(${x}px)`

      clearTimeout(wheelTimer.current)
      wheelTimer.current = setTimeout(() => resume(), 900)
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', onWheel)
      clearTimeout(wheelTimer.current)
    }
  }, [duration])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'none', ...style }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <div
        ref={innerRef}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          paddingLeft,
          animation: `marquee-left ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>

      <Arrow dir="left"  visible={showLeft}  onPress={scrollLeft} />
      <Arrow dir="right" visible={showRight} onPress={scrollRight} />
    </div>
  )
}
