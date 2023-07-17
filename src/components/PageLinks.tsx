import { BiSolidUserCircle } from 'react-icons/bi'
import { FaHome, FaTruck } from 'react-icons/fa'
import { MdManageSearch } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

const AVATAR_SIZE = 45

const links = [
  {
    label: 'Inicio',
    icon: <FaHome />,
    path: '/',
  },
  {
    label: 'Tramos',
    icon: <FaTruck />,
    path: '/tramos',
  },
  {
    label: 'Cliente',
    icon: <BiSolidUserCircle />,
    path: '/cliente',
  },
  {
    label: 'Tramos cliente',
    icon: <MdManageSearch />,
    path: '/tramos-cliente',
  },
]

export function PageLinks() {
  const { pathname } = useLocation()

  return (
    <details className="dropdown">
      <summary className="btn btn-ghost btn-square rounded-xl">
        <img
          src={`https://source.unsplash.com/YOErFW8AfkI/${AVATAR_SIZE}x${AVATAR_SIZE}`}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          alt="Profile"
          className="rounded-xl shadow"
        />
      </summary>

      <ul className="p-2 shadow-lg menu dropdown-content z-[1] bg-base-100 rounded-box w-52 right-0">
        {links.map((link, i) => (
          <li key={i}>
            <Link to={link.path} className={pathname === link.path ? 'active' : ''}>
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
