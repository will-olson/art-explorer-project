import React from 'react';

function ArtworkCard({ artwork }) {
  return (
    <div>
      <h2>{artwork.title}</h2>
      <p>{artwork.description}</p>
      {artwork.image_file && <img src={artwork.image_file} alt={artwork.title} />}
    </div>
  );
}

export default ArtworkCard;
