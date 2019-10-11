import React, { Component, ChangeEvent } from "react";
import "./Slider.css";

interface IProps {
  value: string | number;
}

export class Slider extends Component<IProps> {
  setSliderBackground(): void {
    const slider: HTMLInputElement | null = document.querySelector(
      ".slider input"
    );

    if (slider) {
      slider.style.background = `linear-gradient(
        to right,
        #5784ff 0%,
        #5784ff ${this.props.value}%,
        #f2f3f8 ${this.props.value}.1%,
        #f2f3f8 100%
      )`;
    }
  }

  componentDidUpdate() {
    this.setSliderBackground();
  }

  componentDidMount() {
    this.setSliderBackground();
  }

  render() {
    return <div className="slider">{this.props.children}</div>;
  }
}

export default Slider;
