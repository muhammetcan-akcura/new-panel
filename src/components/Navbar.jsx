import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container flex items-center justify-between">
        <div className="brand">
          <h2>fblivepanel</h2>
        </div>
        <nav className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
            Live Stream Views
          </NavLink>
          <NavLink to="/video-views" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
            Video Views
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
