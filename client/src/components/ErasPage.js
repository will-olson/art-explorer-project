import React, { useEffect, useState } from 'react';
import EraCard from './EraCard';

function ErasPage() {
  const [eras, setEras] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/eras')
      .then((res) => res.json())
      .then((data) => setEras(data));
  }, []);

  return (
    <div>
      <h1>Eras</h1>
      <div>
        {eras.map((era) => (
          <EraCard key={era.id} era={era} />
        ))}
      </div>
    </div>
  );
}

export default ErasPage;