import React from 'react';
import styles from './OptionsList.module.css';

interface IProps {
  children?: React.ReactNode;
}

const defaultProps = {
  children: undefined,
};

const OptionsList: React.FunctionComponent<IProps> = ({
  children,
}): JSX.Element => <ul className={styles['options-list']}>{children}</ul>;

OptionsList.defaultProps = defaultProps;

export default OptionsList;
