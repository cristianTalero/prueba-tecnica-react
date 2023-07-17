import { PageLayout } from '../layouts/PageLayout'
import { TramosByDate } from '../interfaces/tramosByDate'
import { createColumnHelper } from '@tanstack/react-table'
import { FaTruck } from 'react-icons/fa'
import { DataTable } from '../components/DataTable'
import { DatePicker } from '../components/DatePicker'
import { useGetDataFromApi } from '../hooks/useGetDataFromApi'
import { useCallback, useEffect, useState } from 'react'
import { LoadingScreen } from '../components/LoadingScreen'
import { TramosChart } from '../components/charts/TramosChart'
import { ChartSeparator } from '../components/ChartSeparator'
import { TramosFilter } from '../components/filters/TramosFilter'

const tramoColumnsHelper = createColumnHelper<TramosByDate>()

const columns = [
  tramoColumnsHelper.accessor('Linea', {
    id: 'Linea',
    header: 'Linea',
    cell: info => info.getValue(),
  }),
  tramoColumnsHelper.accessor('consumo', {
    id: 'Consumo',
    header: 'Consumo',
    cell: info => info.renderValue()?.toFixed(2),
  }),
  tramoColumnsHelper.accessor('costo', {
    id: 'Costo',
    header: 'Costo',
    cell: info => <span className="text-green-600">{info.renderValue()?.toFixed(2)}</span>,
  }),
  tramoColumnsHelper.accessor('perdidas', {
    id: 'Perdidas',
    header: 'Perdidas',
    cell: info => <span className="text-red-500">{info.renderValue()?.toFixed(2)}</span>,
  }),
]

export default function Tramos() {
  const [tramos, getTramos, isLoading] = useGetDataFromApi<TramosByDate>('/tramos')
  const [totalTramos, setTotalTramos] = useState(20)
  const [hasData, setHasData] = useState(false)
  const [filteredTramos, setFilteredTramos] = useState<TramosByDate[]>([])
  const [isFiltered, setIsFiltered] = useState(false)

  const data = isFiltered ? filteredTramos : tramos

  const onFilterChange = useCallback((tramos: TramosByDate[]) => {
    setFilteredTramos(tramos)
    setIsFiltered(true)
  }, [])

  useEffect(() => {
    setFilteredTramos(tramos)
  }, [tramos])

  return (
    <PageLayout
      title="Tramos"
      icon={<FaTruck />}
      filter={
        <TramosFilter tramos={tramos} onFilterChange={onFilterChange} onFilterClear={() => setIsFiltered(false)} />
      }
    >
      {isLoading ? <LoadingScreen /> : null}

      <div className="overflow-x-auto flex flex-col lg:flex-row gap-4 items-start">
        <DatePicker onDateChange={getTramos} onTotalChange={setTotalTramos} />

        <hr className="lg:hidden" />

        <DataTable total={totalTramos} data={data} columns={columns} onTableHasData={setHasData} />
      </div>

      {hasData ? (
        <>
          <ChartSeparator />
          <TramosChart tramos={tramos} />
        </>
      ) : null}
    </PageLayout>
  )
}
