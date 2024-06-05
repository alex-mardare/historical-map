import { Layout, Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { menuItems, rootMenuKeys } from './components/config/menu/menuConfig'
import { HISTORICAL_EVENTS_SECTION, HISTORICAL_FIGURES_SECTION, HISTORICAL_STATES_SECTION } from './components/models/constants/urls'
import Home from './components/pages/Home'
import EventDetails from './components/pages/events/EventDetails'
import EventsList from './components/pages/events/EventsList'
import FigureDetails from './components/pages/figures/FigureDetails'
import FiguresList from './components/pages/figures/FiguresList'
import HistoricalStateDetails from './components/pages/historical-states/HistoricalStateDetails'
import HistoricalStatesList from './components/pages/historical-states/HistoricalStatesList'
import { useGetEvents } from './components/utils/hooks/eventsHooks'

import './App.css' 


const { Content, Sider } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [openKeys, setOpenKeys] = useState(['0'])
  const [width, setWidth] = useState(205)

  const { events, refreshFunction } = useGetEvents()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)

    if (!collapsed) {
      setWidth(width)
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
          <Sider
            collapsible 
            collapsed={collapsed} 
            onCollapse={toggleCollapsed} 
            width={width}
          >
            <Menu 
              defaultSelectedKeys={['1']} 
              items={menuItems} 
              mode="inline" 
              openKeys={openKeys}
              onOpenChange={onOpenChangeMenu} 
              theme='dark' 
              />
          </Sider>
          <Content>
            <Routes>
              <Route element={<Home {...{events}} />} path="/" />
              <Route element={<EventsList events={events} onRefreshEvents={refreshFunction} />} path={HISTORICAL_EVENTS_SECTION} />
              <Route element={<EventDetails />} path={HISTORICAL_EVENTS_SECTION + "/:eventId"} />
              <Route element={<FiguresList />} path={HISTORICAL_FIGURES_SECTION} />
              <Route element={<FigureDetails />} path={HISTORICAL_FIGURES_SECTION + "/:figureId"}  />
              <Route element={<HistoricalStatesList />} path={HISTORICAL_STATES_SECTION} />
              <Route element={<HistoricalStateDetails />} path={HISTORICAL_STATES_SECTION + "/:historicalStateId"} />
            </Routes>
          </Content>
        </Layout>
      </div>
    </Router>
  )
}

export default App
