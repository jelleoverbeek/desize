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

  change(event: React.FormEvent<HTMLInputElement>) {
    let value: number = Number(event.currentTarget.value);

    if (value > 100) {
      value = 100;
    } else if (value < 1) {
      value = 1;
    }

    updateExportOptionsByKey(value, this.props.fileType + "Options", "quality");
    this.setState({ value });
  }

  render() {
    return (
      <OptionsItem isChild={true}>
        <label>Quality (%)</label>
        <input
          type="number"
          min={1}
          max={100}
          value={this.state.value || ""}
          onChange={event => this.change(event)}
          step={1}
        />
        {/* <span className="options-item__value">{this.state.value}</span> */}
      </OptionsItem>
    );
  }
}

export default QualityControl;
