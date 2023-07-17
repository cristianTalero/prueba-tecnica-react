import { useCallback, useContext, useEffect, useState } from 'react'
import { Dates } from '../interfaces/dates'
import { AxiosContext } from '../contexts/AxiosContext'
import { DEFAULT_DATES } from '../utils/constants'
import sweel from 'sweetalert2'

type ReturnType<T> = [T[], (dates: Dates) => Promise<void>, boolean]

/** Hook to get data from API using context API */
export function useGetDataFromApi<T>(endpoint: string): ReturnType<T> {
  const api = useContext(AxiosContext)
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(undefined)

  // Fetch data on mount app
  useEffect(() => void fetchData(DEFAULT_DATES), [])

  // Show an alert when an error ocurred
  useEffect(() => {
    if (error) {
      void sweel.fire({
        title: 'Ocurrio un error!',
        text: `${(error as Error).message} (Revisa la consola de desarrollo para mas información)`,
        icon: 'error',
      })
    }
  }, [error])

  const fetchData = useCallback(async (dates: Dates) => {
    setIsLoading(true)

    try {
      const { initial: initialDate, final: finalDate } = dates

      const form = new FormData()
      form.append('fechaInicial', initialDate)
      form.append('fechaFinal', finalDate)

      const res = await api?.post<T[]>(endpoint, form)
      if (res?.data) setData(res.data)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return [data, fetchData, isLoading]
}
