import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

import { LOGIN_SECTION } from '../../models/constants/urls'
import { logout } from '../../utils/hooks/generalHooks'

export default function UserProfileDropdown() {
  const navigate = useNavigate()

  const onLogoutClick = () => {
    logout()
    navigate(LOGIN_SECTION)
  }

  const menuItemsUserProfile = {
    items: [
      {
        key: '1',
        label: 'Logout',
        onClick: onLogoutClick
      }
    ]
  }

  return (
    <Dropdown menu={menuItemsUserProfile} placement="bottomRight">
      <div className="user-profile">
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </Dropdown>
  )
}
