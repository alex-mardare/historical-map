import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login } from '../utils/hooks/generalHooks'

import '../../assets/styling/login.css'
import useStore from '../../config/globalStore'

export default function Login() {
  const { isAuthenticated } = useStore()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  })

  const onFinish = async () => {
    await login(username, password)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setError('Invalid credentials.')
      })
  }
  return (
    <div className="login-container">
      <Form
        className="login-form"
        initialValues={{ remember: true }}
        name="login"
        onFinish={onFinish}
        style={{ maxWidth: 360 }}
      >
        <h2>Login</h2>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please introduce your username.' }
          ]}
        >
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            prefix={<UserOutlined />}
            value={username}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please introduce your password.' }
          ]}
        >
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            prefix={<LockOutlined />}
            type="password"
            value={password}
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>

        {error && <p>{error}</p>}
      </Form>
    </div>
  )
}
