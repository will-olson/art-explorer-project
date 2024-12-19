import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [eras, setEras] = useState([]);
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/artists')
      .then(response => response.json())
      .then(data => setArtists(data))
      .catch(error => console.error('Error fetching artists:', error));

    fetch('http://localhost:5555/artworks')
      .then(response => response.json())
      .then(data => setArtworks(data))
      .catch(error => console.error('Error fetching artworks:', error));

    fetch('http://localhost:5555/eras')
      .then(response => response.json())
      .then(data => setEras(data))
      .catch(error => console.error('Error fetching eras:', error));

    fetch('http://localhost:5555/disciplines')
      .then(response => response.json())
      .then(data => setDisciplines(data))
      .catch(error => console.error('Error fetching disciplines:', error));
  }, []);

  return (
    <div className="container">
      <header className="homepage-header">
        <h1>Welcome to Art Explorer</h1>
        <p>Discover the world of art, artists, eras, and disciplines!</p>
      </header>

      <section className="homepage-section">
        <h2 className="section-heading">Site Overview</h2>
        <p className="section-content">
          Art Explorer allows you to explore various artists, their artworks, artistic eras, and disciplines. Dive deep into the world of art and discover the stories behind famous pieces and their creators.
        </p>
      </section>

      <section className="homepage-section">
        <h2 className="section-heading">Explore</h2>

        <div className="homepage-explore">
          <div className="homepage-explore-category">
            <h3 className="category-heading">Artists</h3>
            <p className="category-description">
              Learn about famous artists, their biographies, and their contributions to the world of art.
            </p>
            <ul className="category-list">
              {artists.slice(0, 3).map(artist => (
                <li key={artist.id} className="category-item">
                  <strong>{artist.name}</strong><br />
                  {artist.biography ? artist.biography.substring(0, 100) + "..." : "No biography available."}
                </li>
              ))}
            </ul>
            <Link to="/artists" className="see-all-link">See All Artists</Link>
          </div>

          <div className="homepage-explore-category">
            <h3 className="category-heading">Artworks</h3>
            <p className="category-description">
              Explore iconic artworks and discover the stories behind each masterpiece.
            </p>
            <ul className="category-list">
              {artworks.slice(0, 3).map(artwork => (
                <li key={artwork.id} className="category-item">
                  <strong>{artwork.title}</strong><br />
                  {artwork.description ? artwork.description.substring(0, 100) + "..." : "No description available."}
                </li>
              ))}
            </ul>
            <Link to="/artworks" className="see-all-link">See All Artworks</Link>
          </div>

          <div className="homepage-explore-category">
            <h3 className="category-heading">Eras</h3>
            <p className="category-description">
              Explore different artistic eras and how they shaped the world of art.
            </p>
            <ul className="category-list">
              {eras.slice(0, 3).map(era => (
                <li key={era.id} className="category-item">
                  <strong>{era.name}</strong><br />
                  {era.description ? era.description.substring(0, 100) + "..." : "No description available."}
                </li>
              ))}
            </ul>
            <Link to="/eras" className="see-all-link">See All Eras</Link>
          </div>

          <div className="homepage-explore-category">
            <h3 className="category-heading">Disciplines</h3>
            <p className="category-description">
              Understand various artistic disciplines and the different techniques used in art.
            </p>
            <ul className="category-list">
              {disciplines.slice(0, 3).map(discipline => (
                <li key={discipline.id} className="category-item">
                  <strong>{discipline.name}</strong>
                </li>
              ))}
            </ul>
            <Link to="/disciplines" className="see-all-link">See All Disciplines</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
