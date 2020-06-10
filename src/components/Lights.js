import React, { Component } from "react";

export default class Lights extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: null };
  }
  componentDidMount() {
    fetch("http://127.0.0.1:5000/").then((res) =>
      res.json().then((data) => {
        console.log(data.rooms);
        this.setState({ rooms: data.rooms });
      })
    );
  }
  render() {
    const lightRender = () => {
      if (this.state.rooms != null) {
        let roomNames = Object.keys(this.state.rooms);
        console.log(roomNames, "roomNames");
        return (
          <h1>
            {Object.keys(this.state.rooms).map((keyName, i) => (
              <li key={i}>
                <span>
                  {roomNames[i]}: {this.state.rooms[keyName]}{" "}
                </span>
              </li>
            ))}
          </h1>
        );
      }
    };
    return <div>{lightRender()}</div>;
  }
}
