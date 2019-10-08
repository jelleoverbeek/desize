import React, { Component } from "react";
import defaultExportOptions from "../../defaultExportOptions";
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

  setDefaultExportOptions() {
    let fileType: any = localStorage.getItem("fileType");

    if (!fileType) {
      fileType = localStorage.setItem("fileType", "png");
    }

    this.setState({
      activeFileType: fileType
    });
  }

  setFileType(fileType: string) {
    this.setState({
      activeFileType: fileType
    });

    localStorage.setItem("fileType", fileType);
  }

  componentWillMount() {
    this.setDefaultExportOptions();
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
        {/* <OptionsList>
          <OptionsItem>
            <label>Compress</label>
            <Toggle>
              <Button variant="primary">Yes</Button>
              <Button variant="transparent">No</Button>
            </Toggle>
          </OptionsItem>
        </OptionsList> */}
      </OptionsList>
    );
  }
}

export default FileTypeControl;
