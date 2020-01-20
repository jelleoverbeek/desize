import React, { Component } from "react";
import "./ResolutionControl.css";
import OptionsItem from "../OptionsItem/OptionsItem";
import Button from "../Button/Button";
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

  resetResolution() {
    this.setResolution("width", "");
    this.setResolution("height", "");
  }

  renderWidthControl() {
    return (
      <OptionsItem isChild={true}>
        <label>Width</label>
        <div className="button-overlay">
          <input
            type="number"
            placeholder="auto"
            value={this.state.resolutionWidth}
            onChange={(event: any): void => {
              this.setResolution("width", event.target.value);
            }}
          ></input>
          <Button
            variant={"primary"}
            clickHandler={() => {
              this.setResolution("width", "");
            }}
          >
            Auto
          </Button>
        </div>
      </OptionsItem>
    );
  }

  renderHeightControl() {
    return (
      <OptionsItem isChild={true}>
        <label>Height</label>
        <div className="button-overlay">
          <input
            type="number"
            placeholder="auto"
            value={this.state.resolutionHeight}
            onChange={(event: any): void => {
              this.setResolution("height", event.target.value);
            }}
          ></input>
          <Button
            variant={"primary"}
            clickHandler={() => {
              this.setResolution("height", "");
            }}
          >
            Auto
          </Button>
        </div>
      </OptionsItem>
    );
  }

  render() {
    return (
      <React.Fragment>
        <OptionsItem>
          <label>Resize images</label>
          <Toggle>
            <Button
              variant={
                this.state.resolutionOptionsEnabled ? "primary" : "transparent"
              }
              clickHandler={() => {
                this.setResolutionOptionsEnabled(true);
              }}
            >
              Yes
            </Button>
            <Button
              variant={
                this.state.resolutionOptionsEnabled ? "transparent" : "primary"
              }
              clickHandler={() => {
                this.setResolutionOptionsEnabled(false);
                this.resetResolution();
              }}
            >
              No
            </Button>
          </Toggle>
        </OptionsItem>
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
