import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { EVENTS_LIST_URL } from './components/config/constants/urls';
import { menuItems } from './components/config/elements/menuItems';
import EventsList from './components/events/EventsList';
import { useFetchEvents } from './components/hooks/useFetchEvents';
import Home from './components/pages/Home';

import './App.css'; 
import EventsDetails from './components/events/EventDetails';


const { Content, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const events = useFetchEvents();

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
              <Route element={<EventsList {...{events}} />} path={EVENTS_LIST_URL} />
              <Route element={<EventsDetails {...{}}/>} path={EVENTS_LIST_URL + "/:eventId"} />
            </Routes>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
