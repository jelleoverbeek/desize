import React, { Component } from "react";
import "./ErrorMessage.css";
import { ReactComponent as ErrorIcon } from "../../img/Error.svg";

interface IErrorMessage {
  title: string;
  message: string;
}

export class FileItem extends Component<IErrorMessage> {
  render() {
    return (
      <div className="error-message">
        <ErrorIcon />
        <span className="error-message__text">
          {this.props.title} - {this.props.message}
        </span>
      </div>
    );
  }
}

export default FileItem;
