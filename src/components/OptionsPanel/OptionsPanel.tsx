import React, { Component } from "react";
import "./OptionsPanel.css";
import TopBar from "../TopBar/TopBar";
import FileTypeControl from "../FileTypeControl/FileTypeControl";

export class FilePanel extends Component {
  render() {
    return (
      <aside className="options-panel">
        <TopBar title="Export options"></TopBar>
        <FileTypeControl />
      </aside>
    );
  }
}

export default FilePanel;
