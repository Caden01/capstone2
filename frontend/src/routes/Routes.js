import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CountryList from "../countries/CountryList";
import CountryDetail from "../countries/CountryDetail";

function Routes() {
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

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
