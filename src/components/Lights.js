import React, { Component } from "react";
import "./Lights.scss";

export default class Lights extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: null, newRoom: null };
    this.handleChange = this.handleChange.bind(this);
    this.addRoom = this.addRoom.bind(this);
    this.getNewData = this.getNewData.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:5000/").then((res) =>
      res.json().then((data) => {
        this.setState({ rooms: data.rooms });
      })
    );
  }

  async lightSwitch(roomKey) {
    let rooms = Object.keys(this.state.rooms);

    let switchLight = await fetch("http://localhost:5000/switch", {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ room: [roomKey, this.state.rooms[roomKey]] }),
    })
      .then(() => this.getNewData())
      .catch((error) => console.log(error, "error"));
  }

  async addRoom() {
    let roomFetch = await fetch("http://localhost:5000/switch", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ newRoom: this.state.newRoom }),
    })
      .then(() => this.getNewData())
      .catch((error) => console.log(error, "error"));
  }

  async getNewData() {
    let newData = await fetch("http://localhost:5000/").then((res) =>
      res.json().then((data) => {
        this.setState({ rooms: data.rooms });
      })
    );
  }

  handleChange(event) {
    this.setState({ newRoom: event.target.value });
  }

  render() {
    const lightRender = () => {
      if (this.state.rooms != null) {
        let roomNames = Object.keys(this.state.rooms);

        return (
          <div>
            <h1 className="grid-container">
              {Object.keys(this.state.rooms).map((keyName, i) => (
                <ul key={i} className="room-name">
                  {roomNames[i]}
                  <div className="btn-wrapper">
                    <div className="btn-wrapper__container">
                      <div
                        className="btn-inner"
                        onClick={() => this.lightSwitch(roomNames[i])}
                      >
                        <a className="btn-inner__text">
                          {this.state.rooms[keyName]}{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </ul>
              ))}
            </h1>
            <div>
              <label class="pure-material-textfield-outlined">
                <input
                  type="text"
                  name="name"
                  placeHolder=" "
                  onChange={this.handleChange.bind(this)}
                />
                <span>Add Room</span>
              </label>
              <button className="add-button" onClick={this.addRoom}>
                Add
              </button>
            </div>
          </div>
        );
      }
    };
    return <div>{lightRender()}</div>;
  }
}
