import React, { Component } from "react";
import "./Toggle.css";

interface IAction {
  label: string;
}

export class Toggle extends Component {
  render() {
    return <div className="toggle">{this.props.children}</div>;
  }
}

export default Toggle;
