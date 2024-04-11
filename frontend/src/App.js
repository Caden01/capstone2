import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./routes/Nav";
import Routes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
