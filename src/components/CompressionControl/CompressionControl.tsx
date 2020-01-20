import React, { Component } from "react";
import OptionsItem from "../OptionsItem/OptionsItem";
import Slider from "../Slider/Slider";
import {
  updateExportOptionsByKey,
  getExportOptionsByKey
} from "../../utilities/exportOptions";

interface IState {
  value: string | number;
  minValue: number;
  maxValue: number;
}

interface IProps {
  fileType: string;
  exportOptionsChanged?: any;
}

export class CompressionControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: getExportOptionsByKey("pngOptions", "compressionLevel"),
      minValue: 0,
      maxValue: 9
    };
  }

  updateCompression(value: string | number): void {
    value = Number(value);
    updateExportOptionsByKey(value, "pngOptions", "compressionLevel");

    this.setState({ value });
  }

  change(event: React.FormEvent<HTMLInputElement>) {
    let value: number = Number(event.currentTarget.value);

    if (value > this.state.maxValue) {
      value = this.state.maxValue;
    } else if (value < this.state.minValue) {
      value = this.state.minValue;
    }

    updateExportOptionsByKey(value, "pngOptions", "compressionLevel");
    this.setState({ value });
  }

  render() {
    return (
      <OptionsItem isChild={true}>
        <label>
          Compression ({this.state.minValue}-{this.state.maxValue})
        </label>
        {/* <Slider
          min={this.state.minValue}
          max={this.state.maxValue}
          value={this.state.value}
          changeHandler={(value: string | number) => {
            this.updateCompression(value);
          }}
          step="1"
        /> */}
        <input
          type="number"
          min={this.state.minValue}
          max={this.state.maxValue}
          value={this.state.value || ""}
          onChange={event => this.change(event)}
          step={1}
        />
      </OptionsItem>
    );
  }
}

export default CompressionControl;
