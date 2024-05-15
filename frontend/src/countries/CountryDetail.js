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

  const divStyle = {
    backgroundImage: `url(${country.flag})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "400px",
    height: "400px",
    padding: "0",
    margin: "0",
    cursor: "pointer",
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-2">
      <h1>{country.country_name}</h1>
      <div className="d-flex flex-row gap-2">
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body text-center">
            <h5 class="card-title mb-3">Capital</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {country.capital === "" ? "N/A" : country.capital}
            </h6>
          </div>
        </div>
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body text-center">
            <h5 class="card-title mb-3">Population</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {country.population}
            </h6>
          </div>
        </div>
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body text-center">
            <h5 class="card-title mb-3">Region</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {country.region}
            </h6>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row gap-2">
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body text-center">
            <h5 class="card-title mb-3">Subregion</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {country.subregion}
            </h6>
          </div>
        </div>
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body text-center">
            <h5 class="card-title mb-3">Language</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {country.language === "" ? "N/A" : country.language}
            </h6>
          </div>
        </div>
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body text-center">
            <h5 class="card-title mb-3">Continent</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {country.continent}
            </h6>
          </div>
        </div>
      </div>
      <div style={divStyle}></div>
    </div>
  );
}

export default CountryDetail;
