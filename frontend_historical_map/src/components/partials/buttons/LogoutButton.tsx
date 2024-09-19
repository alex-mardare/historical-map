import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../utils/hooks/generalHooks'

export default function LogoutButton() {
  const navigate = useNavigate()

  const onHandleLogout = () => {
    logout()
    navigate('/login')
  }

  return <Button onClick={onHandleLogout}>Logout</Button>
}
