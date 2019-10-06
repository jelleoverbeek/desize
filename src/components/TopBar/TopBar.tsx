import React, { Component } from "react";
import "./TopBar.css";

interface TopBarInterface {
  title: string;
}

class TopBar extends Component<TopBarInterface> {
  render() {
    const { title } = this.props;

    return <header className="top-bar">{title}</header>;
  }
}

export default TopBar;
