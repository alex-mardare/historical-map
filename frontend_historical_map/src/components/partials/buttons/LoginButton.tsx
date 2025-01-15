import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { LOGIN_SECTION } from '../../models/constants/urls'

export default function LoginButton() {
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
