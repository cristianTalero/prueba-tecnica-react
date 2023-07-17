import { CSSProperties } from 'react'
import { createPortal } from 'react-dom'

export function LoadingScreen() {
  return createPortal(
    <div className="w-screen text-accent fixed top-0 left-0 z-[60] h-screen grid place-items-center bg-black/80">
      <div
        className="radial-progress animate-spin"
        style={{ '--value': '60', '--size': '8rem', '--thickness': '0.5rem' } as CSSProperties}
      />
      <span className="font-bold text-3xl animate-pulse">Espera un momento</span>
    </div>,
    document.body
  )
}
