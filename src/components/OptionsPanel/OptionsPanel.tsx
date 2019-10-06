import React, { Component } from "react";
import "./OptionsPanel.css";
import TopBar from "../TopBar/TopBar";

export class FilePanel extends Component {
  render() {
    return (
      <aside className="options-panel">
        <TopBar title="Export options"></TopBar>
        Options here
      </aside>
    );
  }
}

export default FilePanel;
