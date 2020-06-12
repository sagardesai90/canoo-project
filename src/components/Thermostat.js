import React, { Component } from "react";
import "./Thermostat.css";

export default class Thermostat extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: null, newTemp: null, darkMode: props.darkMode };
    this.setTemp = this.setTemp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getNewData = this.getNewData.bind(this);
  }

  componentDidMount = () => {
    fetch("http://localhost:5000/").then((res) =>
      res.json().then((data) => {
        this.setState({ temperature: data.thermostat.temperature });
      })
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.darkMode != this.props.darkMode) {
      this.setState({ darkMode: this.props.darkMode });
    }
  }

  async setTemp() {
    let tempFetch = await fetch("http://localhost:5000/adjust_temp", {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ newTemp: this.state.newTemp }),
    })
      .then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      )
      .then(() => this.getNewData())
      .catch((error) => console.log(error, "error"));
  }

  async getNewData() {
    let newData = await fetch("http://localhost:5000/").then((res) =>
      res.json().then((data) => {
        this.setState({ temperature: data.thermostat.temperature });
      })
    );
  }

  handleChange(event) {
    this.setState({ newTemp: event.target.value });
  }
  render() {
    const tempRender = () => {
      if (this.state.temperature != null) {
        return (
          <h1
            className={
              this.state.darkMode == true ? "temperature" : "temperature-dusk"
            }
          >
            Current temperature: {this.state.temperature}°
          </h1>
        );
      }
    };
    return (
      <div>
        {tempRender()}
        <label
          className={
            this.state.darkMode == true
              ? "pure-material-textfield-outlined"
              : "pure-material-textfield-outlined-dusk"
          }
        >
          <input
            type="text"
            name="name"
            onChange={this.handleChange.bind(this)}
            placeHolder=" "
          />
          <span>Temperature</span>
        </label>
        <button
          className={
            this.state.darkMode == true ? "temp-button" : "temp-button-dusk"
          }
          onClick={this.setTemp}
        >
          Set Temp
        </button>
      </div>
    );
  }
}
