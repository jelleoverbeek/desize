import React from 'react';
import styles from './icon.module.css';

const ArrowRight: React.FunctionComponent = () => (
  <svg
    className={styles['color-interactive-primary-default']}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.29289 3.05025C8.68342 2.65972 9.31658 2.65972 9.70711 3.05025L13.9497 7.29289C14.3403 7.68341 14.3403 8.31658 13.9497 8.7071L9.70711 12.9497C9.31658 13.3403 8.68342 13.3403 8.29289 12.9497C7.90237 12.5592 7.90237 11.9261 8.29289 11.5355L10.828 8.99935L2 9C1.44772 9 1 8.55228 1 8C1 7.44771 1.44772 7 2 7L10.828 6.99935L8.29289 4.46446C7.93241 4.10398 7.90468 3.53675 8.2097 3.14446L8.29289 3.05025Z" />
  </svg>
);

export default ArrowRight;
