import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const backgroundImageUrl = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1350&q=80';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Get current users array from localStorage or empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existingUser) {
      setError('Email already registered');
      return;
    }

    // Add new user to array and save
    users.push({ email: email.trim().toLowerCase(), password });
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess('✅ Signup successful! Redirecting to login...');

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div style={{
      ...styles.page,
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <div style={styles.container}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Sign Up</button>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.25)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontWeight: '500',
  },
  success: {
    color: 'green',
    marginTop: '10px',
    fontWeight: '500',
  },
};

export default Signup;
