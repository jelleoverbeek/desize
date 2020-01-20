import React, { Component } from "react";
import "./ResolutionControl.css";
import OptionsItem from "../OptionsItem/OptionsItem";
import Button from "../Button/Button";
import { ReactComponent as RemoveIcon } from "../../img/Remove.svg";
import Toggle from "../Toggle/Toggle";
import {
  updateExportOptionsByKey,
  getExportOptions
} from "../../utilities/exportOptions";

interface IState {
  resolutionOptionsEnabled: boolean;
  resolutionWidth: number | any;
  resolutionHeight: number | any;
}

interface IProps {
  exportOptionsChanged?: any;
}

export class ResolutionControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      resolutionOptionsEnabled: getExportOptions().resolutionOptions.enabled,
      resolutionWidth: this.zeroToEmptyString(
        getExportOptions().resolutionOptions.width
      ),
      resolutionHeight: this.zeroToEmptyString(
        getExportOptions().resolutionOptions.height
      )
    };
  }

  zeroToEmptyString(value: number): string | number {
    if (value === 0) {
      return "";
    }
    return value;
  }

  setResolutionOptionsEnabled(value: boolean) {
    this.setState({
      resolutionOptionsEnabled: value
    });

    updateExportOptionsByKey(value, "resolutionOptions", "enabled");
    this.props.exportOptionsChanged();
  }

  setResolution(dimension: "width" | "height", value: number | string) {
    if (dimension === "width") {
      this.setState({
        resolutionWidth: value
      });

      updateExportOptionsByKey(Number(value), "resolutionOptions", "width");
    } else if (dimension === "height") {
      this.setState({
        resolutionHeight: value
      });

      updateExportOptionsByKey(Number(value), "resolutionOptions", "height");
    }

    this.props.exportOptionsChanged();
  }

  renderResetLink(dimension: "width" | "height") {
    return (
      <a
        onClick={(event: any): void => {
          this.setResolution(dimension, "");
        }}
      >
        (reset)
      </a>
    );
  }

  resetResolution() {
    this.setResolution("width", "");
    this.setResolution("height", "");
  }

  renderWidthControl() {
    return (
      <OptionsItem isChild={true}>
        <label className="resolutionControlLabel">
          Width
          {this.state.resolutionWidth ? this.renderResetLink("width") : null}
        </label>
        <div className="button-overlay">
          <input
            type="number"
            placeholder="auto"
            value={this.state.resolutionWidth}
            onChange={(event: any): void => {
              this.setResolution("width", event.target.value);
            }}
          ></input>
        </div>
      </OptionsItem>
    );
  }

  renderHeightControl() {
    return (
      <OptionsItem>
        <label className="resolutionControlLabel">
          Height
          {this.state.resolutionHeight ? this.renderResetLink("height") : null}
        </label>
        <div className="button-overlay">
          <input
            type="number"
            placeholder="auto"
            value={this.state.resolutionHeight}
            onChange={(event: any): void => {
              this.setResolution("height", event.target.value);
            }}
          ></input>
        </div>
      </OptionsItem>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.resolutionOptionsEnabled
          ? this.renderWidthControl()
          : false}
        {this.state.resolutionOptionsEnabled
          ? this.renderHeightControl()
          : false}
      </React.Fragment>
    );
  }
}

export default ResolutionControl;
