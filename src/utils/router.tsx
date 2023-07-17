/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const Home = lazy(() => import('../views/Home'))
const Tramos = lazy(() => import('../views/Tramos'))
const TramosCliente = lazy(() => import('../views/TramosCliente'))
const Cliente = lazy(() => import('../views/Cliente'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<span>Cargando pagina principal...</span>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/tramos',
    element: (
      <Suspense fallback={<span>Cargando pagina tramos...</span>}>
        <Tramos />
      </Suspense>
    ),
  },
  {
    path: '/tramos-cliente',
    element: (
      <Suspense fallback={<span>Cargando pagina tramos cliente...</span>}>
        <TramosCliente />
      </Suspense>
    ),
  },
  {
    path: '/cliente',
    element: (
      <Suspense fallback={<span>Cargando pagina cliente...</span>}>
        <Cliente />
      </Suspense>
    ),
  },
])
