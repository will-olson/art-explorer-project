import React, { useEffect, useState } from 'react';
import ArtworkCard from './ArtworkCard';

function ArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [artistId, setArtistId] = useState('');
  const [disciplineId, setDisciplineId] = useState('');
  const [artists, setArtists] = useState([]);
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/artworks')
      .then((res) => res.json())
      .then((data) => setArtworks(data));

    fetch('http://localhost:5555/artists')
      .then((res) => res.json())
      .then((data) => setArtists(data));

    fetch('http://localhost:5555/disciplines')
      .then((res) => res.json())
      .then((data) => setDisciplines(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const artworkData = { title, description, image_file: imageFile, artist_id: artistId, discipline_id: disciplineId };

    try {
      const response = await fetch('http://localhost:5555/artworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artworkData),
      });

      if (response.ok) {
        const updatedArtworks = await fetch('http://localhost:5555/artworks')
          .then((res) => res.json());

        setArtworks(updatedArtworks);
        setTitle('');
        setDescription('');
        setImageFile('');
        setArtistId('');
        setDisciplineId('');
      } else {
        alert('Failed to create artwork');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleThumbsUp = async (artworkId) => {
    try {
      const response = await fetch(`http://localhost:5555/artworks/${artworkId}/like`, {
        method: 'PATCH',
      });

      if (response.ok) {
        const updatedArtworks = await fetch('http://localhost:5555/artworks')
          .then((res) => res.json());

        setArtworks(updatedArtworks);
      } else {
        alert('Failed to add thumbs up');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleThumbsDown = async (artworkId) => {
    try {
      const response = await fetch(`http://localhost:5555/artworks/${artworkId}/dislike`, {
        method: 'PATCH',
      });

      if (response.ok) {
        const updatedArtworks = await fetch('http://localhost:5555/artworks')
          .then((res) => res.json());

        setArtworks(updatedArtworks);
      } else {
        alert('Failed to add thumbs down');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDeleteArtwork = async (artworkId) => {
    try {
      const response = await fetch(`http://localhost:5555/artworks/${artworkId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedArtworks = await fetch('http://localhost:5555/artworks')
          .then((res) => res.json());

        setArtworks(updatedArtworks);
      } else {
        alert('Failed to delete artwork');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="page-container">
      <h1>Artworks</h1>

      <div className="artwork-list">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="artwork-item">
            <ArtworkCard artwork={artwork} />
            <div className="artwork-actions">
              <button onClick={() => handleThumbsUp(artwork.id)}>
                👍 {artwork.like_count || 0}
              </button>
              <button onClick={() => handleThumbsDown(artwork.id)}>
                👎 {artwork.dislike_count || 0}
              </button>
              <button onClick={() => handleDeleteArtwork(artwork.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Image File URL:</label>
          <input
            type="text"
            value={imageFile}
            onChange={(e) => setImageFile(e.target.value)}
            required
          />

          <label>Artist:</label>
          <select value={artistId} onChange={(e) => setArtistId(e.target.value)} required>
            <option value="">Select Artist</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>

          <label>Discipline:</label>
          <select value={disciplineId} onChange={(e) => setDisciplineId(e.target.value)} required>
            <option value="">Select Discipline</option>
            {disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </select>

          <button type="submit">Create Artwork</button>
        </form>
      </div>
    </div>
  );
}

export default ArtworksPage;
