import React, { Component } from "react";
import OptionsItem from "../OptionsItem/OptionsItem";
import Slider from "../Slider/Slider";
import {
  updateExportOptionsByKey,
  getExportOptionsByKey
} from "../../utilities/exportOptions";

interface IState {
  value: string | number;
}

interface IProps {
  fileType: string;
  exportOptionsChanged?: any;
}

export class QualityControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.getCurrentFileTypeQuality()
    };
  }

  updateQuality(value: string | number, fileType: string): void {
    value = Number(value);
    updateExportOptionsByKey(value, fileType + "Options", "quality");
    this.setState({ value });
  }

  getCurrentFileTypeQuality(): number {
    const currentFileTypeQuality: number = getExportOptionsByKey(
      this.props.fileType + "Options",
      "quality"
    );

    return currentFileTypeQuality;
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.fileType !== this.props.fileType) {
      this.setState({ value: this.getCurrentFileTypeQuality() });
    }
  }

  render() {
    if (this.props.fileType === "jpg" || this.props.fileType === "webp") {
      return (
        <OptionsItem isChild={true}>
          <label>Quality</label>
          <Slider
            min={10}
            max={100}
            value={this.state.value}
            changeHandler={(value: string | number) => {
              this.updateQuality(value, this.props.fileType);
            }}
            step="10"
          />
          <span className="options-item__value">{this.state.value}</span>
        </OptionsItem>
      );
    } else {
      return null;
    }
  }
}

export default QualityControl;
