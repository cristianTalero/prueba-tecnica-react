import { Bar } from 'react-chartjs-2'

type Props = {
  data: unknown[]
}
export function TramosClienteChart({ data }: Props) {
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

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Perdida',
        data,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  }

  return (
    <section className="w-[40rem] h-[20rem]">
      <Bar data={chartData} options={options} />
    </section>
  )
}
