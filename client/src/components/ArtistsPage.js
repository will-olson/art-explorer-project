import React, { useEffect, useState } from 'react';
import ArtistCard from './ArtistCard';

function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/artists')
      .then((res) => res.json())
      .then((data) => setArtists(data));
  }, []);

  return (
    <div>
      <h1>Artists</h1>
      <div>
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default ArtistsPage;
