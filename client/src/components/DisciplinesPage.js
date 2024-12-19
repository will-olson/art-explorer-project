import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DisciplineCard from './DisciplineCard';

function DisciplinesPage() {
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/disciplines')
      .then((res) => res.json())
      .then((data) => setDisciplines(data));
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
      const disciplineData = { 
        name: values.name, 
        description: values.description 
      };

      try {
        const response = await fetch('http://localhost:5555/disciplines', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(disciplineData),
        });

        if (response.ok) {
          const updatedDisciplines = await fetch('http://localhost:5555/disciplines')
            .then((res) => res.json());
          setDisciplines(updatedDisciplines);
          formik.resetForm();
        } else {
          alert('Failed to create discipline');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    },
  });

  return (
    <div className="page-container">
      <h1>Disciplines</h1>

      <div className="discipline-list">
        {disciplines.map((discipline) => (
          <DisciplineCard key={discipline.id} discipline={discipline} />
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

          <button type="submit">Create Discipline</button>
        </form>
      </div>
    </div>
  );
}

export default DisciplinesPage;
