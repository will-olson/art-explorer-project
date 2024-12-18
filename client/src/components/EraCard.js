import React from 'react';

function EraCard({ era }) {
  return (
    <div className="era-card card">
      <h2 className="card-title">{era.name}</h2>
      <p className="card-content">{era.description}</p>
    </div>
  );
}

export default EraCard;
