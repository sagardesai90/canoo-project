import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Thermostat from "./components/Thermostat";
import Lights from "./components/Lights";
import Toggle from "./components/Toggle";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { darkMode: false };
    this.setMode = this.setMode.bind(this);
  }

  setMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
  };

  render() {
    return (
      <div className="App">
        <Toggle setMode={this.setMode} darkMode={this.state.darkMode} />
        <Thermostat darkMode={this.state.darkMode} />
        <Lights darkMode={this.state.darkMode} />
      </div>
    );
  }
}

export default App;
