import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { menuItems } from './components/config/menu/menuConfig';
import { HISTORICAL_EVENTS_ENDPOINT, HISTORICAL_FIGURES_ENDPOINT } from './components/models/constants/urls';
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
  const { events, refreshFunction } = useEventsGet();

  return (
    <Router>
      <div className="App">
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu defaultSelectedKeys={['1']} items={menuItems} mode="inline" theme='dark' />
          </Sider>
          <Content>
            <Routes>
              <Route element={<Home {...{events}} />} path="/" />
              <Route element={<EventsList events={events} onRefreshEvents={refreshFunction} />} path={HISTORICAL_EVENTS_ENDPOINT} />
              <Route element={<EventDetails />} path={HISTORICAL_EVENTS_ENDPOINT + ":eventId"} />
              <Route element={<FiguresList />} path={HISTORICAL_FIGURES_ENDPOINT} />
              <Route element={<FigureDetails />} path={HISTORICAL_FIGURES_ENDPOINT + ":figureId"}  />
            </Routes>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
