import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./routes/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
      </div>
    </BrowserRouter>
  );
}

export default App;
