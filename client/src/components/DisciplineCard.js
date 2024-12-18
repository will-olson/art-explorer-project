import React from 'react';

function DisciplineCard({ discipline }) {
  return (
    <div className="discipline-card card">
      <h2 className="card-title">{discipline.name}</h2>
    </div>
  );
}

export default DisciplineCard;
