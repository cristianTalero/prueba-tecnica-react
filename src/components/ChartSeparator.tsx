import { BiSolidBarChartSquare } from 'react-icons/bi'

export function ChartSeparator() {
  return (
    <div className="my-5">
      <h4 className="prose-xl font-bold flex gap-2 items-center">
        <BiSolidBarChartSquare className="text-[1.7rem]" />
        Graficas
      </h4>

      <p className="mt-3 text-lg font-normal">Dale click a los colores para quitar o mostrar columnas</p>
      <hr />
    </div>
  )
}
