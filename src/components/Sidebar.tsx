import { useAuthStore } from '@/store/useAuthStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'
import { AnalyticsIcon, DashboardIcon } from '@/lib/Icons'
import { useNavigate } from 'react-router-dom'
const Sidebar = () => {
  const { access_token, logout, user } = useAuthStore()

  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div
      className={` ${
        access_token ? 'sticky' : 'hidden'
      } h-screen bg-[#e4ffe7] flex flex-col  pt-8  gap-y-6  items-center`}
    >
      <Avatar className=' border-dashed border-[#018037] border-[3px] w-12 h-12'>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <button
        onClick={() => handleLogout()}
        className='text-[#018037] flex justify-center hover:scale-110 duration-500'
      >
        <LogOut className=' w-9 h-9' />
      </button>
      <button
        onClick={() =>
          user?.role !== 'manager'
            ? navigate('/candidate-dashboard')
            : navigate('/admin-dashboard')
        }
        className=' hover:scale-110 duration-500'
      >
        <DashboardIcon />
      </button>
      <button
        onClick={() => navigate('/analytics')}
        className=' hover:scale-110 duration-500'
      >
        <AnalyticsIcon />
      </button>
    </div>
  )
}

export default Sidebar
