import { Progress } from '@/components/ui/progress'
import { RegisterUserDialogButton } from './CreateUser'
import { queryClient } from '@/main'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/useAuthStore'

const AdminHeader = () => {
  const { access_token } = useAuthStore()

  const reassignCandidate = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/reassign`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      const recruiters = await res.json()
      console.log(recruiters)

      if (res.status === 401) {
        return { message: 'Not authenticated' }
      }

      return recruiters
    } catch (error: any) {
      return { message: 'Internal Server Error' }
    }
  }

  const { isFetching, error, refetch } = useQuery({
    enabled: false,
    queryKey: ['reassign-candidate'],
    queryFn: reassignCandidate, // Use the defined function here
  })
  if (error) return <p className=' text-base text-[#69C920]'>Error</p>
  // if (data.message) {
  //   if (data.message === 'Not authenticated')
  //     return (
  //       <p className=' text-base text-[#69C920]'>Login Credentials Invalid</p>
  //     )
  //   return <p className=' text-base text-[#69C920]'>{data.message}</p>
  // }
  // if (data?.detail == 'No Candidate Found') {
  //   return <p className=' text-base text-[#69C920]'> No Application Found</p>
  // }
  console.log(isFetching)

  return (
    <header className=' flex gap-x-10 pr-12 py-3 '>
      <div className='flex w-full  items-center'>
        <div className='flex w-full gap-x-4 items-center justify-end'>
          <RegisterUserDialogButton />

          <button
            disabled={isFetching}
            onClick={() => {
              refetch(),
                setTimeout(() => {
                  queryClient.invalidateQueries({
                    queryKey: ['recruiters-data'],
                  })
                }, 0)
            }}
            className={
              'bg-gradient-to-r  focus:outline-none from-[#6bf4a4] from-0% to-[#34ceff] to-100% text-white text-sm  flex items-center gap-x-2 rounded-sm p-1 px-2 '
            }
          >
            Re-Assign
          </button>
          <Progress value={50} className=' w-96 bg-gray-400 h-2' />
          <span className=' text-[#1ea656] font-semibold text-sm'>05/20</span>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
