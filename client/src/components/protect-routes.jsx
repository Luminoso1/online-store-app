import { Navigate } from 'react-router-dom'
import useAuth from '../store/auth'
import { Outlet } from 'react-router-dom'

function ProtectedRoute({ role }) {

  const { isAuth, user } = useAuth()

  if (!isAuth) {
    return <Navigate to='/login' replace />
  }

  if (!role.includes(user.role)) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
