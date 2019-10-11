import React, { Component, ChangeEvent } from "react";
import "./Slider.css";

interface IState {
  value: string | number;
}

interface IProps {
  min: string | number;
  max: string | number;
  step: string | number;
  value: string | number;
  changeHandler?: any;
}

export class Slider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  setSliderBackground(
    slider: HTMLInputElement | null,
    value: string | number
  ): void {
    if (slider) {
      slider.style.background = `linear-gradient(
        to right,
        #5784ff 0%,
        #5784ff ${value}%,
        #f2f3f8 ${value}.1%,
        #f2f3f8 100%
      )`;
    }
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setSliderBackground(event.target, event.target.value);

    if (event.target.value) {
      this.setState({
        value: event.target.value
      });
    }
  }

  componentDidMount() {
    this.setSliderBackground(
      document.querySelector(".slider input"),
      this.props.value
    );
  }

  render() {
    return (
      <div className="slider">
        <input
          type="range"
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.state.value}
          onChange={event => {
            this.handleChange(event);
            this.props.changeHandler(event.target.value);
          }}
        ></input>
      </div>
    );
  }
}

export default Slider;
