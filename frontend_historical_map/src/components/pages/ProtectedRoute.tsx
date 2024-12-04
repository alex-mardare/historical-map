import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { checkAuth } from '../../config/auth'
import useStore from '../../config/globalStore'
import { LOGIN_ENDPOINT } from '../models/constants/urls'

type ProtectedRouteProps = {
  isAuthenticated: boolean
}

function ProtectedRoute(props: ProtectedRouteProps): any {
  const { setIsAuthenticated } = useStore()

  useEffect(() => {
    const verifyAuth = async () => {
      if (!props.isAuthenticated) {
        setIsAuthenticated(await checkAuth())
      }
    }
    verifyAuth()
  })

  return props.isAuthenticated ? <Outlet /> : <Navigate to={LOGIN_ENDPOINT} />
}

export default ProtectedRoute
