import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Country from './pages/Country';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <h2>World Explorer</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/country">Country Explorer</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryCode" element={<Country />} />
      </Routes>
    </Router>
  );
}

export default App;
