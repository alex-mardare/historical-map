import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { CREATE_URL, EVENTS_LIST_URL } from './components/models/constants/urls';
import { menuItems } from './components/config/menu/menuConfig';
import EventsList from './components/pages/events/EventsList';
import { useFetchEvents } from './components/utils/hooks/useFetchEvents';
import Home from './components/pages/Home';

import './App.css'; 
import EventsDetails from './components/pages/events/EventDetails';
import EventCreateForm from './components/pages/events/EventCreateForm';


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
              <Route element={<EventCreateForm />} path={EVENTS_LIST_URL + CREATE_URL} />
            </Routes>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
