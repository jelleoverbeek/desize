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
  <li
    className={
      isChild ? 'options-control options-control--child' : 'options-control'
    }
  >
    {children}
  </li>
);

export default OptionControl;
