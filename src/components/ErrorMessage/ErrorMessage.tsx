import React, { Component } from "react";
import "./ErrorMessage.css";
import { ReactComponent as ErrorIcon } from "../../img/Error.svg";

interface IErrorMessage {
  title: string;
  message: string;
}

export class ErrorMessage extends Component<IErrorMessage> {
  render() {
    const { title, message } = this.props;

    return (
      <div className="error-message">
        <ErrorIcon />
        <span className="error-message__text">
          {title} - {message}
        </span>
      </div>
    );
  }
}

export default ErrorMessage;
