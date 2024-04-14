import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../auth/UserContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Home", "currentUser=", currentUser);
  const [countries, setCountries] = useState([{}]);

  useEffect(function getCountries() {
    async function fetchData() {
      const res = await axios.get("http://localhost:3001/countries");
      setCountries(res.data.countries);
    }
    fetchData();
  }, []);

  function randomCountryInfo() {
    let randomNum = Math.floor(Math.random() * countries.length);
    return (
      <div>
        <h1>{countries[randomNum].country_name}</h1>
        <ul>
          <li>
            <div>
              <h3>Capital:</h3>
              <p>{countries[randomNum].capital}</p>
            </div>
          </li>
          <li>
            <div>
              <h3>Population:</h3>
              <p>{countries[randomNum].population}</p>
            </div>
          </li>
          <li>
            <div>
              <h3>Region:</h3>
              <p>{countries[randomNum].region}</p>
            </div>
          </li>
          <li>
            <div>
              <h3>Subregion:</h3>
              <p>{countries[randomNum].subregion}</p>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1>Home</h1>
      {randomCountryInfo()}
    </div>
  );
}

export default Homepage;
