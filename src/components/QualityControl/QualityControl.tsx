import React, { Component } from "react";
import OptionsItem from "../OptionsItem/OptionsItem";
import IExportOptions from "../../interfaces/IExportOptions.interface";
import { getExportOptions } from "../../utilities/exportOptions";

interface IState {
  minValue: number;
  maxValue: number;
  value: number;
}

interface IProps {}

export class FileTypeControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 100,
      value: 80
    };
  }

  // setFileType(fileType: string) {
  //   this.setState({
  //     activeFileType: fileType
  //   });

  //   updateExportOptions("fileType", fileType);
  // }

  componentDidMount() {
    // console.log(getExportOptions().jpgOptions.quality);
  }

  render() {
    return (
      <OptionsItem>
        <label>Quality</label>
        bla
      </OptionsItem>
    );
  }
}

export default FileTypeControl;
