import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  return (
    <div>
      <h1>Select a Country</h1>
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            <Link to={`/country/${country.cca3}`}>{country.name.common}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
