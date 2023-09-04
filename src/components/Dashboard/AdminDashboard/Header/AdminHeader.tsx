import { Progress } from '@/components/ui/progress'
import { RegisterUserDialogButton } from './CreateUser'

const AdminHeader = () => {
  return (
    <header className=' flex gap-x-10 pr-12 py-1 '>
      <div className='flex w-full  items-center'>
        <div className='flex w-full gap-x-4 items-center justify-end'>
          <RegisterUserDialogButton />
          {/* <DropdownMenu>
            <DropdownMenuTrigger
              className={
                'bg-gradient-to-r  focus:outline-none from-[#8800f3] from-0% to-red-500 to-100% text-white text-sm  flex items-center gap-x-2 rounded-sm p-1 px-2 '
              }
            >
              <ChevronDown className='w-4 h-4' />
              Failed
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className=' text-sm'>
                Reason for Failing
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {failingReasons.map((reason, index) => (
                <DropdownMenuItem
                  onClick={() => checkManualQuestionGrading()}
                  className=' cursor-pointer'
                  key={index}
                >
                  {reason}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
          <button
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
      {/* <div className=' flex items-center'>
        <button
          onClick={() => {
            setPrevApplicant(),
              setTimeout(() => {
                refetch()
              }, 0)
          }}
        >
          <ChevronsLeft className=' w-8 h-8 text-red-500' />
        </button>
        <SheetIcon />
        <button
          onClick={() => {
            setNextApplicant(),
              setTimeout(() => {
                refetch()
              }, 0)
          }}
        >
          <ChevronsRight className=' w-8 h-8 text-purple-500' />
        </button>
      </div> */}
    </header>
  )
}

export default AdminHeader
