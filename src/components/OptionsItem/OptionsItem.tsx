import React, { Component } from "react";
import "./OptionsItem.css";

export class OptionsItem extends Component {
  render() {
    return <li className="options-item">{this.props.children}</li>;
  }
}

export default OptionsItem;
