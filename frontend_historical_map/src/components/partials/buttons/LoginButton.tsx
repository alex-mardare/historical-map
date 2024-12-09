import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { LOGIN_SECTION } from '../../models/constants/urls'

const LoginButton: React.FC = () => {
  const navigate = useNavigate()

  const onLoginButtonClick = () => {
    navigate(LOGIN_SECTION)
  }

  return (
    <Button type="primary" onClick={onLoginButtonClick}>
      Login
    </Button>
  )
}

export { LoginButton }
