import React, { Component } from "react";
import "./Button.css";

interface IButton {
  variant: "primary" | "transparent";
  clickHandler?: () => void;
}

export class Button extends Component<IButton> {
  render() {
    const { children, variant, clickHandler } = this.props;
    return (
      <button className={"button--" + variant} onClick={clickHandler}>
        {children}
      </button>
    );
  }
}

export default Button;
