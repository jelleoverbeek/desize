import React, { Component } from "react";
import OptionsList from "../OptionsList/OptionsList";
import OptionsItem from "../OptionsItem/OptionsItem";
import Button from "../Button/Button";
import Toggle from "../Toggle/Toggle";
import IExportOptions from "../../interfaces/IExportOptions.interface";

interface IState {
  fileTypes: string[];
  activeFileType: string;
}

interface IProps {
  exportOptions: IExportOptions;
}

export class FileTypeControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileTypes: ["jpg", "png", "webp"],
      activeFileType: this.props.exportOptions.fileType
    };
  }

  setExportOptions(exportOptions: IExportOptions): void {
    const exportOptionsString: string = JSON.stringify(exportOptions);
    localStorage.setItem("exportOptions", exportOptionsString);
  }

  getExportOptions() {
    const exportOptionsString: string | null = localStorage.getItem(
      "exportOptions"
    );

    if (exportOptionsString) {
      const exportOptions: IExportOptions = JSON.parse(exportOptionsString);
      return exportOptions;
    }
  }

  updateExportOptions(key: string, value: string | number) {
    const currentExportOptions: any = this.getExportOptions();
    currentExportOptions[key] = value;
    this.setExportOptions(currentExportOptions);
  }

  setFileType(fileType: string) {
    this.setState({
      activeFileType: fileType
    });

    this.updateExportOptions("fileType", fileType);
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