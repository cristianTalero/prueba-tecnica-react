import { PageLayout } from '../layouts/PageLayout'
import { createColumnHelper } from '@tanstack/react-table'
import { ClienteByDate } from '../interfaces/clienteByDate'
import { BiSolidUserCircle } from 'react-icons/bi'
import { DataTable } from '../components/DataTable'
import { DatePicker } from '../components/DatePicker'
import { useGetDataFromApi } from '../hooks/useGetDataFromApi'
import { useCallback, useEffect, useState } from 'react'
import { LoadingScreen } from '../components/LoadingScreen'
import { ClienteChart } from '../components/charts/ClienteChart'
import { ChartSeparator } from '../components/ChartSeparator'
import { ClientesFilter } from '../components/filters/ClientesFilter'

const clientColumnsHelper = createColumnHelper<ClienteByDate>()

const columns = [
  clientColumnsHelper.accessor('Linea', {
    id: 'Linea',
    header: 'Linea',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  clientColumnsHelper.accessor('consumo_residencial', {
    id: 'csResidencial',
    header: 'Residencial',
    cell: info => info.renderValue()?.toFixed(2),
  }),
  clientColumnsHelper.accessor('consumo_comercial', {
    id: 'csComercial',
    header: 'Comercial',
    cell: info => info.renderValue()?.toFixed(2),
    footer: info => info.column.id,
  }),
  clientColumnsHelper.accessor('consumo_industrial', {
    id: 'csIndustrial',
    header: 'Industrial',
    cell: info => info.renderValue()?.toFixed(2),
  }),
  clientColumnsHelper.accessor('perdidas_residencial', {
    id: 'pResidencial',
    header: 'Residencial',
    cell: info => <span className="text-red-500">{info.renderValue()?.toFixed(2)}</span>,
  }),
  clientColumnsHelper.accessor('perdidas_comercial', {
    id: 'pComercial',
    header: 'Comercial',
    cell: info => <span className="text-red-500">{info.renderValue()?.toFixed(2)}</span>,
  }),
  clientColumnsHelper.accessor('perdidas_industrial', {
    id: 'pIndustrial',
    header: 'Industrial',
    cell: info => <span className="text-red-500">{info.renderValue()?.toFixed(2)}</span>,
  }),
  clientColumnsHelper.accessor('costo_residencial', {
    id: 'coResidencial',
    header: 'Residencial',
    cell: info => <span className="text-green-600">{info.renderValue()?.toFixed(2)}</span>,
  }),
  clientColumnsHelper.accessor('costo_comercial', {
    id: 'coComercial',
    header: 'Comercial',
    cell: info => <span className="text-green-600">{info.renderValue()?.toFixed(2)}</span>,
  }),
  clientColumnsHelper.accessor('costo_industrial', {
    id: 'coIndustrial',
    header: 'Industrial',
    cell: info => <span className="text-green-600">{info.renderValue()?.toFixed(2)}</span>,
  }),
]
export default function Cliente() {
  const [clientes, getClientes, isLoading] = useGetDataFromApi<ClienteByDate>('/cliente')
  const [totalClients, setTotalClients] = useState(20)
  const [hasData, setHasData] = useState(false)

  const [filteredClientes, setFilteredClientes] = useState<ClienteByDate[]>([])
  const [isFiltered, setIsFiltered] = useState(false)

  const data = isFiltered ? filteredClientes : clientes

  const onFilterChange = useCallback((tramos: ClienteByDate[]) => {
    setFilteredClientes(tramos)
    setIsFiltered(true)
  }, [])

  useEffect(() => {
    setFilteredClientes(clientes)
  }, [clientes])

  return (
    <PageLayout
      title="Cliente"
      icon={<BiSolidUserCircle />}
      filter={
        <ClientesFilter
          clientes={clientes}
          onFilterChange={onFilterChange}
          onFilterClear={() => setIsFiltered(false)}
        />
      }
    >
      {isLoading ? <LoadingScreen /> : null}

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <DatePicker onDateChange={getClientes} onTotalChange={setTotalClients} />

        <hr className="lg:hidden" />

        <DataTable
          data={data}
          columns={columns}
          total={totalClients}
          onTableHasData={setHasData}
          extraHead={
            <tr>
              <td rowSpan={1}></td>
              <th colSpan={3} scope="colgroup">
                Consumo
              </th>
              <th colSpan={3} scope="colgroup" className="text-red-500">
                Perdidas
              </th>
              <th colSpan={3} scope="colgroup" className="text-green-600">
                Costo
              </th>
            </tr>
          }
        />
      </div>

      {hasData ? (
        <>
          <ChartSeparator />
          <ClienteChart clientes={clientes} />
        </>
      ) : null}
    </PageLayout>
  )
}
