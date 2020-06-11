import React, { Component } from "react";
import "./Toggle.scss";

export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { darkMode: false };
    this.setMode = this.setMode.bind(this);
  }

  setMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
    if (this.state.darkMode == true) {
      document.body.style.backgroundColor = "#10131c";
    } else {
      document.body.style.backgroundColor = "#000";
    }
  };

  render() {
    return (
      <div class="toggleWrapper">
        <input type="checkbox" className="dn" id="dn" />
        <label for="dn" className="toggle">
          <span className="toggle__handler" onClick={this.setMode}>
            <span className="crater crater--1"></span>
            <span className="crater crater--2"></span>
            <span className="crater crater--3"></span>
          </span>
          <span className="star star--1"></span>
          <span className="star star--2"></span>
          <span className="star star--3"></span>
          <span className="star star--4"></span>
          <span className="star star--5"></span>
          <span className="star star--6"></span>
        </label>
      </div>
    );
  }
}
