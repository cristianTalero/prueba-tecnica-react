import { TramosClienteByDate } from '../../interfaces/tramosClienteByDate'
import { useMemo } from 'react'
import { BarChart } from './BarChart'

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Linea',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Perdida',
      },
    },
  },
}

interface GroupedData {
  [key: string]: number
}

type Props = {
  tramos: TramosClienteByDate[]
}

export function TramosClienteChart({ tramos }: Props) {
  // Filtered comercial data
  const comercial = useMemo(
    () =>
      tramos
        .filter(tramo => tramo.TipoConsumo === 'Comercial')
        .sort((a, b) => a.Linea.toString().localeCompare(b.Linea.toString(), undefined, { numeric: true }))
        .reduce<GroupedData>((acc, item) => {
          if (acc[item.Linea]) {
            acc[item.Linea] += item.Perdidas
          } else {
            acc[item.Linea] = item.Perdidas
          }
          return acc
        }, {}),
    [tramos]
  )

  // Filtered residential data
  const residencial = useMemo(
    () =>
      tramos
        .filter(tramo => tramo.TipoConsumo === 'Residencial')
        .sort((a, b) => a.Linea.toString().localeCompare(b.Linea.toString(), undefined, { numeric: true }))
        .reduce<GroupedData>((acc, item) => {
          if (acc[item.Linea]) {
            acc[item.Linea] += item.Perdidas
          } else {
            acc[item.Linea] = item.Perdidas
          }
          return acc
        }, {}),
    [tramos]
  )

  // Filtered industrial data
  const industrial = useMemo(
    () =>
      tramos
        .filter(tramo => tramo.TipoConsumo === 'Industrial')
        .sort((a, b) => a.Linea.toString().localeCompare(b.Linea.toString(), undefined, { numeric: true }))
        .reduce<GroupedData>((acc, item) => {
          if (acc[item.Linea]) {
            acc[item.Linea] += item.Perdidas
          } else {
            acc[item.Linea] = item.Perdidas
          }
          return acc
        }, {}),
    [tramos]
  )

  const comercialData = {
    labels: Object.keys(comercial),
    datasets: [
      {
        label: 'Comercial',
        data: Object.values(comercial),
        backgroundColor: 'rgb(24, 26, 59)',
        borderColor: 'rgb(24, 26, 59)',
      },
    ],
  }

  const residencialData = {
    labels: Object.keys(residencial),
    datasets: [
      {
        label: 'Residencial',
        data: Object.values(residencial),
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(200, 94, 132)',
      },
    ],
  }

  const industrialData = {
    labels: Object.keys(industrial),
    datasets: [
      {
        label: 'Industrial',
        data: Object.values(industrial),
        backgroundColor: 'rgb(2, 99, 132)',
        borderColor: 'rgb(2, 99, 132)',
      },
    ],
  }

  return (
    <section className="flex flex-wrap gap-6 my-6 justify-center sm:justify-start">
      <BarChart data={comercialData} label="Comercial" options={options} />
      <BarChart data={residencialData} label="Residencial" options={options} />
      <BarChart data={industrialData} label="Industrial" options={options} />
    </section>
  )
}
