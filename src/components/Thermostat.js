import React, { Component } from "react";
import "./Thermostat.css";

export default class Thermostat extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: null, newTemp: null };
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
  async setTemp() {
    let tempFetch = await fetch("http://localhost:5000/adjust_temp", {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTemp: this.state.newTemp }),
    })
      .then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      )
      .then(() => this.getNewData());
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
          <h1 className="temperature">
            Current temperature: {this.state.temperature}°
          </h1>
        );
      }
    };
    return (
      <div>
        {tempRender()}
        <label className="pure-material-textfield-outlined">
          <input
            type="text"
            name="name"
            onChange={this.handleChange.bind(this)}
            placeHolder=" "
          />
          <span>Temperature</span>
        </label>
        <button className="temp-button" onClick={this.setTemp}>
          Set Temp
        </button>
      </div>
    );
  }
}
