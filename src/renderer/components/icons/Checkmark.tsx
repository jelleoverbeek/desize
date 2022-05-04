import React from 'react';
import styles from './icon.module.css';

const Error: React.FunctionComponent = () => (
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
      d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM10.5316 4.78558L6.67488 9.38184L5.14279 8.09627C4.71971 7.74126 4.08896 7.79645 3.73396 8.21952C3.37895 8.6426 3.43414 9.27335 3.85721 9.62836L6.15535 11.5567C6.57842 11.9117 7.20918 11.8565 7.56418 11.4335L12.0637 6.07115C12.4187 5.64808 12.3635 5.01732 11.9404 4.66232C11.5174 4.30732 10.8866 4.3625 10.5316 4.78558Z"
    />
  </svg>
);

export default Error;
