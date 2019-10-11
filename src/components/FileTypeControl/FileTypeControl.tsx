import React, { Component } from "react";
import OptionsItem from "../OptionsItem/OptionsItem";
import Button from "../Button/Button";
import Toggle from "../Toggle/Toggle";
import { updateExportOptions } from "../../utilities/exportOptions";

interface IState {
  fileTypes: string[];
  activeFileType: string;
}

interface IProps {
  fileType: string;
}

export class FileTypeControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileTypes: ["jpg", "png", "webp"],
      activeFileType: this.props.fileType
    };
  }

  setFileType(fileType: string) {
    this.setState({
      activeFileType: fileType
    });

    updateExportOptions("fileType", fileType);
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
                  this.setFileType(fileType);
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
