import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../auth/UserContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  const [countries, setCountries] = useState([{}]);

  useEffect(function getCountries() {
    async function fetchData() {
      const res = await axios.get("http://localhost:3001/countries");
      setCountries(res.data.countries);
    }
    fetchData();
  }, []);

  console.log(countries);
  let randomNum = Math.floor(Math.random() * countries.length);

  const divStyle = {
    backgroundImage: `url(${countries[randomNum].flag})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "400px",
    height: "400px",
    padding: "0",
    margin: "0",
    cursor: "pointer",
  };

  return (
    <div>
      <div class="header-dark">
        <div class="container hero">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <h1 class="text-center mb-5">Countries</h1>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h3 class="text-center">
                  Click the flag to check out:{" "}
                  {countries[randomNum].country_name}
                </h3>
                <Link to={`/countries/${countries[randomNum].country_name}`}>
                  <div style={divStyle}></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
