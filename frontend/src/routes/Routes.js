import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CountryList from "../countries/CountryList";
import CountryDetail from "../countries/CountryDetail";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import Profile from "../profile/Profile";

function Routes({ signup, login }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/countries">
          <CountryList />
        </Route>

        <Route exact path="/countries/:country_name">
          <CountryDetail />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
