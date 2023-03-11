import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import EventsList from './components/events/EventsList';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<EventsList />} path="/events-list" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
