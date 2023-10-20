import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { UsersTable } from './Table/UsersTable'
import EvaluatorChart from './Chart/Index'

const AdminDashboardUsers = () => {
  const { access_token } = useAuthStore()

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
      <UsersTable data={data} />
      <EvaluatorChart data={data} />
    </div>
  )
}

export default AdminDashboardUsers
