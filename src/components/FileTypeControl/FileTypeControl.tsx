import React, { Component } from "react";
import OptionsList from "../OptionsList/OptionsList";
import OptionsItem from "../OptionsItem/OptionsItem";
import Button from "../Button/Button";
import Toggle from "../Toggle/Toggle";

interface IState {
  fileTypes: string[];
  activeFileType: string;
}

interface IProps {}

export class FileTypeControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileTypes: ["jpg", "png", "webp"],
      activeFileType: "jpg"
    };
  }

  setFileType(filetype: string) {
    this.setState({
      activeFileType: filetype
    });

    console.log(this.state);
  }

  isFileTypeActive(filetype: string) {
    if (this.state.activeFileType === filetype) {
      return "primary";
    }
    return "transparent";
  }

  render() {
    return (
      <OptionsList>
        <OptionsItem>
          <label>File Type</label>
          <Toggle>
            {this.state.fileTypes.map((fileType, index) => {
              return (
                <Button
                  variant={this.isFileTypeActive(fileType)}
                  clickHandler={() => {
                    this.setFileType(fileType);
                  }}
                >
                  {fileType}
                </Button>
              );
            })}
          </Toggle>
        </OptionsItem>
        <OptionsList>
          <OptionsItem>
            <label>Compress</label>
            <Toggle>
              <Button variant="primary">Yes</Button>
              <Button variant="transparent">No</Button>
            </Toggle>
          </OptionsItem>
        </OptionsList>
      </OptionsList>
    );
  }
}

export default FileTypeControl;
