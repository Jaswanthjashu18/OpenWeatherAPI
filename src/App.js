import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/weather', {
        params: {
          city: city,  
          units: unit  
        }
      });

      console.log('Weather API response:', response.data);
      setWeatherData(response.data);  
      setError(null);                  
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data.'); 
      setWeatherData(null);            
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();  
    if (city) {
      fetchWeatherData(); 
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="App">
      <h1>Weather App ☁️</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>

      <button className="unit-toggle" onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>

      {error && <p className="error">{error}</p>}  

      {weatherData && (
        <div className="weather-box">
          <h2>{weatherData.name} ☁️</h2>
          <p className="weather-description">{weatherData.weather[0].description}</p>
          <p className="temperature">Temperature: {weatherData.main.temp} °{unit === 'metric' ? 'C' : 'F'}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
        </div>
      )}
    </div>
  );
};

export default App;
