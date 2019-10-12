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

  modulate(
    value: number | string,
    rangeA: number[],
    rangeB: number[],
    limit: boolean
  ): number {
    if (typeof value === "string") {
      value = Number(value);
    }

    if (limit == null) {
      limit = false;
    }

    const fromLow: number = rangeA[0];
    const fromHigh: number = rangeA[1];
    const toLow: number = rangeB[0];
    const toHigh: number = rangeB[1];
    const result: number =
      toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);

    if (limit === true) {
      if (toLow < toHigh) {
        if (result < toLow) {
          return toLow;
        }
        if (result > toHigh) {
          return toHigh;
        }
      } else {
        if (result > toLow) {
          return toLow;
        }
        if (result < toHigh) {
          return toHigh;
        }
      }
    }
    return result;
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

      const sliderValueElement: HTMLElement | null = document.querySelector(
        ".slider__value"
      );

      const thumbElement: any = document.querySelector(".slider #thumb");
      console.log(thumbElement);

      const leftOffset: number = this.modulate(
        value,
        [10, 100],
        [20, 2],
        false
      );

      console.log(leftOffset);

      if (sliderValueElement) {
        sliderValueElement.style.left = `calc(${value}% + ${leftOffset}px`;
      }
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
        <span className="slider__value">{this.state.value}</span>
      </div>
    );
  }
}

export default Slider;
