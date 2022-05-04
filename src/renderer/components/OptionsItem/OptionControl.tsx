import React from 'react';
import styles from './OptionControl.module.css';

interface IProps {
  children?: React.ReactNode;
}

const defaultProps = {
  children: undefined,
};

const OptionControl: React.FunctionComponent<IProps> = ({
  children,
}): JSX.Element => <li className={styles['option-control']}>{children}</li>;

OptionControl.defaultProps = defaultProps;

export default OptionControl;
