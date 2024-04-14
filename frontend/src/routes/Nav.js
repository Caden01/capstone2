import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import axios from "axios";
import "./Nav.css";

const res = await axios.get("http://localhost:3001/countries");
let getCountries = res.data.countries;

function Nav({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [countries, setCountries] = useState(getCountries);
  const [value, setValue] = useState("");

  function handleChange(evt) {
    console.log(evt.target.value);
    setValue(evt.target.value);
  }

  function loggedInNav() {
    return (
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Navbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/countries"
              >
                Countries
              </NavLink>
            </li>
            <form
              onSubmit={(evt) => evt.preventDefault()}
              className="d-flex gap-2 ml-auto p-2"
              role="search"
            >
              <div className="d-flex flex-column">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={value}
                  onChange={handleChange}
                />
                <div>
                  <ul className="suggestions list-group">
                    {value
                      ? countries
                          .filter((country) =>
                            country.country_name.toLowerCase().includes(value),
                          )
                          .map((country) => (
                            <li
                              className="list-group-item"
                              onClick={(evt) => setValue(country.country_name)}
                              to={`countries/${country.country_name}`}
                              key={country.country_name}
                            >
                              {country.country_name}
                            </li>
                          ))
                      : null}
                  </ul>
                </div>
              </div>
              <Link
                className="btn btn-outline-success"
                to={`countries/${value}`}
                onClick={(evt) => setValue("")}
              >
                Search
              </Link>
            </form>
          </ul>
          <ul className="navbar-nav d-flex gap-2 just-content-center align-items-center">
            <li className="nav-link">
              <NavLink className="nav-link" to="/" onClick={logout}>
                Log out
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                  className="rounded-circle"
                  style={{ width: "50px" }}
                  alt="Avatar"
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  function loggedOutNav() {
    return (
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Navbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/countries"
              >
                Countries
              </NavLink>
            </li>
            <form
              onSubmit={(evt) => evt.preventDefault()}
              className="d-flex gap-2 ml-auto p-2"
              role="search"
            >
              <div className="d-flex flex-column">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={value}
                  onChange={handleChange}
                />
                <div>
                  <ul className="suggestions list-group">
                    {value
                      ? countries
                          .filter((country) =>
                            country.country_name.toLowerCase().includes(value),
                          )
                          .map((country) => (
                            <li
                              className="list-group-item"
                              onClick={(evt) => setValue(country.country_name)}
                              to={`countries/${country.country_name}`}
                              key={country.country_name}
                            >
                              {country.country_name}
                            </li>
                          ))
                      : null}
                  </ul>
                </div>
              </div>
              <Link
                className="btn btn-outline-success"
                to={`countries/${value}`}
                onClick={(evt) => setValue("")}
              >
                Search
              </Link>
            </form>
          </ul>
          <ul className="navbar-nav d-flex gap-2 just-content-center align-items-center">
            <li className="nav-link">
              <NavLink className="nav-link" to="/login">
                Log in
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink className="nav-link" to="/signup">
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Nav;
