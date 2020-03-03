import React, { Component } from "react";
import OptionsItem from "../OptionsItem/OptionsItem";
import { updateExportOptionsByKey } from "../../utilities/exportOptions";

interface IState {
  fileTypes: string[];
  activeFileType: string;
}

interface IProps {
  fileType: string;
  exportOptionsChanged?: any;
}

export class FileTypeControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileTypes: ["jpg", "png", "webp"],
      activeFileType: this.props.fileType
    };
  }

  change(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({
      activeFileType: event.currentTarget.value
    });

    updateExportOptionsByKey(event.currentTarget.value, "fileType");
    this.props.exportOptionsChanged();
  }

  render() {
    return (
      <OptionsItem>
        <label>File type</label>
        <select
          onChange={event => this.change(event)}
          value={this.state.activeFileType}
        >
          {this.state.fileTypes.map((fileType, index) => {
            return (
              <option value={fileType} key={index}>
                {fileType.toUpperCase()}
              </option>
            );
          })}
        </select>
      </OptionsItem>
    );
  }
}

export default FileTypeControl;
