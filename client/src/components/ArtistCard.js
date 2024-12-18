import React from 'react';

function ArtistCard({ artist }) {
  return (
    <div>
      <h2>{artist.name}</h2>
      <p>{artist.biography}</p>
      <p>Era: {artist.era ? artist.era.name : 'Unknown'}</p>
    </div>
  );
}

export default ArtistCard;