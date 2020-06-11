import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Thermostat from "./components/Thermostat";
import Lights from "./components/Lights";
import Toggle from "./components/Toggle";

function App() {
  return (
    <div className="App">
      <Toggle />
      <Thermostat />
      <Lights />
    </div>
  );
}

export default App;
