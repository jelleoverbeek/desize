import React from 'react';
import './ErrorMessage.css';
import Error from '../icons/Error';

interface IErrorMessage {
  title: string;
  message: string;
}

const ErrorMessage: React.FunctionComponent<IErrorMessage> = ({
  title,
  message,
}: IErrorMessage): JSX.Element => (
  <div className="error-message">
    <div className="error-message__icon">
      <Error />
    </div>
    <span className="error-message__text">
      {title} - {message}
    </span>
  </div>
);

export default ErrorMessage;
