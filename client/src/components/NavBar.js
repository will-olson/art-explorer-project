import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/artists">Artists</Link></li>
        <li><Link to="/artworks">Artworks</Link></li>
        <li><Link to="/eras">Eras</Link></li>
        <li><Link to="/disciplines">Disciplines</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
