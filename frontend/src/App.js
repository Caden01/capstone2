import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./routes/Nav";
import Routes from "./routes/Routes";
import axios from "axios";
import * as jose from "jose";

export const TOKEN = "token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  function useLocalStorage(key, firstValue = null) {
    const initialValue = localStorage.getItem(key) || firstValue;

    const [item, setItem] = useState(initialValue);

    useEffect(
      function setKeyInLocalStorage() {
        if (item == null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, item);
        }
      },
      [key, item],
    );

    return [item, setItem];
  }

  const [token, setToken] = useLocalStorage(TOKEN);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jose.decodeJwt(token);
            let res = await axios.get(
              `http://localhost:3001/users/${username}`,
            );
            console.log("user:", res);
          } catch (err) {
            console.error("Error");
            setCurrentUser(null);
          }
        }
      }

      getCurrentUser();
    },
    [token],
  );

  async function signup(data) {
    try {
      let res = await axios.post("http://localhost:3001/auth/register", data);
      console.log(res);
      setToken(res.token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes signup={signup} />
      </div>
    </BrowserRouter>
  );
}

export default App;
