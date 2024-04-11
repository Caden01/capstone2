import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CountryList from "./CountryList";
import axios from "axios";

function CountryDetail() {
  const { country_name } = useParams();
  const [country, setCountry] = useState({});

  useEffect(
    function getCounty() {
      async function fetchData() {
        const res = await axios.get(
          `http://localhost:3001/countries/${country_name}`,
        );
        setCountry(res.data.country);
      }
      fetchData();
    },
    [country_name],
  );
  console.log(country);

  return (
    <div>
      <h1>{country.country_name}</h1>
      <ul>
        <li>
          <div>
            <h3>Capital:</h3>
            <p>{country.capital}</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Population:</h3>
            <p>{country.population}</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Region:</h3>
            <p>{country.region}</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Subregion:</h3>
            <p>{country.subregion}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CountryDetail;
