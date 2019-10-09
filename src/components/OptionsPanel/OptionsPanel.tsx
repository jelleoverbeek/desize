import React, { Component } from "react";
import "./OptionsPanel.css";
import TopBar from "../TopBar/TopBar";
import OptionsList from "../OptionsList/OptionsList";
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
        <OptionsList>
          <FileTypeControl fileType={getExportOptions().fileType} />
        </OptionsList>
      </aside>
    );
  }
}

export default FilePanel;
