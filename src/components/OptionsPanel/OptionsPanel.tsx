import React, { Component } from "react";
import "./OptionsPanel.css";
import TopBar from "../TopBar/TopBar";
import FileTypeToggle from "../FileTypeToggle/FileTypeToggle";

export class FilePanel extends Component {
  render() {
    return (
      <aside className="options-panel">
        <TopBar title="Export options"></TopBar>
        <FileTypeToggle />
      </aside>
    );
  }
}

export default FilePanel;
