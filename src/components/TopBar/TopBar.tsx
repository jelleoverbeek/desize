import ITopBar from "../../interfaces/topbar.interface";
import React, { Component } from "react";
import "./TopBar.css";

class TopBar extends Component<ITopBar> {
  render() {
    const { title } = this.props;

    return <header className="top-bar">{title}</header>;
  }
}

export default TopBar;
