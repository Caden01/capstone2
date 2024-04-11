import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CountryList() {
  const [countries, setCountries] = useState([{}]);

  useEffect(function getCountries() {
    async function fetchData() {
      const res = await axios.get("http://localhost:3001/countries");
      setCountries(res.data.countries);
    }
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li>
            <Link to={`/countries/${country.country_name}`}>
              {country.country_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
