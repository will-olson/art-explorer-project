import React, { useEffect, useState } from 'react';
import EraCard from './EraCard';

function ErasPage() {
  const [eras, setEras] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch the existing eras
    fetch('http://localhost:5555/eras')
      .then((res) => res.json())
      .then((data) => setEras(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eraData = { name, description };

    try {
      const response = await fetch('http://localhost:5555/eras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eraData),
      });

      if (response.ok) {
        alert('Era created successfully');
        const newEra = await response.json();
        setEras((prevEras) => [...prevEras, newEra]);
      } else {
        alert('Failed to create era');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="page-container">
      <h1>Eras</h1>

      {/* List of Eras */}
      <div className="era-list">
        {eras.map((era) => (
          <EraCard key={era.id} era={era} />
        ))}
      </div>

      {/* Era Creation Form */}
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

          <button type="submit">Create Era</button>
        </form>
      </div>
    </div>
  );
}

export default ErasPage;