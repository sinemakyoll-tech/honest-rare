import { useEffect, useRef } from 'react'

/* Walk up the DOM to find the nearest element with an actual background color,
   then return true if it's dark (luminance < 0.42). */
function isUnderDark(el) {
  let node = el
  while (node && node !== document.body) {
    const bg = window.getComputedStyle(node).backgroundColor
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (m) {
        const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255
        return lum < 0.42
      }
    }
    node = node.parentElement
  }
  return false
}

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
      const dark = isUnderDark(e.target)
      dotRef.current?.classList.toggle('on-dark', dark)
      ringRef.current?.classList.toggle('on-dark', dark)
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      dotRef.current?.classList.add('large')
      ringRef.current?.classList.add('large')
    }
    const onLeave = () => {
      dotRef.current?.classList.remove('large')
      ringRef.current?.classList.remove('large')
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div id="hr-cursor"      ref={dotRef}  />
      <div id="hr-cursor-ring" ref={ringRef} />
    </>
  )
}
