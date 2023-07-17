import { ClienteByDate } from '../../interfaces/clienteByDate'
import { FilterActions } from './FilterActions'
import { LineaSelectInput } from './LineaSelectInput'
import { FormEvent, useCallback, useMemo, useState } from 'react'

const tipos = ['residencial', 'comercial', 'industrial']

type DefaultIndex = {
  [key: string]: number
  residencial: number
  comercial: number
  industrial: number
}

const defaultMinValues: DefaultIndex = {
  residencial: 0,
  comercial: 0,
  industrial: 0,
}

const defaultMaxValues: DefaultIndex = {
  residencial: 100,
  comercial: 100,
  industrial: 100,
}

type Props = {
  clientes: ClienteByDate[]
  onFilterChange(data: ClienteByDate[]): void
  onFilterClear(): void
}

export function ClientesFilter({ clientes, onFilterChange, onFilterClear }: Props) {
  const [linea, setLinea] = useState('Linea')
  const [consumosMinimos, setConsumosMinimos] = useState(defaultMinValues)
  const [costosMinimos, setCostosMinimos] = useState(defaultMinValues)
  const [perdidasMinimas, setPerdidasMinimas] = useState(defaultMinValues)
  const [consumosMaximos, setConsumosMaximos] = useState(defaultMaxValues)
  const [costosMaximos, setCostosMaximos] = useState(defaultMaxValues)
  const [perdidasMaximas, setPerdidasMaximas] = useState(defaultMaxValues)

  const filteredTramos = useMemo(() => {
    return clientes
      .filter(cliente => cliente.Linea !== 'Linea' && cliente.Linea === linea)
      .filter(
        cliente =>
          cliente.consumo_comercial >= consumosMinimos.comercial &&
          cliente.consumo_comercial <= consumosMaximos.comercial
      )
      .filter(
        cliente =>
          cliente.consumo_industrial >= consumosMinimos.industrial &&
          cliente.consumo_industrial <= consumosMaximos.industrial
      )
      .filter(
        cliente =>
          cliente.consumo_residencial >= consumosMinimos.residencial &&
          cliente.consumo_residencial <= consumosMaximos.residencial
      )
      .filter(
        cliente =>
          cliente.costo_comercial >= costosMinimos.comercial && cliente.costo_comercial <= costosMaximos.comercial
      )
      .filter(
        cliente =>
          cliente.costo_industrial >= costosMinimos.industrial && cliente.costo_industrial <= costosMaximos.industrial
      )
      .filter(
        cliente =>
          cliente.costo_residencial >= costosMinimos.residencial &&
          cliente.costo_residencial <= costosMaximos.residencial
      )
      .filter(
        cliente =>
          cliente.perdidas_comercial >= perdidasMinimas.comercial &&
          cliente.perdidas_comercial <= perdidasMaximas.comercial
      )
      .filter(
        cliente =>
          cliente.perdidas_industrial >= perdidasMinimas.comercial &&
          cliente.perdidas_industrial <= perdidasMaximas.industrial
      )
      .filter(
        cliente =>
          cliente.perdidas_residencial >= perdidasMinimas.residencial &&
          cliente.perdidas_residencial <= perdidasMaximas.residencial
      )
  }, [linea, consumosMinimos, costosMinimos, perdidasMinimas, consumosMaximos, costosMaximos, perdidasMaximas])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    console.log('Linea: ', linea)

    if (linea !== 'Linea') {
      onFilterChange(filteredTramos)
    }
  }

  const resetForm = useCallback(() => {
    setLinea('Linea')
    setConsumosMinimos(defaultMinValues)
    setCostosMinimos(defaultMinValues)
    setPerdidasMinimas(defaultMinValues)
    setConsumosMaximos(defaultMaxValues)
    setCostosMaximos(defaultMaxValues)
    setPerdidasMaximas(defaultMaxValues)

    onFilterClear()
  }, [])

  return (
    <form className="flex flex-col gap-2 mt-4" onSubmit={onSubmit}>
      <LineaSelectInput linea={linea} onChange={setLinea} />

      <hr />

      {tipos.map(tipo => {
        const labels = {
          consumoMinimo: `consumo-minimo-${tipo}`,
          consumoMaximo: `consumo-maximo-${tipo}`,
          costoMinimo: `costo-minimo-${tipo}`,
          costoMaximo: `costo-maximo-${tipo}`,
          perdidaMinima: `perdida-minima-${tipo}`,
          perdidaMaxima: `perdida-maxima-${tipo}`,
        }

        return (
          <div key={tipo}>
            <div className="px-3 py-1">
              <h3 className="font-semibold capitalize">{tipo}</h3>

              <div>
                <label htmlFor={labels.consumoMinimo} className="label">
                  <span className="label-text">Consumo minimo</span>
                </label>
                <input
                  name={labels.consumoMinimo}
                  type="number"
                  className="input w-full input-bordered"
                  placeholder="Ingresa el consumo minimo"
                  value={consumosMinimos[tipo]}
                  onChange={e => setConsumosMinimos(curr => ({ ...curr, [tipo]: Number(e.target.value) }))}
                />
              </div>

              <div>
                <label htmlFor={labels.consumoMaximo} className="label">
                  <span className="label-text">Consumo maximo</span>
                </label>
                <input
                  name={labels.consumoMaximo}
                  type="number"
                  className="input w-full input-bordered"
                  placeholder="Ingresa el consumo maximo"
                  value={consumosMaximos[tipo]}
                  onChange={e => setConsumosMaximos(curr => ({ ...curr, [tipo]: Number(e.target.value) }))}
                />
              </div>

              <div>
                <label htmlFor={labels.costoMinimo} className="label">
                  <span className="label-text">Costo minimo</span>
                </label>
                <input
                  name={labels.costoMinimo}
                  type="number"
                  className="input w-full input-bordered"
                  placeholder="Ingresa el costo minimo"
                  value={costosMinimos[tipo]}
                  onChange={e => setCostosMinimos(curr => ({ ...curr, [tipo]: Number(e.target.value) }))}
                />
              </div>

              <div>
                <label htmlFor={labels.costoMaximo} className="label">
                  <span className="label-text">Costo maximo</span>
                </label>
                <input
                  name={labels.costoMaximo}
                  type="number"
                  className="input w-full input-bordered"
                  placeholder="Ingresa el costo maximo"
                  value={costosMaximos[tipo]}
                  onChange={e => setCostosMaximos(curr => ({ ...curr, [tipo]: Number(e.target.value) }))}
                />
              </div>

              <div>
                <label htmlFor={labels.perdidaMinima} className="label">
                  <span className="label-text">Perdida minima</span>
                </label>
                <input
                  name={labels.perdidaMinima}
                  type="number"
                  className="input w-full input-bordered"
                  placeholder="Ingresa la perdida minima"
                  value={perdidasMinimas[tipo]}
                  onChange={e => setPerdidasMinimas(curr => ({ ...curr, [tipo]: Number(e.target.value) }))}
                />
              </div>

              <div>
                <label htmlFor={labels.perdidaMaxima} className="label">
                  <span className="label-text">Perdida maxima</span>
                </label>
                <input
                  name={labels.perdidaMaxima}
                  type="number"
                  className="input w-full input-bordered"
                  placeholder="Ingresa la perdida maxima"
                  value={perdidasMaximas[tipo]}
                  onChange={e => setPerdidasMaximas(curr => ({ ...curr, [tipo]: Number(e.target.value) }))}
                />
              </div>
            </div>

            <hr />
          </div>
        )
      })}

      <FilterActions onReset={resetForm} />
    </form>
  )
}
