import { createContext } from 'react'
import { Axios } from 'axios'

export const AxiosContext = createContext<Axios | undefined>(undefined)
