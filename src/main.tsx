import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './utils/router.tsx'
import ReactDOM from 'react-dom/client'
import { AxiosContext } from './contexts/AxiosContext.ts'
import { client as axiosClient } from './utils/axios.ts'
import 'chart.js/auto'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <AxiosContext.Provider value={axiosClient}>
      <RouterProvider router={router} />
    </AxiosContext.Provider>
  </StrictMode>
)
