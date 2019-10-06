import React, { Component } from "react";
import "./File.css";
import Loader from "../Loader/Loader";
import { ReactComponent as ArrowRight } from "../../img/ArrowRight.svg";

interface InterfaceFile {
  name: string;
  path?: string;
}

export class File extends Component<InterfaceFile> {
  render() {
    const { name, path } = this.props;

    return (
      <li className="file">
        <Loader />
        <span className="file-name file-name--input">{name}</span>
        <ArrowRight />
        <span className="file-name file-name--output">{name}</span>
      </li>
    );
  }
}

export default File;
