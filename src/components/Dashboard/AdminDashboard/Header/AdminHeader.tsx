import { Progress } from '@/components/ui/progress'
import { RegisterUserDialogButton } from './CreateUser'
import { queryClient } from '@/main'

const AdminHeader = () => {
  return (
    <header className=' flex gap-x-10 pr-12 py-3 '>
      <div className='flex w-full  items-center'>
        <div className='flex w-full gap-x-4 items-center justify-end'>
          <RegisterUserDialogButton />

          <button
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ['recruiters-data'],
              })
            }
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
