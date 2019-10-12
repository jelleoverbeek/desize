import React, { Component } from "react";
import "./OptionsPanel.css";
import TopBar from "../TopBar/TopBar";
import OptionsList from "../OptionsList/OptionsList";
import FileTypeControl from "../FileTypeControl/FileTypeControl";
import QualityControl from "../QualityControl/QualityControl";
import IExportOptions from "../../interfaces/IExportOptions.interface";
import { getExportOptions } from "../../utilities/exportOptions";

interface IState extends IExportOptions {}

interface IProps {}

export class OptionsPanel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = getExportOptions();
  }

  updateState() {
    this.setState(getExportOptions());
    console.log("Updated export options", getExportOptions());
  }

  render() {
    return (
      <aside className="options-panel">
        <TopBar title="Export options"></TopBar>
        <OptionsList>
          <FileTypeControl
            fileType={this.state.fileType}
            exportOptionsChanged={() => {
              this.updateState();
            }}
          />
          <QualityControl
            fileType={this.state.fileType}
            exportOptionsChanged={() => {
              this.updateState();
            }}
          />
        </OptionsList>
      </aside>
    );
  }
}

export default OptionsPanel;
