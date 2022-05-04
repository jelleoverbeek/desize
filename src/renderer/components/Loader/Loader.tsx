import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FunctionComponent = (): JSX.Element => (
  <div className={styles.loader}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="6" strokeWidth="4" />
      <path
        d="M14 8C14 4.68629 11.3137 2 8 2"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default Loader;
