import { useEffect, useState } from 'react'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { EmptyTable } from './EmptyTable'

type Props = {
  data: unknown[]
  columns: unknown[]
  total: number
  extraHead?: JSX.Element
  onTableHasData(status: boolean): void
}

export function DataTable({ data, columns, total, extraHead, onTableHasData }: Props) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns: columns as unknown as ColumnDef<unknown>[],
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  const hasData = data.length > 0

  useEffect(() => {
    // Send event to parent component when data is empty
    onTableHasData(hasData)
  }, [hasData])

  // No show empty table
  if (!hasData) {
    return <EmptyTable />
  }

  return (
    <div className="overflow-x-auto w-full max-h-[24rem]">
      <span className="font-light">*Haz click en los encabezados para organizar columnas</span>

      <table className="table table-pin-rows border-2 dark:border-base-200 dark:bg-base-200">
        <thead className="text-sm">
          {extraHead ? extraHead : null}

          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-secondary/20">
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={header.column.getToggleSortingHandler()}
                      onKeyDown={console.log}
                      className={[
                        header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        'flex',
                        'items-center',
                        'gap-1',
                      ].join(' ')}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <AiOutlineSortAscending className="text-lg text-secondary" />,
                        desc: <AiOutlineSortDescending className="text-lg text-secondary" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, total)
            .map(row => (
              <tr key={row.id} className="font-semibold">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
