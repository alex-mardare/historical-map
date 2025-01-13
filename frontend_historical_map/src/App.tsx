import { Layout, Menu, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {
  menuItemsLoggedIn,
  menuItemsNoAccount,
  rootMenuKeys
} from './components/config/menu/menuConfig'
import {
  EVENT_CATEGORIES_SECTION,
  HISTORICAL_EVENTS_SECTION,
  HISTORICAL_FIGURES_SECTION,
  HISTORICAL_FIGURE_ROLES_SECTION,
  HISTORICAL_STATES_SECTION,
  LOGIN_ENDPOINT,
  PRESENT_COUNTRIES_SECTION
} from './components/models/constants/urls'
import EventCategoriesList from './components/pages/event-categories/EventCategoriesList'
import EventDetails from './components/pages/events/EventDetails'
import EventsList from './components/pages/events/EventsList'
import FigureRolesList from './components/pages/figure-roles/FigureRolesList'
import FigureDetails from './components/pages/figures/FigureDetails'
import FiguresList from './components/pages/figures/FiguresList'
import HistoricalStateDetails from './components/pages/historical-states/HistoricalStateDetails'
import HistoricalStatesList from './components/pages/historical-states/HistoricalStatesList'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import PresentCountriesList from './components/pages/present-countries/PresentCountriesList'
import PresentCountryDetails from './components/pages/present-countries/PresentCountryDetails'
import ProtectedRoute from './components/pages/ProtectedRoute'
import Spinner from './components/pages/Spinner'
import { LoginButton } from './components/partials/buttons/LoginButton'
import UserProfileDropdown from './components/partials/dropdowns/UserProfileDropdown'
import { initialiseAuth } from './config/auth'
import useStore from './config/globalStore'

import '../src/assets/styling/App.css'

const { Content, Header, Sider } = Layout

function App() {
  const { isAuthenticated, lastMenuKey, setIsAuthenticated, setLastMenuKey } =
    useStore()

  const [collapsed, setCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [openKeys, setOpenKeys] = useState(['0'])

  useEffect(() => {
    const initAuth = async () => {
      await initialiseAuth(setIsAuthenticated, setIsLoading)
    }
    initAuth()
  }, [setIsAuthenticated])

  const onMenuItemClick: MenuProps['onClick'] = (e) => {
    if (isAuthenticated) {
      setLastMenuKey(e.key)
    }
  }
  const onOpenChangeMenu: MenuProps['onOpenChange'] = (menuKeys) => {
    const latestOpenKey = menuKeys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootMenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(menuKeys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <Router>
      <div className="App">
        <Layout>
          <Header className="navbar">
            <div className="navbar-right">
              {!isAuthenticated ? <LoginButton /> : <UserProfileDropdown />}
            </div>
          </Header>
          <Sider
            collapsible
            collapsed={collapsed}
            collapsedWidth={100}
            onCollapse={() => setCollapsed(!collapsed)}
            width={230}
          >
            <Menu
              defaultSelectedKeys={isAuthenticated ? ['1'] : []}
              items={isAuthenticated ? menuItemsLoggedIn : menuItemsNoAccount}
              mode="inline"
              onClick={onMenuItemClick}
              onOpenChange={onOpenChangeMenu}
              openKeys={openKeys}
              selectedKeys={[lastMenuKey]}
              theme="dark"
            />
          </Sider>
          <Content>
            {isLoading && <Spinner />}
            <Routes>
              <Route element={<Login />} path={LOGIN_ENDPOINT} />
              <Route
                element={<EventsList />}
                path={HISTORICAL_EVENTS_SECTION}
              />

              <Route element={<ProtectedRoute {...{ isAuthenticated }} />}>
                <Route element={<Home />} path="/" />
                <Route
                  element={<EventCategoriesList />}
                  path={EVENT_CATEGORIES_SECTION}
                />
                <Route
                  element={<EventDetails />}
                  path={HISTORICAL_EVENTS_SECTION + '/:eventId'}
                />
                <Route
                  element={<FigureRolesList />}
                  path={HISTORICAL_FIGURE_ROLES_SECTION}
                />
                <Route
                  element={<FiguresList />}
                  path={HISTORICAL_FIGURES_SECTION}
                />
                <Route
                  element={<FigureDetails />}
                  path={HISTORICAL_FIGURES_SECTION + '/:figureId'}
                />
                <Route
                  element={<HistoricalStatesList />}
                  path={HISTORICAL_STATES_SECTION}
                />
                <Route
                  element={<HistoricalStateDetails />}
                  path={HISTORICAL_STATES_SECTION + '/:historicalStateId'}
                />
                <Route
                  element={<PresentCountriesList />}
                  path={PRESENT_COUNTRIES_SECTION}
                />
                <Route
                  element={<PresentCountryDetails />}
                  path={PRESENT_COUNTRIES_SECTION + '/:presentCountryId'}
                />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </div>
    </Router>
  )
}

export default App
