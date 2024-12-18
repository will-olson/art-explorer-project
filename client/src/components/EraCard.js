import React from 'react';

function EraCard({ era }) {
  return (
    <div>
      <h2>{era.name}</h2>
      <p>{era.description}</p>
    </div>
  );
}

export default EraCard;
