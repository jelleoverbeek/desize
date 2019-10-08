import React, { Component } from "react";
import "./OptionsList.css";

export class OptionsList extends Component {
  render() {
    return <ul className="options-list">{this.props.children}</ul>;
  }
}

export default OptionsList;
