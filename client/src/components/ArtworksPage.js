import React, { useEffect, useState } from 'react';
import ArtworkCard from './ArtworkCard';

function ArtworksPage() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/artworks')
      .then((res) => res.json())
      .then((data) => setArtworks(data));
  }, []);

  return (
    <div>
      <h1>Artworks</h1>
      <div>
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}

export default ArtworksPage;
