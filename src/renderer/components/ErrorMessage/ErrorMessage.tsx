import React from 'react';
import styles from './ErrorMessage.module.css';
import Error from '../icons/Error';

interface IErrorMessage {
  title: string;
  message: string;
}

const ErrorMessage: React.FunctionComponent<IErrorMessage> = ({
  title,
  message,
}: IErrorMessage): JSX.Element => (
  <div className={styles.error}>
    <div className={styles.icon}>
      <Error />
    </div>
    <span className={styles.text}>
      {title} - {message}
    </span>
  </div>
);

export default ErrorMessage;
