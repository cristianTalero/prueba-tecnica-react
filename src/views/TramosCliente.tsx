import { PageLayout } from '../layouts/PageLayout'
import { createColumnHelper } from '@tanstack/react-table'
import { TramosClienteByDate } from '../interfaces/tramosClienteByDate'
import { MdManageSearch } from 'react-icons/md'
import { DataTable } from '../components/DataTable'
import { DatePicker } from '../components/DatePicker'
import { useGetDataFromApi } from '../hooks/useGetDataFromApi'
import { useCallback, useEffect, useState } from 'react'
import { LoadingScreen } from '../components/LoadingScreen'
import { TramosClienteChart } from '../components/charts/TramosClienteChart'
import { ChartSeparator } from '../components/ChartSeparator'
import { TramosClienteFilter } from '../components/filters/TramosClienteFilter'

const TramosClienteColumnsHelper = createColumnHelper<TramosClienteByDate>()

const columns = [
  TramosClienteColumnsHelper.accessor('TipoConsumo', {
    id: 'Tipo Consumo',
    header: 'Tipo consumo',
    cell: info => info.getValue(),
  }),
  TramosClienteColumnsHelper.accessor('Linea', {
    id: 'Linea',
    header: 'Linea',
    cell: info => info.getValue(),
  }),
  TramosClienteColumnsHelper.accessor('Perdidas', {
    id: 'Perdidas',
    header: () => 'Perdidas',
    cell: info => <span className="text-red-500">{info.renderValue()?.toFixed(2)}</span>,
  }),
]

export default function TramosCliente() {
  const [tramos, getTramos, isLoading] = useGetDataFromApi<TramosClienteByDate>('/tramos-cliente')
  const [totalTramos, setTotalTramos] = useState(20)
  const [hasData, setHasData] = useState(false)
  const [filteredTramos, setFilteredTramos] = useState<TramosClienteByDate[]>([])
  const [isFiltered, setIsFiltered] = useState(false)

  const data = isFiltered ? filteredTramos : tramos

  const onFilterChange = useCallback((tramos: TramosClienteByDate[]) => {
    setFilteredTramos(tramos)
    setIsFiltered(true)
  }, [])

  useEffect(() => {
    setFilteredTramos(tramos)
  }, [tramos])

  return (
    <PageLayout
      title="Tramos cliente"
      icon={<MdManageSearch />}
      filter={
        <TramosClienteFilter
          tramos={tramos}
          onFilterChange={onFilterChange}
          onFilterClear={() => setIsFiltered(false)}
        />
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
          <TramosClienteChart tramos={tramos} />
        </>
      ) : null}
    </PageLayout>
  )
}
