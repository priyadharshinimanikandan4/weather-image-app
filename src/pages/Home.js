import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Welcome to Weather App 🌤️</h1>
        <p style={styles.subheading}>Check weather for cities, villages, countries...</p>
        <div style={styles.links}>
          <Link to="/login" style={styles.link}>Login</Link>
          <span style={styles.divider}>|</span>
          <Link to="/signup" style={styles.link}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

const backgroundImage = 'https://images.unsplash.com/photo-1501973801540-537f08ccae7d?auto=format&fit=crop&w=1400&q=80';

const styles = {
  page: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent overlay for text readability
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  subheading: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '1.1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
  divider: {
    color: 'white',
  }
};

export default Home;
