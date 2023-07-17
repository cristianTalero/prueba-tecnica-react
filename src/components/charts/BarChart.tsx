import { ChartData, ElementChartOptions } from 'chart.js'
import { Bar } from 'react-chartjs-2'

type Props = {
  data: ChartData<'bar', (number | [number, number] | null)[], unknown>
  label: string
  options?: unknown
}

export function BarChart({ data, label, options }: Props) {
  return (
    <article className="w-[25rem] h-[15rem] shadow border-2 p-4 rounded-box">
      <h2 className="font-bold text-sm">{label}</h2>
      <Bar data={data} options={options as ElementChartOptions<'bar'>} />
    </article>
  )
}
