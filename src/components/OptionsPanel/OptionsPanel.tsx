import React, { Component } from "react";
import "./OptionsPanel.css";
import TopBar from "../TopBar/TopBar";
import FileTypeControl from "../FileTypeControl/FileTypeControl";
import IExportOptions from "../../interfaces/IExportOptions.interface";

export class FilePanel extends Component {
  exportOptions: IExportOptions | null = null;
  defaultExportOptions: IExportOptions = {
    fileType: "png",
    pngOptions: {
      compression: 9
    },
    jpgOptions: {
      quality: 100
    },
    webpOptions: {
      quality: 100
    }
  };

  setExportOptions(exportOptions: IExportOptions): void {
    const exportOptionsString: string = JSON.stringify(exportOptions);
    localStorage.setItem("exportOptions", exportOptionsString);
  }

  getExportOptions(): IExportOptions {
    const exportOptionsString: string | null = localStorage.getItem(
      "exportOptions"
    );

    if (!exportOptionsString) {
      this.setExportOptions(this.defaultExportOptions);
      return this.defaultExportOptions;
    } else {
      return JSON.parse(exportOptionsString);
    }
  }

  componentDidMount() {
    this.getExportOptions();
  }

  render() {
    return (
      <aside className="options-panel">
        <TopBar title="Export options"></TopBar>
        <FileTypeControl exportOptions={this.getExportOptions()} />
      </aside>
    );
  }
}

export default FilePanel;
