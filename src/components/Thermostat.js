import React, { Component } from "react";

export default class Thermostat extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: null };
    this.setTemp = this.setTemp.bind(this);
  }

  componentDidMount = () => {
    fetch("http://127.0.0.1:5000/adjust_temp").then((res) =>
      res.json().then((data) => {
        console.log(data.thermostat.temperature);
        this.setState({ temperature: data.thermostat.temperature });
      })
    );
  };
  async setTemp() {
    let tempFetch = await fetch("http://127.0.0.1:5000/adjust_temp").then(
      (res) =>
        res.json().then((data) => {
          console.log(data);
        })
    );
  }
  render() {
    const tempRender = () => {
      if (this.state.temperature != null) {
        return <h1>Current temperature: {this.state.temperature}</h1>;
      }
    };
    return (
      <div>
        {tempRender()}
        {/* <button onClick={this.setTemp}>Call</button> */}
      </div>
    );
  }
}
