# Art Explorer

## Overview
Art Explorer is a web application designed for art enthusiasts, historians, and researchers. The platform enables users to explore artworks, artists, artistic disciplines, and historical eras. Users can create new entries for artworks, artists, disciplines, and eras. Users can also like, dislike, and delete artworks. This project is built with a Flask back end and a React front end.

## Features

### General Features:
- Explore artworks, artists, disciplines, and eras.
- Create new entries for all entities.

### Artworks:
- Full CRUD functionality.
- Like and dislike artworks.
- Associate artworks with artists and disciplines.

### Artists, Disciplines, and Eras:
- Create and view entries.

## Technology Stack
- **Front End:** React, React Router, Formik, Yup, CSS
- **Back End:** Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-CORS
- **Database:** SQLite

## Installation and Setup

### Prerequisites:
- Python 3.7+
- Node.js and npm
- Flask and related Python libraries

### Backend Setup:
1. Clone the repository.
2. Navigate to the `server` directory.
3. Install dependencies with:
   ```bash
   pip install flask flask-sqlalchemy flask-migrate flask-cors
   ```
4. Initialize the database:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```
5. Run the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup:
1. Navigate to the `client` directory.
2. Install dependencies with:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```

## API Endpoints

### Disciplines:
- **GET** `/disciplines`: Retrieve all disciplines.
- **POST** `/disciplines`: Create a new discipline.
- **GET** `/disciplines/<id>`: Retrieve a single discipline.

### Artworks:
- **GET** `/artworks`: Retrieve all artworks.
- **POST** `/artworks`: Create a new artwork.
- **GET** `/artworks/<id>`: Retrieve a single artwork.
- **DELETE** `/artworks/<id>`: Delete an artwork.
- **PATCH** `/artworks/<id>/like`: Increment the like count of an artwork.
- **PATCH** `/artworks/<id>/dislike`: Increment the dislike count of an artwork.

### Artists:
- **GET** `/artists`: Retrieve all artists.
- **POST** `/artists`: Create a new artist.
- **GET** `/artists/<id>`: Retrieve a single artist.

### Eras:
- **GET** `/eras`: Retrieve all eras.
- **POST** `/eras`: Create a new era.
- **GET** `/eras/<id>`: Retrieve a single era.

## File Structure

### Backend (`server`):
- `app.py`: Core server logic and API routes.
- `models.py`: Database models and relationships.
- `config.py`: Configuration and database initialization.
- `seed.py`: Optional script to seed the database with initial data.

### Frontend (`client`):
- `App.js`: Main application component and routing.
- `Page Components`: Include pages for Artworks, Artists, Disciplines, and Eras. Handles CRUD operations.
- `Card Compnents`: Cards for each resource to ensure appropriate rendering.
- `index.css`: Global styling to inform rendering across resources.

## Usage

### Adding an Artwork:
1. Navigate to the Artworks page.
2. Fill out the form to create an artwork, including title, description, image URL, artist, and discipline.
3. Submit the form to add the artwork.

### Managing Artworks:
- Like or dislike an artwork using the corresponding buttons.
- Delete an artwork by clicking the delete button.

### Exploring Data:
- Browse pages for Artists, Disciplines, and Eras to explore related entries.