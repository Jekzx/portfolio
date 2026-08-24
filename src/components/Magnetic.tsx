import { useRef } from 'react'
import type { ReactNode, MouseEvent } from 'react'

export function Magnetic({ children, strength = 0.22, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  const leave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)'
  }

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`magnetic ${className}`}>
      {children}
    </div>
  )
}
