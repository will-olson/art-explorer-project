import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EraCard from './EraCard';

function ErasPage() {
  const [eras, setEras] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/eras')
      .then((res) => res.json())
      .then((data) => setEras(data));
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, 'Name must only contain letters and spaces')
      .required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const eraData = { 
        name: values.name, 
        description: values.description
      };

      try {
        const response = await fetch('http://localhost:5555/eras', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eraData),
        });

        if (response.ok) {
          const updatedEras = await fetch('http://localhost:5555/eras')
            .then((res) => res.json());
          setEras(updatedEras);
          formik.resetForm();
        } else {
          alert('Failed to create era');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    },
  });

  return (
    <div className="page-container">
      <h1>Eras</h1>

      <div className="era-list">
        {eras.map((era) => (
          <EraCard key={era.id} era={era} />
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

          <button type="submit">Create Era</button>
        </form>
      </div>
    </div>
  );
}

export default ErasPage;
