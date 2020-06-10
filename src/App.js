import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Thermostat from "./components/Thermostat";
import Lights from "./components/Lights";

function App() {
  return (
    <div className="App">
      <Thermostat />
      <Lights />
    </div>
  );
}

export default App;
