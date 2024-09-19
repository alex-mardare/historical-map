import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginButton: React.FC = () => {
  const navigate = useNavigate()

  const onLoginButtonClick = () => {
    navigate('/login')
  }

  return (
    <Button type="primary" onClick={onLoginButtonClick}>
      Login
    </Button>
  )
}

export { LoginButton }
