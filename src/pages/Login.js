import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AppContext';

const backgroundImageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80';
const loginIconUrl = 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const matchedUser = users.find(
        u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (matchedUser) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('loggedInUser', JSON.stringify(matchedUser));
        login(matchedUser);
        navigate('/weather');
      } else {
        setError('❌ Invalid credentials');
      }

      setLoading(false);
    }, 800);
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
      padding: 20,
    }}>
      <div style={styles.container}>
        <img src={loginIconUrl} alt="Login Icon" style={styles.icon} />
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
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
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.25)',
    maxWidth: '400px',
    width: '100%',
  },
  icon: {
    width: '64px',
    height: '64px',
    marginBottom: '15px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: {
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  checkboxLabel: {
    fontSize: '14px',
    textAlign: 'left',
    marginTop: '-10px',
    userSelect: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#0066ff',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontWeight: '500',
  },
};

export default Login;
