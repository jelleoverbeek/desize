import React from 'react';
import './Toggle.css';

interface IProps {
  children: React.ReactNode;
}

const Toggle: React.FunctionComponent<IProps> = ({ children }): JSX.Element => (
  <div className="toggle">{children}</div>
);

export default Toggle;
