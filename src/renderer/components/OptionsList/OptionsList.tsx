import React from 'react';
import './OptionsList.css';

interface IProps {
  children?: React.ReactNode;
}

const defaultProps = {
  children: undefined,
};

const OptionsList: React.FunctionComponent<IProps> = ({
  children,
}): JSX.Element => <ul className="options-list">{children}</ul>;

OptionsList.defaultProps = defaultProps;

export default OptionsList;
