import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/useAuthStore'
import EvaluatorChart from '../Chart/Index'

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
  name: string
  job_title: string
  email: string
  assigned: number
  remaining: number
  graded: number
  // remaining_cs: number
  // remaining_cga: number
  // remaining_aga: number
}

const columns: ColumnDef<Users>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
  {
    accessorKey: 'assigned',
    header: 'Assigned',
    cell: ({ row }) => (
      <div className='  font-medium capitalize '>
        {row.getValue('assigned')}
      </div>
    ),
  },
  {
    accessorKey: 'graded',
    header: 'Graded',
    cell: ({ row }) => (
      <div className='  font-medium capitalize '>{row.getValue('graded')}</div>
    ),
  },
  {
    accessorKey: 'remaining_cs',
    header: 'Remaining CS',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center'>
        {row.getValue('remaining')}
      </div>
    ),
  },
  {
    accessorKey: 'remaining_cga',
    header: 'Remaining CGA',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center '>
        {row.getValue('remaining')}
      </div>
    ),
  },
  {
    accessorKey: 'remaining',
    header: 'Remaining AGA',
    cell: ({ row }) => (
      <div className='  font-medium capitalize text-center '>
        {row.getValue('remaining')}
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

export function UsersTable() {
  const { access_token } = useAuthStore()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['recruiters-data'],
    queryFn: () => getUsersData(),
  })

  const getUsersData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/users`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      const recruiters = await res.json()

      if (res.status === 401) {
        return { message: 'Not authenticated' }
      }
      return recruiters
    } catch (error: any) {
      return { message: 'Internal Server Error' }
    }
  }

  const table = useReactTable({
    data,
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
  if (isLoading || isFetching)
    return (
      <div className='grid place-items-center h-screen w-full bg-gray-200'>
        LOADING...
      </div>
    )

  if (error) return <p className=' text-base text-[#69C920]'>Error</p>
  if (data.message) {
    if (data.message === 'Not authenticated')
      return (
        <p className=' text-base text-[#69C920]'>Login Credentials Invalid</p>
      )
    return <p className=' text-base text-[#69C920]'>{data.message}</p>
  }
  if (data?.detail == 'No Candidate Found') {
    return <p className=' text-base text-[#69C920]'> No Application Found</p>
  }

  return (
    <div className='flex flex-col gap-y-5'>
      <div className=' w-full p-5 rounded-md border border-dashed border-green-500 '>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      <EvaluatorChart data={data} />
    </div>
  )
}
