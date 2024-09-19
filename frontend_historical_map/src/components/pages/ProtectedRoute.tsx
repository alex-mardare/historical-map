import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import useStore from '../../config/globalStore'

function ProtectedRoute(): any {
  const { isAuthenticated } = useStore()

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
