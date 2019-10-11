import React, { Component } from "react";
import "./OptionsItem.css";

interface IProps {
  isChild?: boolean;
}

export class OptionsItem extends Component<IProps> {
  render() {
    return (
      <li
        className={
          this.props.isChild
            ? "options-item options-item--child"
            : "options-item"
        }
      >
        {this.props.children}
      </li>
    );
  }
}

export default OptionsItem;
