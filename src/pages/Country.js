import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Country() {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch country data
    axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then(response => setCountryData(response.data[0]))
      .catch(error => console.error('Error fetching country data:', error));
  }, [countryCode]);

  useEffect(() => {
    if (countryData) {
      const { latlng } = countryData;

      // Fetch weather data
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&current_weather=true`)
        .then(response => setWeatherData(response.data.current_weather))
        .catch(error => console.error('Error fetching weather data:', error));

      // Fetch news data
      axios.get(`https://newsapi.org/v2/top-headlines?country=${countryData.cca2}&apiKey=YOUR_NEWS_API_KEY`)
        .then(response => setNewsData(response.data.articles))
        .catch(error => console.error('Error fetching news data:', error));
    }
  }, [countryData]);

  if (!countryData) return <p>Loading country details...</p>;

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>Population: {countryData.population}</p>
      <p>Region: {countryData.region}</p>
      <p>Languages: {Object.values(countryData.languages || {}).join(', ')}</p>

      {weatherData && (
        <div>
          <h2>Current Weather</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Wind Speed: {weatherData.windspeed} km/h</p>
        </div>
      )}

      <h2>Latest News</h2>
      <ul>
        {newsData.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Country;
