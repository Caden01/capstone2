import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CountryList from "../countries/CountryList";
import CountryDetail from "../countries/CountryDetail";
import SignupForm from "../auth/SignupForm";

function Routes({ signup }) {
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

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
