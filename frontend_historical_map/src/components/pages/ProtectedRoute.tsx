import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { checkAuth } from '../../config/auth'
import useStore from '../../config/globalStore'
import { LOGIN_SECTION } from '../models/constants/urls'

type propType = {
  isAuthenticated: boolean
}

function ProtectedRoute({ isAuthenticated }: propType): any {
  const { setIsAuthenticated } = useStore()

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        setIsAuthenticated(await checkAuth())
      }
    }
    verifyAuth()
  })

  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN_SECTION} />
}

export default ProtectedRoute
