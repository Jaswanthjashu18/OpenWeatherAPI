const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/weather', async (req, res) => {
    const { city, units } = req.query;
    console.log(`Received request for city: ${city}, units: ${units}`);
  
    if (!city) {
      return res.status(400).json({ message: 'City is required' });
    }
  
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: units || 'metric'
        }
      });
  
      console.log('Weather API response from OpenWeather:', response.data); 
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching weather data from API:', error); 
      res.status(500).json({ message: 'Error fetching weather data' });
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
