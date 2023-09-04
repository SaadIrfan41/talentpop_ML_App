import AdminHeader from '@/components/Dashboard/AdminDashboard/Header/AdminHeader'
import { UsersTable } from '@/components/Dashboard/AdminDashboard/Table/UsersTable'
import { useAuthStore } from '@/store/useAuthStore'
import { Navigate } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useAuthStore()

  if (user?.role !== 'manager') {
    return <Navigate to='/candidate-dashboard' />
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(
    90deg,
    rgba(201, 255, 206, 0.52) 0%,
    rgba(171, 254, 206, 0.09) 33.33%,
    rgba(169, 177, 243, 0.44) 66.67%,
    rgba(158, 0, 255, 0.05) 100%
  )`,
      }}
      className='w-full max-h-screen overflow-hidden'
    >
      <AdminHeader />
      <div className='px-2'>
        <UsersTable />
      </div>
    </div>
  )
}

export default AdminDashboard
