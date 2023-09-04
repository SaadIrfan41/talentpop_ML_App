import { Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'

const HomePage = () => {
  const { user } = useAuthStore()

  return user?.role === 'manager' ? (
    <Navigate to='/admin-dashboard' />
  ) : (
    <Navigate to='/candidate-dashboard' />
  )
}

export default HomePage
