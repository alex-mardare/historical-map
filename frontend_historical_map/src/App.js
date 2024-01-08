import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { menuItems } from './components/config/menu/menuConfig';
import { HISTORICAL_EVENTS_SECTION, HISTORICAL_FIGURES_SECTION } from './components/models/constants/urls';
import Home from './components/pages/Home';
import EventDetails from './components/pages/events/EventDetails';
import EventsList from './components/pages/events/EventsList';
import FigureDetails from './components/pages/figures/FigureDetails';
import FiguresList from './components/pages/figures/FiguresList';
import { useEventsGet } from './components/utils/hooks/eventsHooks';

import './App.css'; 


const { Content, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(205);

  const { events, refreshFunction } = useEventsGet();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);

    if (!collapsed) {
      setWidth(width);
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
            <Menu defaultSelectedKeys={['1']} items={menuItems} mode="inline" theme='dark' />
          </Sider>
          <Content>
            <Routes>
              <Route element={<Home {...{events}} />} path="/" />
              <Route element={<EventsList events={events} onRefreshEvents={refreshFunction} />} path={HISTORICAL_EVENTS_SECTION} />
              <Route element={<EventDetails />} path={HISTORICAL_EVENTS_SECTION + "/:eventId"} />
              <Route element={<FiguresList />} path={HISTORICAL_FIGURES_SECTION} />
              <Route element={<FigureDetails />} path={HISTORICAL_FIGURES_SECTION + "/:figureId"}  />
            </Routes>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
