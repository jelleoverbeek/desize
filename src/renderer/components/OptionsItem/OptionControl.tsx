import React from 'react';
import './OptionControl.css';

interface IProps {
  children?: React.ReactNode;
  isChild?: boolean;
}

const defaultProps = {
  children: undefined,
  isChild: false,
};

const OptionControl: React.FunctionComponent<IProps> = ({
  children,
  isChild,
}): JSX.Element => (
  <li
    className={
      isChild ? 'options-control options-control--child' : 'options-control'
    }
  >
    {children}
  </li>
);

OptionControl.defaultProps = defaultProps;

export default OptionControl;
