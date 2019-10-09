import React, { Component } from "react";
import "./OptionsPanel.css";
import TopBar from "../TopBar/TopBar";
import FileTypeControl from "../FileTypeControl/FileTypeControl";
import IExportOptions from "../../interfaces/IExportOptions.interface";
import { getExportOptions } from "../../utilities/exportOptions";

export class FilePanel extends Component {
  exportOptions: IExportOptions | null = null;

  componentDidMount() {
    getExportOptions();
  }

  render() {
    return (
      <aside className="options-panel">
        <TopBar title="Export options"></TopBar>
        <FileTypeControl exportOptions={getExportOptions()} />
      </aside>
    );
  }
}

export default FilePanel;
