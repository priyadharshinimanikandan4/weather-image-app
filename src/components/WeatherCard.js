import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  return (
    <Card sx={{ maxWidth: 400, margin: '20px auto' }}>
      <CardMedia
        component="img"
        height="120"
        image={iconUrl}
        alt={data.weather[0].description}
      />
      <CardContent>
        <Typography variant="h5">{data.name}, {data.sys.country}</Typography>
        <Typography>{data.weather[0].main} - {data.weather[0].description}</Typography>
        <Typography>🌡️ Temp: {data.main.temp}°C</Typography>
        <Typography>💧 Humidity: {data.main.humidity}%</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
