import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageLinks } from './PageLinks'

type Props = {
  children: ReactNode
}

export function Navbar({ children }: Props) {
  return (
    <nav className="navbar bg-primary sticky top-0 z-40">
      <div className="navbar-start">
        <Link to="/" className="btn btn-primary text-base">
          {children}
        </Link>
      </div>

      <div className="navbar-end">
        <PageLinks />
      </div>
    </nav>
  )
}
