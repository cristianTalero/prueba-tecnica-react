import { ClienteByDate } from '../../interfaces/clienteByDate'
import { TRAMOS } from '../../utils/constants'
import { BarChart } from './BarChart'

const tipos = ['Residencial', 'Comercial', 'Industrial']

type Props = {
  clientes: ClienteByDate[]
}

export function ClienteChart({ clientes }: Props) {
  // Filter clients by Tramo
  const getChartData = (tramo: string) => {
    const filteredData = clientes.filter(cliente => cliente.Linea === tramo)

    return {
      labels: tipos,
      datasets: [
        {
          label: 'Consumo',
          backgroundColor: 'rgb(255, 99, 132)',
          data: [
            filteredData[0].consumo_residencial,
            filteredData[0].consumo_comercial,
            filteredData[0].consumo_industrial,
          ],
        },
        {
          label: 'Perdidas',
          backgroundColor: 'rgb(54, 162, 235)',
          data: [
            filteredData[0].perdidas_residencial,
            filteredData[0].perdidas_comercial,
            filteredData[0].perdidas_industrial,
          ],
        },
        {
          label: 'Costo',
          backgroundColor: 'rgb(75, 192, 192)',
          data: [filteredData[0].costo_residencial, filteredData[0].costo_comercial, filteredData[0].costo_industrial],
        },
      ],
    }
  }

  return (
    <section className="flex flex-wrap gap-6 my-6 justify-center sm:justify-start">
      {TRAMOS.map(tramo => (
        <BarChart key={tramo} data={getChartData(tramo)} label={tramo} />
      ))}
    </section>
  )
}
