import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { LOGIN_ENDPOINT } from '../../models/constants/urls'
import { logout } from '../../utils/hooks/generalHooks'

export default function LogoutButton() {
  const navigate = useNavigate()

  const onHandleLogout = () => {
    logout()
    navigate(LOGIN_ENDPOINT)
  }

  return <Button onClick={onHandleLogout}>Logout</Button>
}
