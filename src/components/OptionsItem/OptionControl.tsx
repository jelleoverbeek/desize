import React from 'react';
import './OptionControl.css';

interface IProps {
  children?: React.ReactNode;
  isChild?: boolean;
}

const OptionControl: React.FunctionComponent<IProps> = ({
  children,
  isChild = undefined,
}): JSX.Element => (
  <li className={isChild ? 'options-item options-item--child' : 'options-item'}>
    {children}
  </li>
);

export default OptionControl;
