import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

// const data: Users[] = [
//   {
//     evaluator_id: 'm5gr84i9',
//     name: 'saad',
//     job_title: 'apple',
//     email: 's',
//     assigned: 0,
//     remaining: 0,
//     graded: 0,
//   },
// ]

type Users = {
  evaluator_id: string
  user_name: string
  name: string
  job_title: string
  email: string
  assigned: number
  remaining_aga: number
  remaining_cga: number
  remaining_cs: number
  graded_aga: number
  graded_cga: number
  graded_cs: number
  assigned_aga: number
  assigned_cga: number
  assigned_cs: number
  // remaining_cs: number
  // remaining_cga: number
  // remaining_aga: number
}

const columns: ColumnDef<Users>[] = [
  {
    accessorKey: 'name',
    // header: 'Name',
    header: ({ column }) => {
      return (
        <div
          className='flex cursor-pointer items-center justify-center  hover:stroke-slate-200'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className='  font-medium capitalize '>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <div
          className='flex cursor-pointer items-center justify-center  hover:stroke-slate-200'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className='  capitalize '>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'job_title',
    header: 'Job Title',
    cell: ({ row }) => (
      <div className='  font-medium capitalize '>
        {row.getValue('job_title')}
      </div>
    ),
  },
  // {
  //   accessorKey: 'assigned',
  //   header: 'Assigned',
  //   cell: ({ row }) => (
  //     <div className='  font-medium capitalize '>
  //       {row.getValue('assigned')}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'graded',
  //   header: 'Graded',
  //   cell: ({ row }) => (
  //     <div className='  font-medium capitalize '>{row.getValue('graded')}</div>
  //   ),
  // },
  {
    accessorKey: 'assigned_cs',
    header: 'Assigned CS',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center'>
        {row.getValue('assigned_cs')}
      </div>
    ),
  },
  {
    accessorKey: 'assigned_cga',
    header: 'Assigned CGA',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center '>
        {row.getValue('assigned_cga')}
      </div>
    ),
  },
  {
    accessorKey: 'assigned_aga',
    header: 'Assigned AGA',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center '>
        {row.getValue('assigned_aga')}
      </div>
    ),
  },
  {
    accessorKey: 'graded_cs',
    header: 'Graded CS',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center'>
        {row.getValue('graded_cs')}
      </div>
    ),
  },
  {
    accessorKey: 'graded_cga',
    header: 'Graded CGA',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center '>
        {row.getValue('graded_cga')}
      </div>
    ),
  },
  {
    accessorKey: 'graded_aga',
    header: 'Graded AGA',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center '>
        {row.getValue('graded_aga')}
      </div>
    ),
  },
  {
    accessorKey: 'remaining_cs',
    header: 'Remaining CS',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center'>
        {row.getValue('remaining_cs')}
      </div>
    ),
  },
  {
    accessorKey: 'remaining_cga',
    header: 'Remaining CGA',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center '>
        {row.getValue('remaining_cga')}
      </div>
    ),
  },
  {
    accessorKey: 'remaining_aga',
    header: 'Remaining AGA',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center '>
        {row.getValue('remaining_aga')}
      </div>
    ),
  },
  // {

  //   header: 'Remaining',
  //   columns: [

  //   ],
  // },
  // {
  //   accessorKey: 'remaining',
  //   header: 'Remaining',
  //   cell: ({ row }) => (
  //     <div className='  font-medium capitalize '>
  //       {row.getValue('remaining')}
  //     </div>
  //   ),
  // },
]

export function UsersTable({ data }: any) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  console.log('Table', data)

  return (
    <div className=' w-full p-5 rounded-md border border-dashed h-full border-green-500 '>
      <Table className=' text-center align-middle '>
        <TableHeader className=' text-center align-middle'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className=''>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 '>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
