import React from 'react';
import styles from './icon.module.css';

const Error: React.FunctionComponent = () => (
  <svg
    className={styles['color-interactive-danger-default']}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM5.87868 4.46447C5.48816 4.07394 4.85499 4.07394 4.46447 4.46447C4.07394 4.85499 4.07394 5.48816 4.46447 5.87868L6.58579 8L4.46447 10.1213C4.07394 10.5118 4.07394 11.145 4.46447 11.5355C4.85499 11.9261 5.48816 11.9261 5.87868 11.5355L8 9.41421L10.1213 11.5355C10.5118 11.9261 11.145 11.9261 11.5355 11.5355C11.9261 11.145 11.9261 10.5118 11.5355 10.1213L9.41421 8L11.5355 5.87868C11.9261 5.48816 11.9261 4.85499 11.5355 4.46447C11.145 4.07394 10.5118 4.07394 10.1213 4.46447L8 6.58579L5.87868 4.46447Z"
    />
  </svg>
);

export default Error;
