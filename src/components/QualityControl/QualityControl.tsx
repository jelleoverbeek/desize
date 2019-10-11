import React, { Component, ChangeEvent } from "react";
import OptionsItem from "../OptionsItem/OptionsItem";
import Slider from "../Slider/Slider";

interface IState {
  minValue: string | number;
  maxValue: string | number;
  value: string | number;
}

interface IProps {}

export class QualityControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      minValue: 10,
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

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) {
      this.setState({
        value: event.target.value
      });
    }
  }

  componentDidMount() {
    // console.log(getExportOptions().jpgOptions.quality);
  }

  render() {
    return (
      <OptionsItem isChild={true}>
        <label>Quality</label>

        <Slider value={this.state.value}>
          <input
            type="range"
            min={this.state.minValue}
            max={this.state.maxValue}
            value={this.state.value}
            onChange={event => {
              this.handleChange(event);
            }}
            step="10"
          ></input>
        </Slider>
        <label>{this.state.value}</label>
      </OptionsItem>
    );
  }
}

export default QualityControl;
