import React from 'react';
import './OptionsList.css';

interface IProps {
  children?: React.ReactNode;
}

const OptionsList: React.FunctionComponent<IProps> = ({
  children,
}): JSX.Element => <ul className="options-list">{children}</ul>;

export default OptionsList;
