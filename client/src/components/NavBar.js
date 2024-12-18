import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/artists" className="navbar-link">Artists</Link></li>
        <li><Link to="/artworks" className="navbar-link">Artworks</Link></li>
        <li><Link to="/eras" className="navbar-link">Eras</Link></li>
        <li><Link to="/disciplines" className="navbar-link">Disciplines</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
