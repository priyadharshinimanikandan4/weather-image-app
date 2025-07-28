import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '93fc25fdfab8aba3374a22ea6e3ecfe6';

export default function Weather() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const fetchWeather = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const geoRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`
      );

      if (!geoRes.data.length) {
        setError('❌ Location not found. Please try a different search.');
        setLoading(false);
        return;
      }

      const { lat, lon, name, country, state } = geoRes.data[0];

      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      setWeatherData({
        ...weatherRes.data,
        name: `${name}${state ? ', ' + state : ''}, ${country}`,
      });
    } catch (err) {
      console.error(err);
      setError('⚠️ Error fetching weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  // Background image URL (you can replace it with any image URL you want)
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 20,
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 10,
          padding: 20,
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>🌍 Weather Lookup</h1>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter city, village, country..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: '100%', padding: 10, fontSize: 16, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            style={{
              padding: 10,
              width: '100%',
              cursor: 'pointer',
              backgroundColor: '#0066ff',
              color: 'white',
              fontSize: 16,
              border: 'none',
              borderRadius: 4,
            }}
          >
            Search
          </button>
        </form>

        {loading && <p style={{ textAlign: 'center', marginTop: 10 }}>🔄 Loading weather data...</p>}

        {error && <p style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>{error}</p>}

        {weatherData && (
          <div
            style={{
              marginTop: 20,
              padding: 15,
              borderRadius: 8,
              boxShadow: '0 0 8px rgba(0,0,0,0.1)',
              backgroundColor: '#f9f9f9',
              textAlign: 'center',
            }}
          >
            <h2>{weatherData.name}</h2>
            <p style={{ fontSize: 18, margin: 5 }}>
              {weatherData.weather[0].main} — {weatherData.weather[0].description}
            </p>
            <p style={{ fontSize: 16, margin: 5 }}>
              🌡️ Temperature: {weatherData.main.temp} °C
            </p>
            <p style={{ fontSize: 16, margin: 5 }}>
              💧 Humidity: {weatherData.main.humidity} %
            </p>
            <img
              alt={weatherData.weather[0].description}
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
