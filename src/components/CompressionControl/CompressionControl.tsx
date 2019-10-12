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

export class CompressionControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: 9
    };
  }

  updateCompression(value: string | number): void {
    value = Number(value);
    updateExportOptionsByKey(value, "pngOptions", "compression");

    this.setState({ value });
  }

  render() {
    return (
      <OptionsItem isChild={true}>
        <label>Compression</label>
        <Slider
          min={0}
          max={9}
          value={this.state.value}
          changeHandler={(value: string | number) => {
            this.updateCompression(value);
          }}
          step="1"
        />
        <span className="options-item__value">{this.state.value}</span>
      </OptionsItem>
    );
  }
}

export default CompressionControl;
