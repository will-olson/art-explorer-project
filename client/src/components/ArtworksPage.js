import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArtworkCard from './ArtworkCard';

function ArtworksPage() {
  const [artworks, setArtworks] = useState([]);
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

  const validationSchema = Yup.object({
    title: Yup.string()
      .matches(/^[a-zA-Z0-9\s]+$/, 'Title must only contain letters, numbers, and spaces')
      .required('Title is required'),
    description: Yup.string()
      .required('Description is required'),
    imageFile: Yup.string()
      .url('Image URL must be a valid URL')
      .required('Image file URL is required'),
      artistId: Yup.number()
      .typeError('Artist ID must be a number')
      .required('Artist is required'),
    disciplineId: Yup.number()
      .typeError('Discipline ID must be a number')
      .required('Discipline is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      imageFile: '',
      artistId: '',
      disciplineId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const artworkData = {
        title: values.title,
        description: values.description,
        image_file: values.imageFile,
        artist_id: values.artistId,
        discipline_id: values.disciplineId,
      };

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
          formik.resetForm();
        } else {
          alert('Failed to create artwork');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}

          <label>Description:</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}

          <label>Image File URL:</label>
          <input
            type="text"
            name="imageFile"
            value={formik.values.imageFile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.imageFile && formik.errors.imageFile && (
            <div className="error">{formik.errors.imageFile}</div>
          )}

          <label>Artist:</label>
          <select
            name="artistId"
            value={formik.values.artistId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            <option value="">Select Artist</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
          {formik.touched.artistId && formik.errors.artistId && (
            <div className="error">{formik.errors.artistId}</div>
          )}

          <label>Discipline:</label>
          <select
            name="disciplineId"
            value={formik.values.disciplineId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            <option value="">Select Discipline</option>
            {disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </select>
          {formik.touched.disciplineId && formik.errors.disciplineId && (
            <div className="error">{formik.errors.disciplineId}</div>
          )}

          <button type="submit">Create Artwork</button>
        </form>
      </div>
    </div>
  );
}

export default ArtworksPage;
