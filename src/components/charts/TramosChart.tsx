import { TramosByDate } from '../../interfaces/tramosByDate'
import { TRAMOS } from '../../utils/constants'
import { BarChart } from './BarChart'

type Props = {
  tramos: TramosByDate[]
}

export function TramosChart({ tramos }: Props) {
  return (
    <section className="flex flex-wrap gap-6 my-6 justify-center sm:justify-start">
      {TRAMOS.map((tramo, index) => {
        const chartData = {
          labels: ['Tramos'],
          datasets: [
            {
              label: 'Consumo',
              data: [tramos[index].consumo],
              backgroundColor: 'rgb(54, 162, 235)',
            },
            {
              label: 'Perdidas',
              data: [tramos[index].perdidas],
              backgroundColor: 'rgb(255, 99, 132)',
            },
            {
              label: 'Costo',
              data: [tramos[index].costo],
              backgroundColor: 'rgb(75, 192, 192)',
            },
          ],
        }

        return <BarChart key={tramo} data={chartData} label={tramo} />
      })}
    </section>
  )
}
