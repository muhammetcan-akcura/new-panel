import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={<OrdersPage title="Live Stream Views" type="live" />} 
            />
            <Route 
              path="/video-views" 
              element={<OrdersPage title="Video Views" type="video" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
