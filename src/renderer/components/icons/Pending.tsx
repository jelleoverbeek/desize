import React from 'react';
import styles from './icon.module.css';

const Pending: React.FunctionComponent = () => (
  <svg
    className={styles['color-interactive-primary-default']}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM4 7C3.44772 7 3 7.44771 3 8C3 8.55229 3.44772 9 4 9C4.55229 9 5 8.55229 5 8C5 7.44771 4.55229 7 4 7ZM8 7C7.44771 7 7 7.44771 7 8C7 8.55229 7.44771 9 8 9C8.55229 9 9 8.55229 9 8C9 7.44771 8.55229 7 8 7ZM12 7C11.4477 7 11 7.44771 11 8C11 8.55229 11.4477 9 12 9C12.5523 9 13 8.55229 13 8C13 7.44771 12.5523 7 12 7Z"
    />
  </svg>
);

export default Pending;
