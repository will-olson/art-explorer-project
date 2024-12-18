import React from 'react';

function ArtistCard({ artist }) {
  return (
    <div className="card">
      <h2 className="card-title">{artist.name}</h2>
      <p className="card-content">{artist.biography}</p>
      <p className="card-content">
        Era: {artist.era ? artist.era.name : 'Unknown'}
      </p>
    </div>
  );
}

export default ArtistCard;