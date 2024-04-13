import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./routes/Nav";
import Routes from "./routes/Routes";
import axios from "axios";
import * as jose from "jose";
import UserContext from "./auth/UserContext";

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
            console.log(username);
            let res = await axios.get(
              `http://localhost:3001/users/${username}`,
            );
            setCurrentUser(res.data.user);
            console.log("user:", res.data.user);
          } catch (err) {
            console.error("Error", err);
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
      setToken(res.data.token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(data) {
    try {
      let res = await axios.post("http://localhost:3001/auth/token", data);
      console.log(res);
      setToken(res.data.token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Nav logout={logout} />
          <Routes signup={signup} login={login} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
