import { FormEvent, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Dates } from '../interfaces/dates'
import { DEFAULT_DATES } from '../utils/constants'

type Props = {
  onTotalChange: (total: number) => void
  onDateChange: (dates: Dates) => void | Promise<void>
}

/** Validate that final date is greater than initial date */
function validateDates(dates: Dates) {
  const initial = new Date(dates.initial)
  const final = new Date(dates.final)

  return final > initial
}

export function DatePicker({ onTotalChange, onDateChange }: Props) {
  const [initialDate, setInitialDate] = useState(DEFAULT_DATES.initial)
  const [finalDate, setFinalDate] = useState(DEFAULT_DATES.final)
  const [total, setTotal] = useState(20)
  const [error, setError] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const dates = { initial: initialDate, final: finalDate }

    if (!validateDates(dates)) {
      setError(true)
      return
    }

    if (error) setError(false)

    onTotalChange(total)
    await onDateChange(dates)
  }

  return (
    <form
      method="POST"
      onSubmit={onSubmit}
      className={[
        'flex',
        'flex-col',
        'p-5',
        'rounded-xl',
        'shadow-md',
        'border-2',
        'dark:bg-base-200',
        'border-neutral/20',
        'gap-2',
        'mx-auto',
        'lg:mx-0',
        'w-full',
        'sm:w-[60%]',
        'md:w-[45%]',
        'lg:w-[40%]',
        'xl:w-[30%]',
      ].join(' ')}
    >
      <h3 className="font-bold mb-3">Selecciona el rango de fechas</h3>

      {error ? (
        <span className="text-red-500 text-xs font-semibold">La fecha final debe ser mayor a la fecha inicial!</span>
      ) : null}

      <div className="w-full">
        <label htmlFor="initial-date" className="label">
          <span className="label-text">Fecha inicial</span>
        </label>
        <input
          type="date"
          name="initial-date"
          className="input input-bordered w-full"
          value={initialDate}
          onChange={e => setInitialDate(e.target.value)}
        />
      </div>

      <div className="w-full">
        <label htmlFor="final-date" className="label">
          <span className="label-text">Fecha final</span>
        </label>
        <input
          type="date"
          name="final-date"
          className="input input-bordered w-full"
          value={finalDate}
          onChange={e => setFinalDate(e.target.value)}
        />
      </div>

      <div className="w-full">
        <label htmlFor="total" className="label">
          <span className="label-text">Elementos</span>
          <span className="label-text-alt">Min: 1 - Max: 70</span>
        </label>
        <input
          type="number"
          min={1}
          max={70}
          name="total"
          className="input input-bordered w-full"
          value={total}
          onChange={e => setTotal(Number(e.target.value))}
        />
      </div>

      <button type="submit" aria-label="Buscar por fecha" className="btn btn-primary text-lg btn-circle self-end">
        <IoSearch />
      </button>
    </form>
  )
}
