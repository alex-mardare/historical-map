import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { EVENTS_LIST_AREA, FIGURES_LIST_AREA } from './components/models/constants/urls';
import { menuItems } from './components/config/menu/menuConfig';
import EventDetails from './components/pages/events/EventDetails';
import EventsList from './components/pages/events/EventsList';
import FiguresList from './components/pages/figures/FiguresList';
import { useFetchEvents } from './components/utils/hooks/eventsHooks';
import Home from './components/pages/Home';

import './App.css'; 


const { Content, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { events, refreshFunction } = useFetchEvents();

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
              <Route element={<EventsList events={events} onRefreshEvents={refreshFunction} />} path={EVENTS_LIST_AREA} />
              <Route element={<EventDetails />} path={EVENTS_LIST_AREA + "/:eventId"} />
              <Route element={<FiguresList />} path={FIGURES_LIST_AREA} />
            </Routes>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
