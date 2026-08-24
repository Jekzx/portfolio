import { useEffect, useRef } from 'react'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const halo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let hx = x
    let hy = y
    let frame = 0

    const move = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      document.documentElement.style.setProperty('--cursor-x', `${x}px`)
      document.documentElement.style.setProperty('--cursor-y', `${y}px`)
      const target = event.target as HTMLElement
      const interactive = !!target.closest('a, button, [data-cursor="interactive"]')
      halo.current?.classList.toggle('is-active', interactive)
    }

    const render = () => {
      hx += (x - hx) * 0.16
      hy += (y - hy) * 0.16
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (halo.current) halo.current.style.transform = `translate3d(${hx}px, ${hy}px, 0)`
      frame = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', move)
    frame = requestAnimationFrame(render)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={halo} className="cursor-halo" />
      <div ref={dot} className="cursor-dot" />
    </>
  )
}
