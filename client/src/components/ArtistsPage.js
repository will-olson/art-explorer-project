import React, { useEffect, useState } from 'react';
import ArtistCard from './ArtistCard';

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [eraId, setEraId] = useState('');
  const [eras, setEras] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/artists')
      .then((res) => res.json())
      .then((data) => setArtists(data));

    fetch('http://localhost:5555/eras')
      .then((res) => res.json())
      .then((data) => setEras(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const artistData = { name, biography, era_id: eraId };

    try {
      const response = await fetch('http://localhost:5555/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artistData),
      });

      if (response.ok) {
        const updatedArtists = await fetch('http://localhost:5555/artists')
          .then((res) => res.json());

        setArtists(updatedArtists);
      } else {
        alert('Failed to create artist');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="page-container">
      <h1>Artists</h1>

      <div className="artist-list">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
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
          
          <label>Biography:</label>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
          />
          
          <label>Era:</label>
          <select value={eraId} onChange={(e) => setEraId(e.target.value)} required>
            <option value="">Select Era</option>
            {eras.map((era) => (
              <option key={era.id} value={era.id}>
                {era.name}
              </option>
            ))}
          </select>

          <button type="submit">Create Artist</button>
        </form>
      </div>
    </div>
  );
}

export default ArtistsPage;
