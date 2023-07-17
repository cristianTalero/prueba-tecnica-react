import { FormEvent, useCallback, useMemo, useState } from 'react'
import { FilterActions } from './FilterActions'
import { TramosByDate } from '../../interfaces/tramosByDate'
import { LineaSelectInput } from './LineaSelectInput'

type Props = {
  tramos: TramosByDate[]
  onFilterChange(data: TramosByDate[]): void
  onFilterClear(): void
}

export function TramosFilter({ tramos, onFilterChange, onFilterClear }: Props) {
  const [linea, setLinea] = useState('Linea')
  const [consumoMinimo, setConsumoMinimo] = useState(0)
  const [consumoMaximo, setConsumoMaximo] = useState(100)
  const [costoMinimo, setCostoMinimo] = useState(0)
  const [costoMaximo, setCostoMaximo] = useState(100)
  const [perdidaMinima, setPerdidaMinima] = useState(0)
  const [perdidaMaxima, setPerdidaMaxima] = useState(100)

  const filteredTramos = useMemo(() => {
    return tramos
      .filter(tramo => tramo.Linea !== 'Linea' && tramo.Linea === linea)
      .filter(tramo => tramo.consumo >= consumoMinimo && tramo.consumo <= consumoMaximo)
      .filter(tramo => tramo.costo >= costoMinimo && tramo.costo <= costoMaximo)
      .filter(tramo => tramo.perdidas >= perdidaMinima && tramo.perdidas <= perdidaMaxima)
  }, [linea, consumoMinimo, consumoMaximo, costoMinimo, costoMaximo, perdidaMinima, perdidaMaxima])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    console.log('Linea: ', linea)
    console.log('Consumo minimo: ', consumoMinimo)
    console.log('Consumo maximo: ', consumoMaximo)
    console.log('Costo minimo: ', costoMinimo)
    console.log('Costo maximo: ', costoMaximo)
    console.log('Perdida minima: ', perdidaMinima)
    console.log('Perdida maxima: ', perdidaMaxima)

    if (linea !== 'Linea') {
      onFilterChange(filteredTramos)
    }
  }

  const resetForm = useCallback(() => {
    setLinea('Linea')
    setConsumoMinimo(0)
    setConsumoMaximo(100)
    setCostoMinimo(0)
    setCostoMaximo(100)
    setPerdidaMinima(0)
    setPerdidaMaxima(100)

    onFilterClear()
  }, [])

  return (
    <form className="flex flex-col gap-2 mt-4" onSubmit={onSubmit}>
      <LineaSelectInput linea={linea} onChange={setLinea} />

      <div>
        <label htmlFor="consumo-minimo" className="label">
          <span className="label-text">Consumo minimo</span>
        </label>
        <input
          name="consumo-minimo"
          type="number"
          className="input w-full input-bordered"
          placeholder="Ingresa el consumo minimo"
          value={consumoMinimo}
          onChange={e => setConsumoMinimo(Number(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="consumo-maximo" className="label">
          <span className="label-text">Consumo maximo</span>
        </label>
        <input
          name="consumo-maximo"
          type="number"
          className="input w-full input-bordered"
          placeholder="Ingresa el consumo maximo"
          value={consumoMaximo}
          onChange={e => setConsumoMaximo(Number(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="costo-minimo" className="label">
          <span className="label-text">Costo minimo</span>
        </label>
        <input
          name="costo-minimo"
          type="number"
          className="input w-full input-bordered"
          placeholder="Ingresa el costo minimo"
          value={costoMinimo}
          onChange={e => setCostoMinimo(Number(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="costo-maximo" className="label">
          <span className="label-text">Costo maximo</span>
        </label>
        <input
          name="costo-maximo"
          type="number"
          className="input w-full input-bordered"
          placeholder="Ingresa el costo maximo"
          value={costoMaximo}
          onChange={e => setCostoMaximo(Number(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="perdida-minima" className="label">
          <span className="label-text">Perdida minima</span>
        </label>
        <input
          name="perdida-minima"
          type="number"
          className="input w-full input-bordered"
          placeholder="Ingresa la perdida minima"
          value={perdidaMinima}
          onChange={e => setPerdidaMinima(Number(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="perdida-maxima" className="label">
          <span className="label-text">Perdida maxima</span>
        </label>
        <input
          name="perdida-maxima"
          type="number"
          className="input w-full input-bordered"
          placeholder="Ingresa la perdida maxima"
          value={perdidaMaxima}
          onChange={e => setPerdidaMaxima(Number(e.target.value))}
        />
      </div>

      <FilterActions onReset={resetForm} />
    </form>
  )
}
