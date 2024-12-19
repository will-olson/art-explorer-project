import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArtistCard from './ArtistCard';

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [eras, setEras] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/artists')
      .then((res) => res.json())
      .then((data) => setArtists(data));

    fetch('http://localhost:5555/eras')
      .then((res) => res.json())
      .then((data) => setEras(data));
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, 'Name must only contain letters and spaces')
      .required('Name is required'),
    biography: Yup.string().required('Biography is required'),
    eraId: Yup.string()
      .matches(/^\d+$/, 'Era ID must be a valid number')
      .required('Era is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      biography: '',
      eraId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const artistData = { 
        name: values.name, 
        biography: values.biography, 
        era_id: values.eraId 
      };

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

          formik.resetForm();
        } else {
          alert('Failed to create artist');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    },
  });

  return (
    <div className="page-container">
      <h1>Artists</h1>

      <div className="artist-list">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>

      <div className="form-section">
        <form onSubmit={formik.handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}

          <label>Biography:</label>
          <textarea
            name="biography"
            value={formik.values.biography}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.biography && formik.errors.biography && (
            <div className="error">{formik.errors.biography}</div>
          )}

          <label>Era:</label>
          <select
            name="eraId"
            value={formik.values.eraId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            <option value="">Select Era</option>
            {eras.map((era) => (
              <option key={era.id} value={era.id}>
                {era.name}
              </option>
            ))}
          </select>
          {formik.touched.eraId && formik.errors.eraId && (
            <div className="error">{formik.errors.eraId}</div>
          )}

          <button type="submit">Create Artist</button>
        </form>
      </div>
    </div>
  );
}

export default ArtistsPage;
