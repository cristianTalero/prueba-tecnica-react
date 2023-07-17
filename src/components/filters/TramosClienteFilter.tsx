import { FormEvent, useCallback, useMemo, useState } from 'react'
import { FilterActions } from './FilterActions'
import { LineaSelectInput } from './LineaSelectInput'
import { TramosClienteByDate } from '../../interfaces/tramosClienteByDate'

type Props = {
  tramos: TramosClienteByDate[]
  onFilterChange(data: TramosClienteByDate[]): void
  onFilterClear(): void
}

export function TramosClienteFilter({ tramos, onFilterChange, onFilterClear }: Props) {
  const [tipoConsumo, setTipoConsumo] = useState('Tipo de consumo')
  const [linea, setLinea] = useState('Linea')
  const [perdidaMinima, setPerdidaMinima] = useState(0)
  const [perdidaMaxima, setPerdidaMaxima] = useState(100)

  const filteredTramos = useMemo(() => {
    return tramos
      .filter(tramo => tramo.TipoConsumo !== 'Tipo de consumo' && tramo.TipoConsumo === tipoConsumo)
      .filter(tramo => tramo.Linea !== 'Linea' && tramo.Linea === linea)
      .filter(tramo => tramo.Perdidas >= perdidaMinima && tramo.Perdidas <= perdidaMaxima)
  }, [tipoConsumo, linea, perdidaMinima, perdidaMaxima])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('tipo consumo: ', tipoConsumo)
    console.log('linea: ', linea)
    console.log('perdiasMinima: ', perdidaMinima)
    console.log('perdidasMaxima: ', perdidaMaxima)

    if (tipoConsumo !== 'Tipo de consumo') {
      onFilterChange(filteredTramos)
    }
  }

  const resetForm = useCallback(() => {
    setTipoConsumo('Tipo de consumo')
    setLinea('Linea')
    setPerdidaMinima(0)
    setPerdidaMaxima(100)

    onFilterClear()
  }, [])

  return (
    <form className="flex flex-col gap-2 mt-4" onSubmit={onSubmit}>
      <div>
        <label htmlFor="tipo-consumo" className="label">
          <span className="label-text">Selecciona el tipo de consumo</span>
        </label>
        <select
          name="tipo-consumo"
          className="select w-full select-bordered"
          value={tipoConsumo}
          onChange={e => setTipoConsumo(e.target.value)}
        >
          <option value="Tipo de consumo" disabled>
            Tipo de consumo
          </option>
          <option value="Comercial">Comercial</option>
          <option value="Residencial">Residencial</option>
          <option value="Industrial">Industrial</option>
        </select>
      </div>

      <LineaSelectInput linea={linea} onChange={setLinea} />

      <div>
        <label htmlFor="perdida-minima" className="label">
          <span className="label-text">Perdida minima</span>
        </label>
        <input
          name="perdida-minima"
          type="number"
          className="input w-full input-bordered"
          placeholder="Ingresa el consumo minimo"
          onChange={e => setPerdidaMinima(Number(e.target.value))}
          value={perdidaMinima}
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
          placeholder="Ingresa el consumo maximo"
          onChange={e => setPerdidaMaxima(Number(e.target.value))}
          value={perdidaMaxima}
        />
      </div>

      <FilterActions onReset={resetForm} />
    </form>
  )
}
