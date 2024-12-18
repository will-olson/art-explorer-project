import React, { useEffect, useState } from 'react';
import DisciplineCard from './DisciplineCard';

function DisciplinesPage() {
  const [disciplines, setDisciplines] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:5555/disciplines')
      .then((res) => res.json())
      .then((data) => setDisciplines(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const disciplineData = { name, description };

    try {
      const response = await fetch('http://localhost:5555/disciplines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(disciplineData),
      });

      if (response.ok) {
        alert('Discipline created successfully');
        const newDiscipline = await response.json();
        setDisciplines((prevDisciplines) => [...prevDisciplines, newDiscipline]);
      } else {
        alert('Failed to create discipline');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="page-container">
      <h1>Disciplines</h1>

      <div className="discipline-list">
        {disciplines.map((discipline) => (
          <DisciplineCard key={discipline.id} discipline={discipline} />
        ))}
      </div>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button type="submit">Create Discipline</button>
        </form>
      </div>
    </div>
  );
}

export default DisciplinesPage;
