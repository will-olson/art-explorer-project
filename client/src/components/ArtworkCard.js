import React from 'react';

function ArtworkCard({ artwork }) {
  return (
    <div className="card">
      <h2 className="card-title">{artwork.title}</h2>
      <p className="card-content">{artwork.description}</p>
      {artwork.image_file && <img src={artwork.image_file} alt={artwork.title} className="card-img" />}
    </div>
  );
}

export default ArtworkCard;