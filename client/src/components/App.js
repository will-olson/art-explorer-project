import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import ArtistsPage from './ArtistsPage';
import ArtworksPage from './ArtworksPage';
import ErasPage from './ErasPage';
import DisciplinesPage from './DisciplinesPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artworks" element={<ArtworksPage />} />
        <Route path="/eras" element={<ErasPage />} />
        <Route path="/disciplines" element={<DisciplinesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
