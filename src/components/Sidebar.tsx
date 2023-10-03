import { useAuthStore } from '@/store/useAuthStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'
import { AnalyticsIcon } from '@/lib/Icons'
import { useNavigate } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useQuestionResultStore } from '@/store/useQuestionResultStore'
const Sidebar = () => {
  const { access_token, logout, user } = useAuthStore()
  const { setCandidateId_AGA, setCandidateId_CGA, setCandidateId_CS } =
    useQuestionResultStore()

  const navigate = useNavigate()
  const handleLogout = () => {
    setCandidateId_CS(null),
      setCandidateId_CGA(null),
      setCandidateId_AGA(null),
      logout()
    navigate('/login')
  }
  return (
    <div
      className={` ${access_token ? 'sticky' : 'hidden'} ${
        user?.role !== 'manager' ? 'h-screen' : 'h-auto'
      }  bg-[#e4ffe7] flex  w-min  items-start pt-5 `}
    >
      <div className='border-2 border-green-500 border-dashed rounded-full flex flex-col gap-y-4 items-center py-7 mx-2'>
        <Avatar className=' border-dashed border-[#018037] border-[3px] w-12 h-12'>
          <AvatarImage
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.user_name}&scale=160&radius=50`}
            alt='AVATAR'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <button
          onClick={() =>
            user?.role !== 'manager'
              ? navigate('/candidate-dashboard/CS')
              : navigate('/admin-dashboard')
          }
          className=' hover:scale-110 duration-500 rounded-full border-dashed border-[#018037] border-[3px] w-12 h-12'
        >
          CS
        </button>
        <button
          onClick={() =>
            user?.role !== 'manager'
              ? navigate('/candidate-dashboard/AGA')
              : navigate('/admin-dashboard')
          }
          className='  hover:scale-110 duration-500 rounded-full border-dashed border-[#018037] border-[3px] w-12 h-12'
        >
          AGA
        </button>
        <button
          onClick={() =>
            user?.role !== 'manager'
              ? navigate('/candidate-dashboard/CGA')
              : navigate('/admin-dashboard')
          }
          className='  hover:scale-110 duration-500 rounded-full border-dashed border-[#018037] border-[3px] w-12 h-12'
        >
          CGA
        </button>
        <button
          onClick={() => navigate('/analytics')}
          className=' hover:scale-110 duration-500'
        >
          <AnalyticsIcon />
        </button>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => handleLogout()}
                className='text-[#018037] flex justify-center hover:scale-110 duration-500'
              >
                <LogOut className=' w-9 h-9' />
              </button>
            </TooltipTrigger>
            <TooltipContent className=' bg-red-400 text-white'>
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default Sidebar
