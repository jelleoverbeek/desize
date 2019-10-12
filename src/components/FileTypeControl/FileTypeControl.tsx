import React, { Component } from "react";
import OptionsItem from "../OptionsItem/OptionsItem";
import Button from "../Button/Button";
import Toggle from "../Toggle/Toggle";
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

  updateFileType(fileType: string) {
    this.setState({
      activeFileType: fileType
    });

    updateExportOptionsByKey(fileType, "fileType");
    this.props.exportOptionsChanged();
  }

  render() {
    return (
      <OptionsItem>
        <label>File type</label>
        <Toggle>
          {this.state.fileTypes.map((fileType, index) => {
            return (
              <Button
                variant={
                  this.state.activeFileType === fileType
                    ? "primary"
                    : "transparent"
                }
                clickHandler={() => {
                  this.updateFileType(fileType);
                }}
                key={index}
              >
                {fileType}
              </Button>
            );
          })}
        </Toggle>
      </OptionsItem>
    );
  }
}

export default FileTypeControl;
