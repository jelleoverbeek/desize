import React, { Component } from "react";
import "./OptionsPanel.css";
import OptionsList from "../OptionsList/OptionsList";
import FileTypeControl from "../FileTypeControl/FileTypeControl";
import QualityControl from "../QualityControl/QualityControl";
import CompressionControl from "../CompressionControl/CompressionControl";
import ResolutionControl from "../ResolutionControl/ResolutionControl";
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
  }

  render() {
    return (
      <header className="options-panel">
        {/* <TopBar title="Export options"></TopBar> */}
        <OptionsList>
          <FileTypeControl
            fileType={this.state.fileType}
            exportOptionsChanged={() => {
              this.updateState();
            }}
          />
          {this.state.fileType === "jpg" || this.state.fileType === "webp" ? (
            <QualityControl
              fileType={this.state.fileType}
              exportOptionsChanged={() => {
                this.updateState();
              }}
            />
          ) : null}
          {this.state.fileType === "png" ? (
            <CompressionControl
              fileType={this.state.fileType}
              exportOptionsChanged={() => {
                this.updateState();
              }}
            />
          ) : null}
          <ResolutionControl
            exportOptionsChanged={() => {
              this.updateState();
            }}
          />
        </OptionsList>
      </header>
    );
  }
}

export default OptionsPanel;
