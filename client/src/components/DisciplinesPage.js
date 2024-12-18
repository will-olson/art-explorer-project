import React, { useEffect, useState } from 'react';
import DisciplineCard from './DisciplineCard';

function DisciplinesPage() {
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/disciplines')
      .then((res) => res.json())
      .then((data) => setDisciplines(data));
  }, []);

  return (
    <div>
      <h1>Disciplines</h1>
      <div>
        {disciplines.map((discipline) => (
          <DisciplineCard key={discipline.id} discipline={discipline} />
        ))}
      </div>
    </div>
  );
}

export default DisciplinesPage;
