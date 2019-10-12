import React, { Component } from "react";
import OptionsItem from "../OptionsItem/OptionsItem";
import Slider from "../Slider/Slider";

interface IState {
  minValue: string | number;
  maxValue: string | number;
  value: string | number;
  fileType: string;
}

interface IProps {
  fileType: string;
}

export class QualityControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      minValue: 10,
      maxValue: 100,
      value: 80,
      fileType: this.props.fileType
    };
  }

  updateQuality(value: string | number): void {
    console.log("test" + value);
  }

  componentDidMount() {
    // console.log(getExportOptions().jpgOptions.quality);
  }

  render() {
    if (this.state.fileType === "jpg" || this.state.fileType === "webp") {
      return (
        <OptionsItem isChild={true}>
          <label>Quality</label>
          <Slider
            min={this.state.minValue}
            max={this.state.maxValue}
            value={this.state.value}
            changeHandler={this.updateQuality}
            step="10"
          />
        </OptionsItem>
      );
    } else {
      return null;
    }
  }
}

export default QualityControl;
