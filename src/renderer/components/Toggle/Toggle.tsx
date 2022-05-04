import React from 'react';
import styles from './Toggle.module.css';

interface IProps {
  children: React.ReactNode;
}

const Toggle: React.FunctionComponent<IProps> = ({ children }): JSX.Element => (
  <div className={styles.toggle}>{children}</div>
);

export default Toggle;
