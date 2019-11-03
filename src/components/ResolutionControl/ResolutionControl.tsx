import React, { Component } from "react";
import OptionsItem from "../OptionsItem/OptionsItem";
import Button from "../Button/Button";
import Toggle from "../Toggle/Toggle";
import {
  updateExportOptionsByKey,
  getExportOptions
} from "../../utilities/exportOptions";

interface IState {
  resolutionOptionsEnabled: boolean;
  resolutionWidth: number;
  resolutionHeight: number;
}

interface IProps {
  exportOptionsChanged?: any;
}

export class ResolutionControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      resolutionOptionsEnabled: false,
      resolutionWidth: getExportOptions().resolutionOptions.width,
      resolutionHeight: getExportOptions().resolutionOptions.height
    };
  }

  setResolutionOptionsEnabled(value: boolean) {
    this.setState({
      resolutionOptionsEnabled: value
    });

    updateExportOptionsByKey(value, "resolutionOptions", "enabled");
    this.props.exportOptionsChanged();
  }

  setResolution(dimension: "width" | "height", value: number) {
    if (dimension === "width") {
      this.setState({
        resolutionWidth: value
      });

      updateExportOptionsByKey(value, "resolutionOptions", "width");
    } else if (dimension === "height") {
      this.setState({
        resolutionHeight: value
      });

      updateExportOptionsByKey(value, "resolutionOptions", "height");
    }

    this.props.exportOptionsChanged();
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
              }}
            >
              No
            </Button>
          </Toggle>
        </OptionsItem>
        <OptionsItem isChild={true}>
          <label>Width</label>
          <input
            type="number"
            placeholder="auto"
            defaultValue={this.state.resolutionWidth}
            value={this.state.resolutionWidth}
            min="0"
            onChange={(event: any): void => {
              this.setResolution("width", Number(event.target.value));
            }}
          ></input>
          <Button
            variant={"primary"}
            clickHandler={() => {
              this.setResolution("width", 0);
            }}
          >
            Auto
          </Button>
        </OptionsItem>
        <OptionsItem isChild={true}>
          <label>Height</label>
          <input
            type="number"
            placeholder="auto"
            defaultValue={this.state.resolutionHeight}
            value={this.state.resolutionHeight}
            min="0"
            onChange={(event: any): void => {
              this.setResolution("height", Number(event.target.value));
            }}
          ></input>
          <Button
            variant={"primary"}
            clickHandler={() => {
              this.setResolution("height", 0);
            }}
          >
            Auto
          </Button>
        </OptionsItem>
      </React.Fragment>
    );
  }
}

export default ResolutionControl;