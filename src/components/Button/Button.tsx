import React, { Component } from "react";
import "./Button.css";

interface IButton {
  variant: string;
}

export class Button extends Component<IButton> {
  render() {
    const { children, variant } = this.props;
    return <button className={"button--" + variant}>{children}</button>;
  }
}

export default Button;
